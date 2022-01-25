const express = require('express')
const router = express.Router()

// import express-validator
const { body } = require('express-validator/check')

// import the controller
const projectsController = require('../controllers/projectsController')

// route to home page
module.exports = () => {
  router.get('/', projectsController.projectsHome)
  router.get('/new-project', projectsController.formProject)

  router.post(
    '/new-project',
    body('name')
      .isLength({ min: 3 })
      .trim()
      .escape(),
    projectsController.createProject
  )

  router.get('/project/:url', projectsController.projectDetail)

  return router
}
