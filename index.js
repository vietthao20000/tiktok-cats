const express = require('express')
const app = express()
const bodyParser = require('body-parser')

apiRouter = require(__dirname + '/modules/tiktok')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api', apiRouter)

app.use('/', express.static(__dirname + '/public'))

app.listen('1234', () => {
  console.log('Server running')
})