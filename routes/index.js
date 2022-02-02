const express = require('express')
const router = express.Router()

// import express-validator
const { body } = require('express-validator/check')

// import the controller
const projectsController = require('../controllers/projectsController')
const tasksController = require('../controllers/tasksController')
const usersController = require('../controllers/usersController')
const authController = require('../controllers/authController')

// route to home page
module.exports = () => {
  router.get(
    '/',
    authController.isUserAuthenticate,
    projectsController.projectsHome
  )
  router.get(
    '/new-project',
    authController.isUserAuthenticate,
    projectsController.formProject
  )

  router.post(
    '/new-project',
    authController.isUserAuthenticate,
    body('name')
      .isLength({ min: 3 })
      .trim()
      .escape(),
    projectsController.createProject
  )

  router.get(
    '/project/:url',
    authController.isUserAuthenticate,
    projectsController.projectDetail
  )

  // update project
  router.get(
    '/project/edit/:id',
    authController.isUserAuthenticate,
    projectsController.formEdit
  )
  router.post(
    '/new-project/:id',
    authController.isUserAuthenticate,
    body('name')
      .isLength({ min: 3 })
      .trim()
      .escape(),
    projectsController.updateProject
  )

  // delete project
  router.delete(
    '/project/:url',
    authController.isUserAuthenticate,
    projectsController.deleteProject
  )

  // TASKS
  router.post(
    '/project/:url',
    authController.isUserAuthenticate,
    tasksController.addTask
  )

  router.patch(
    '/task/:id',
    authController.isUserAuthenticate,
    tasksController.updateTask
  )

  router.delete(
    '/task/:id',
    authController.isUserAuthenticate,
    tasksController.deleteTask
  )

  // create new count
  router.get('/create-count', usersController.formCreateCount)
  router.post('/create-count', usersController.createCount)

  // login
  router.get('/login', usersController.formLogin)
  router.post('/login', authController.userAuthenticate)

  router.get('/logout', authController.logout)

  // forgot password
  router.get('/forgot-password', usersController.formForgotPassword)

  return router
}
