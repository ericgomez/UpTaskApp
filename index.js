const express = require('express')
const routes = require('./routes')

// Create a new express application instance
const app = express()

//routes of the application
app.use('/', routes())

app.listen(3000)
