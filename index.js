const express = require('express')
const routes = require('./routes')
const path = require('path')

// Create a new express application instance
const app = express()

// Activate template engine Pug
app.set('view engine', 'pug')
// Add folder views as a static folder
app.set('views', path.join(__dirname, './views'))

//routes of the application
app.use('/', routes())

app.listen(3000)
