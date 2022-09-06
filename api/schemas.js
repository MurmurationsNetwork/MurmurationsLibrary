import fetch from 'node-fetch'

async function getGithubLastCommitTime(host) {
  if (!process.env?.GITHUB_TOKEN) {
    throw Error(`{"error": "GITHUB_TOKEN is missing."}`)
  }
  const response = await fetch(
    host === "cdn.murmurations.network"
      ? "https://api.github.com/repos/MurmurationsNetwork/MurmurationsLibrary/commits?sha=main&per_page=1"
      : "https://api.github.com/repos/MurmurationsNetwork/MurmurationsLibrary/commits?sha=test&per_page=1",
    {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': 'Bearer '+ process.env.GITHUB_TOKEN
      }
    }
  )
  if (response.status !== 200)
    throw Error(`{"error": "${response.status} - ${response.url}"}`);
  const data = await response.json()
  let { author } = data[0]?.commit
  return author?.date
}

async function getSchemaList(host) {
  let schemaList = []
  const response = await fetch(
    host === "cdn.murmurations.network"
      ? "https://cdn.murmurations.network/schemas"
      : "https://test-cdn.murmurations.network/schemas",
    {
      method: 'GET'
    }
  )
  if (response.status !== 200) throw Error(`{"error": "${response.status} - ${response.url}"}`)
  const data = await response.text();
  const files = [...data.matchAll(/(?<=name">)(.*)(?=.json<\/span>)/g)];
  files.forEach(file => {
    if (schemaList.includes(file[0])) return
    schemaList.push(file[0])
  })
  return schemaList
}

export async function createSchemasResponse(host) {
  const response = {}

  response.last_commit = await getGithubLastCommitTime(host)
  response.schema_list = await getSchemaList(host)

  return JSON.stringify(response, null, 2)
}
