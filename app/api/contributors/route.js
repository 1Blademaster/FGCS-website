import { kv } from '@vercel/kv'
import { Octokit } from 'octokit'

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

export async function GET() {
  let cachedContributors = null
  try {
    cachedContributors = await kv.get('contributors')
  } catch (err) {
    console.error(err)

    return Response.json({ contributors: [] })
  }
  let contributorsData = []

  if (cachedContributors === null) {
    const fetchedContributors = await octokit.request(
      'GET /repos/{owner}/{repo}/contributors',
      {
        owner: 'Avis-Drone-Labs',
        repo: 'FGCS',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    )

    if (fetchedContributors.status === 200) {
      contributorsData = fetchedContributors.data
        .filter((contributor) => contributor.login !== 'dependabot[bot]')
        .map((contributor) => {
          return {
            name: contributor.login,
            avatar: contributor.avatar_url,
            url: contributor.html_url,
          }
        })

      await kv.set('contributors', contributorsData, { ex: 3600 })
      console.log('Saved new contributor data to KV')
    } else {
      console.error('Failed to fetch repo contributors')
      console.error(fetchedContributors)
    }
  } else {
    contributorsData = cachedContributors
  }

  return Response.json({ contributors: contributorsData })
}
