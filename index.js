const express = require('express')
const routes = require('./routes')
const path = require('path')
const bodyParser = require('body-parser')

// Create a new express application instance
const app = express()

// Where to upload static files
app.use(express.static('public'))

// Activate template engine Pug
app.set('view engine', 'pug')
// Add folder views as a static folder
app.set('views', path.join(__dirname, './views'))

// Enabling body-parser to read data from POST
app.use(bodyParser.urlencoded({ extended: true }))

//routes of the application
app.use('/', routes())

app.listen(3000)
