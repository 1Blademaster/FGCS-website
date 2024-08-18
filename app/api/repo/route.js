import { kv } from '@vercel/kv'
import { Octokit } from 'octokit'

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

export async function GET() {
  let cachedRepoStats = null
  try {
    cachedRepoStats = await kv.get('repoStats')
  } catch (err) {
    console.error(err)

    return Response.json({ repoStats: null })
  }
  let repoStats = null

  if (cachedRepoStats === null) {
    const fetchedStats = await octokit.request(
      'GET /repos/{owner}/{repo}/releases/latest',
      {
        owner: 'Avis-Drone-Labs',
        repo: 'FGCS',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    )

    if (fetchedStats.status === 200) {
      const data = fetchedStats.data

      repoStats = {
        version: data.tag_name,
        publishedAt: data.published_at,
        url: data.html_url,
      }

      await kv.set('repoStats', repoStats, { ex: 1200 })
      console.log('Saved new repo stats data to KV')
    } else {
      console.error('Failed to fetch repo stats')
      console.error(fetchedStats)
    }
  } else {
    repoStats = cachedRepoStats
  }

  return Response.json({ repoStats: repoStats })
}
