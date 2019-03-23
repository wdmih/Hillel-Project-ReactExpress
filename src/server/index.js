const express = require('express')
const path = require('path')
const api = require('./api')

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 8080

app.set('port', port)

app.use('/api', api)
app.use(express.static('dist'))

app.listen(port, host, () => console.log(`Listening on port ${port}!`))
