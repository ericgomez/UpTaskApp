const express = require('express')
const router = express.Router()

// import the controller
const projectsController = require('../controllers/projectsController')

// route to home page
module.exports = () => {
  router.get('/', projectsController.projectsHome)
  router.get('/new-project', projectsController.formProject)

  router.post('/new-project', projectsController.createProject)

  return router
}
