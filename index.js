const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const cookieParse = require('cookie-parser')

const routes = require('./routes')

// helpers with some functions
const helpers = require('./helpers')

// Create connection to database
const db = require('./config/db')

// Import models
require('./models/Projects')
require('./models/Tasks')
require('./models/Users')

db.sync()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err))

// Create a new express application instance
const app = express()

// Where to upload static files
app.use(express.static('public'))

// Activate template engine Pug
app.set('view engine', 'pug')

// Enabling body-parser to read data from POST
app.use(bodyParser.urlencoded({ extended: true }))

// Add folder views as a static folder
app.set('views', path.join(__dirname, './views'))

// Add flash messages
app.use(flash())

app.use(cookieParse())

// session allows us to navigate between pages without having to log in again
app.use(
  session({
    secret: 'keySupersecret',
    resave: false,
    saveUninitialized: false
  })
)

// Pass helper to application
app.use((req, res, next) => {
  res.locals.varDump = helpers.varDump
  res.locals.messages = req.flash()
  next()
})

//routes of the application
app.use('/', routes())

app.listen(3000)
