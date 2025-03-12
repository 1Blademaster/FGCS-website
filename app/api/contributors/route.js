import { kv } from "@vercel/kv";
import { Octokit } from "octokit";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function GET() {
  let cachedContributors = null;

  let contributorsData = [];

  if (cachedContributors === null) {
    const branches = await octokit.request(
      "GET /repos/{owner}/{repo}/branches",
      {
        owner: "Avis-Drone-Labs",
        repo: "FGCS",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    // Fetch primary contributors who have directly contributed to the main codebase
    const fetchedContributors = await octokit.request(
      "GET /repos/{owner}/{repo}/contributors",
      {
        owner: "Avis-Drone-Labs",
        repo: "FGCS",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    if (fetchedContributors.status === 200) {
      contributorsData = fetchedContributors.data
        .filter((contributor) => contributor.login !== "dependabot[bot]")
        .map((contributor) => {
          return {
            name: contributor.login,
            avatar: contributor.avatar_url,
            url: contributor.html_url,
          };
        });

      // Fetch additional contributors who have commits on specific branches
      // This may include contributors who worked on feature branches but aren't in the main contributor list
      for (const branch of branches.data) {
        const branchContributors = await octokit.request(
          "GET /repos/{owner}/{repo}/commits",
          {
            owner: "Avis-Drone-Labs",
            repo: "FGCS",
            sha: branch.name,
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }
        );

        if (branchContributors.status === 200) {
          const branchContributorsData = branchContributors.data
            .map((commit) => commit.author)
            .filter((author) => author && author.login !== "dependabot[bot]")
            .map((author) => {
              return {
                name: author.login,
                avatar: author.avatar_url,
                url: author.html_url,
              };
            });

          contributorsData = [...contributorsData, ...branchContributorsData];
        }
      }

      // Remove duplicate contributors
      contributorsData = contributorsData.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.name === value.name)
      );

      // await kv.set('contributors', contributorsData)
      console.log("Saved new contributor data to KV");
    } else {
      console.error("Failed to fetch repo contributors");
      console.error(fetchedContributors);
    }
  } else {
    contributorsData = cachedContributors;
  }

  return Response.json({ contributors: contributorsData });
}
