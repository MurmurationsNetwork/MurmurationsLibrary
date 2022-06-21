const fetch = require("node-fetch");

async function getGithubLastCommitTime(host) {
  const response = await fetch(
    host === "cdn.murmurations.network"
      ? "https://api.github.com/repos/MurmurationsNetwork/MurmurationsLibrary/commits"
      : host === "main-cdn.murmurations.network"
      ? "https://api.github.com/repos/MurmurationsNetwork/MurmurationsLibrary/commits?sha=main"
      : "https://api.github.com/repos/MurmurationsNetwork/MurmurationsLibrary/commits?sha=staging"
  );
  if (response.status !== 200)
    throw Error(`{"error": "${response.status} - ${response.url}"}`);
  const data = await response.json();
  return data[0].commit.author.date;
}

async function getSchemaList(host) {
  let schemaList = [];
  const response = await fetch(
    host === "cdn.murmurations.network"
      ? "https://cdn.murmurations.network/schemas"
      : host === "main-cdn.murmurations.network"
      ? "https://main-cdn.murmurations.network/schemas"
      : "https://test-cdn.murmurations.network/schemas"
  );
  if (response.status !== 200)
    throw Error(`{"error": "${response.status} - ${response.url}"}`);
  const data = await response.text();
  const files = [...data.matchAll(/(?<=file json">)(.*)(?=.json<\/a>)/g)];

  files.forEach((file) => {
    if (schemaList.includes(file[0])) return;
    schemaList.push(file[0]);
  });
  return schemaList;
}

async function createSchemasResponse(host) {
  const response = {};
  const lastCommit = await getGithubLastCommitTime(host);
  const schemaList = await getSchemaList(host);

  response.last_commit = await lastCommit;
  response.schema_list = await schemaList;

  return JSON.stringify(response, null, 2);
}

module.exports = (req, res) => {
  createSchemasResponse(req.headers.host)
    .then((response) => {
      res.status(200);
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
      res.end(response);
    })
    .catch((err) => {
      res.status(500);
      res.setHeader("Content-Type", "application/json");
      res.end(err.message);
    });
};
