import { Octokit } from 'octokit'

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

export async function GET() {
  const fetchedContributors = await octokit.request(
    'GET /repos/{owner}/{repo}/contributors',
    {
      owner: 'project-falcon',
      repo: 'FGCS',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
  )

  console.log('Got contributor data from github')

  let contributorsData = []

  if (fetchedContributors.status === 200) {
    contributorsData = fetchedContributors.data.map((contributor) => {
      return {
        name: contributor.login,
        avatar: contributor.avatar_url,
        url: contributor.html_url,
      }
    })
  }

  return Response.json({ contributors: contributorsData })
}
