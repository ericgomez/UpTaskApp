const { Sequelize } = require('sequelize')

// Passing parameters separately
const sequelize = new Sequelize('tasks_app', 'root', 'root', {
  host: 'localhost',
  dialect: 'mariadb'
})
