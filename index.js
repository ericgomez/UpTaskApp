const express = require('express')

// Create a new express application instance
const app = express()

//routes of the application
app.use('/', (req, res) => {
  res.send('hello world')
})

app.listen(3000)
