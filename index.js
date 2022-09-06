import express from 'express'
import path from 'path'
import serveIndex from 'serve-index'
import { fileURLToPath } from 'url'
import { createSchemasResponse } from './api/schemas.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
const port = 8080

// static files
app.use('/countries', express.static(path.join(__dirname, '/countries')))
app.use('/fields', express.static(path.join(__dirname, '/fields')), serveIndex(path.join(__dirname, '/fields'), {'icons': true}))
app.use('/schemas', express.static(path.join(__dirname, '/schemas')), serveIndex(path.join(__dirname, '/schemas'), {'icons': true}))
app.use('/', express.static(path.join(__dirname, '/')))

app.get('/api/schemas', (req, res) => {
  createSchemasResponse(req.hostname).then(json => {
    res.type('json')
    res.send(json)
  }).catch(err => {
    res.type('json')
    res.send(err.message);
  })
})

app.get('*', function(req, res){
  res.status(404)
  res.send('Page not found')
});

app.listen(port)
