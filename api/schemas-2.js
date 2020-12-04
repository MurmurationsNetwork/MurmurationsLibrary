const fetch = require('node-fetch')

async function getGithubLastCommitTime() {
  const response = await fetch(
    'https://api.github.com/repos/MurmurationsNetwork/MurmurationsLibrary/commits'
  )
  const data = await response.json()
  return data[0].commit.author.date
}

async function getSchemaList() {
  let schemaList = []
  const response = await fetch('https://cdn.murmurations.tech/schemas')
  const data = await response.text()
  const files = [...data.matchAll(/(?<=file json">)(.*)(?=.json<\/a>)/g)]

  files.forEach((file) => {
    if (schemaList.includes(file[0])) return
    schemaList.push(file[0])
  })
  return schemaList
}

async function createSchemasResponse() {
  const response = {}
  const lastCommit = await getGithubLastCommitTime()
  const schemaList = await getSchemaList()

  response.last_commit = await lastCommit
  response.schema_list = await schemaList

  return JSON.stringify(response, null, 2)
}

module.exports = (_, res) => {
  createSchemasResponse().then((response) => {
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
    res.end(response)
  })
}
