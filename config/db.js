const { Sequelize } = require('sequelize')

// Passing parameters separately
const db = new Sequelize('tasks_app', 'root', 'root', {
  host: 'localhost',
  dialect: 'mariadb'
})

module.exports = db
