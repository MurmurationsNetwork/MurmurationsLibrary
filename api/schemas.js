const fetch = require('node-fetch')

// let schemas = []

module.exports = (_, res) => {
  let schemas = []
  fetch('https://cdn.murmurations.tech/schemas')
    .then((res) => res.text())
    .then((body) => {
      const files = [...body.matchAll(/(?<=file json">)(.*)(?=<\/a>)/g)]

      files.forEach((file) => {
        // if (schemas.includes(file[0])) return
        schemas.push(file[0])
      })
    })

  res.status(200)
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(schemas, null, 2))
}
