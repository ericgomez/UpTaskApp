const express = require('express')
const routes = require('./routes')
const path = require('path')
const bodyParser = require('body-parser')

// helpers with some functions
const helpers = require('./helpers')

// Create connection to database
const db = require('./config/db')

// Import models
require('./models/Projects')
require('./models/Tasks')

db.sync()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err))

// Create a new express application instance
const app = express()

// Where to upload static files
app.use(express.static('public'))

// Activate template engine Pug
app.set('view engine', 'pug')
// Add folder views as a static folder
app.set('views', path.join(__dirname, './views'))

// Pass helper to application
app.use((req, res, next) => {
  res.locals.varDump = helpers.varDump
  next()
})

// Enabling body-parser to read data from POST
app.use(bodyParser.urlencoded({ extended: true }))

//routes of the application
app.use('/', routes())

app.listen(3000)
