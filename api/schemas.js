import fetch from 'node-fetch';

async function getGithubLastCommitTime(host) {
  if (!process.env?.GITHUB_TOKEN) {
    throw Error(`{"error": "GITHUB_TOKEN is missing."}`);
  }
  const response = await fetch(
    host === "cdn.murmurations.network" || host === "temp-cdn.murmurations.network"
      ? "https://api.github.com/repos/MurmurationsNetwork/MurmurationsLibrary/commits?sha=main"
      : "https://api.github.com/repos/MurmurationsNetwork/MurmurationsLibrary/commits?sha=test",
    {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': 'Bearer '+ process.env.GITHUB_TOKEN
      }
    }
  );
  if (response.status !== 200)
    throw Error(`{"error": "${response.status} - ${response.url}"}`);
  const data = await response.json();
  return data[0].commit.author.date;
}

async function getSchemaList(host) {
  let schemaList = [];
  const response = await fetch(
    host === "cdn.murmurations.network" || host === "temp-cdn.murmurations.network"
      ? "https://temp-cdn.murmurations.network/schemas"
      : "https://temp-test-cdn.murmurations.network/schemas"
  );
  if (response.status !== 200)
    throw Error(`{"error": "${response.status} - ${response.url}"}`);
  const data = await response.text();
  const files = [...data.matchAll(/(?<=name">)(.*)(?=.json<\/span>)/g)];
  files.forEach((file) => {
    if (schemaList.includes(file[0])) return;
    schemaList.push(file[0]);
  });
  return schemaList;
}

export async function createSchemasResponse(host) {
  const response = {};
  const lastCommit = await getGithubLastCommitTime(host);
  const schemaList = await getSchemaList(host);

  response.last_commit = await lastCommit;
  response.schema_list = await schemaList;

  return JSON.stringify(response, null, 2);
}
