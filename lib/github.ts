/**
 * GitHub API helper for CMS content updates.
 * 
 * Commits file changes directly to the repo via the GitHub Contents API.
 * This triggers Vercel's auto-deploy webhook, so changes go live in ~1-2 min.
 */

const GITHUB_API = 'https://api.github.com';

function getConfig() {
  const token = process.env.GITHUB_PAT;
  const repo = process.env.GITHUB_REPO; // e.g. "sumsur29/sumsur-portfolio"
  const branch = process.env.GITHUB_BRANCH || 'main';

  if (!token || !repo) {
    throw new Error('GITHUB_PAT and GITHUB_REPO environment variables are required');
  }

  return { token, repo, branch };
}

function headers(token: string) {
  return {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  };
}

/**
 * Get a file's current content and SHA from GitHub.
 * Returns null if the file doesn't exist.
 */
export async function getFileFromGitHub(filePath: string): Promise<{
  content: string;
  sha: string;
} | null> {
  const { token, repo, branch } = getConfig();

  const res = await fetch(
    `${GITHUB_API}/repos/${repo}/contents/${filePath}?ref=${branch}`,
    { headers: headers(token), cache: 'no-store' }
  );

  if (res.status === 404) return null;
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`GitHub API error (GET ${filePath}): ${res.status} ${error}`);
  }

  const data = await res.json();
  const content = Buffer.from(data.content, 'base64').toString('utf-8');
  return { content, sha: data.sha };
}

/**
 * Create or update a file on GitHub.
 * If the file exists, its SHA is required for the update.
 */
export async function commitFileToGitHub(
  filePath: string,
  content: string,
  message: string
): Promise<void> {
  const { token, repo, branch } = getConfig();

  // Get current SHA if file exists (required for updates)
  const existing = await getFileFromGitHub(filePath);

  const body: any = {
    message,
    content: Buffer.from(content).toString('base64'),
    branch,
  };

  if (existing) {
    body.sha = existing.sha;
  }

  const res = await fetch(
    `${GITHUB_API}/repos/${repo}/contents/${filePath}`,
    {
      method: 'PUT',
      headers: headers(token),
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`GitHub API error (PUT ${filePath}): ${res.status} ${error}`);
  }
}

/**
 * Delete a file from GitHub.
 */
export async function deleteFileFromGitHub(
  filePath: string,
  message: string
): Promise<void> {
  const { token, repo, branch } = getConfig();

  const existing = await getFileFromGitHub(filePath);
  if (!existing) {
    throw new Error(`File not found on GitHub: ${filePath}`);
  }

  const res = await fetch(
    `${GITHUB_API}/repos/${repo}/contents/${filePath}`,
    {
      method: 'DELETE',
      headers: headers(token),
      body: JSON.stringify({
        message,
        sha: existing.sha,
        branch,
      }),
    }
  );

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`GitHub API error (DELETE ${filePath}): ${res.status} ${error}`);
  }
}

/**
 * Read a JSON file from GitHub and parse it.
 * Falls back to local filesystem for development.
 */
export async function readJSONFromGitHub<T>(filePath: string): Promise<T> {
  const file = await getFileFromGitHub(filePath);
  if (!file) {
    throw new Error(`File not found: ${filePath}`);
  }
  return JSON.parse(file.content) as T;
}

/**
 * Write a JSON file to GitHub with pretty formatting.
 */
export async function writeJSONToGitHub<T>(
  filePath: string,
  data: T,
  message: string
): Promise<void> {
  const content = JSON.stringify(data, null, 2) + '\n';
  await commitFileToGitHub(filePath, content, message);
}
