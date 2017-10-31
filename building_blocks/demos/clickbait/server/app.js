var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express()
var routes = require('./routes/routes.js')

routes(app)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var server = app.listen(8092, function () {
  console.log('Listening on port %s...', server.address().port)
})
