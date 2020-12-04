const fetch = require('node-fetch')

let schemaList = []

module.exports = (_, res) => {
  fetch('https://cdn.murmurations.tech/schemas')
    .then((res) => res.text())
    .then((body) => {
      const files = [...body.matchAll(/(?<=file json">)(.*)(?=.json<\/a>)/g)]

      files.forEach((file) => {
        if (schemaList.includes(file[0])) return
        schemaList.push(file[0])
      })
      return schemaList
    })
    .then((schemas) => {
      res.status(200)
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
      res.end(JSON.stringify(schemas, null, 2))
    })
}
