import { kv } from "@vercel/kv";
import { Octokit } from "octokit";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    // Fetch and update contributors
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
      const contributorsData = fetchedContributors.data
        .filter((contributor) => contributor.login !== "dependabot[bot]")
        .map((contributor) => ({
          name: contributor.login,
          avatar: contributor.avatar_url,
          url: contributor.html_url,
        }));
      await kv.set("contributors", contributorsData);
      console.log("Saved new contributor data to KV");
    } else {
      console.error("Failed to fetch repo contributors");
      console.error(fetchedContributors);
    }

    // Fetch and update repo stats
    const fetchedStats = await octokit.request(
      "GET /repos/{owner}/{repo}/releases/latest",
      {
        owner: "Avis-Drone-Labs",
        repo: "FGCS",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    if (fetchedStats.status === 200) {
      const data = fetchedStats.data;
      const repoStats = {
        version: data.tag_name,
        publishedAt: data.published_at,
        url: data.html_url,
      };
      await kv.set("repoStats", repoStats);
      console.log("Saved new repo stats data to KV");
    } else {
      console.error("Failed to fetch repo stats");
      console.error(fetchedStats);
    }

    return new Response("Data updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating data:", error);
    return new Response("Error updating data", { status: 500 });
  }
}
