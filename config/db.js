const { Sequelize } = require('sequelize')
require('dotenv').config()

// Passing parameters separately
const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
    port: process.env.DB_PORT
  }
)

module.exports = db
