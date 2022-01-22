const express = require('express')
const router = express.Router()

// import the controller
const projectsController = require('../controllers/projectsController')

// route to home page
module.exports = () => {
  router.get('/', projectsController.projectsHome)

  router.get('/about', (req, res) => {
    res.render('about')
  })

  return router
}
