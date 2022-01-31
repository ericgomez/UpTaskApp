const express = require('express')
const router = express.Router()

// import express-validator
const { body } = require('express-validator/check')

// import the controller
const projectsController = require('../controllers/projectsController')
const tasksController = require('../controllers/tasksController')

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

  // update project
  router.get('/project/edit/:id', projectsController.formEdit)
  router.post(
    '/new-project/:id',
    body('name')
      .isLength({ min: 3 })
      .trim()
      .escape(),
    projectsController.updateProject
  )

  // delete project
  router.delete('/project/:url', projectsController.deleteProject)

  // TASKS
  router.post('/project/:url', tasksController.addTask)

  router.patch('/task/:id', tasksController.updateTask)

  return router
}
