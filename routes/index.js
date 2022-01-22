const express = require('express')
const router = express.Router()

// route to home page
module.exports = () => {
  router.get('/', (req, res) => {
    res.send('Home')
  })

  router.get('/we', (req, res) => {
    res.send('About us')
  })

  return router
}
