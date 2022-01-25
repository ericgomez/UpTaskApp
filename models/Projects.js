const Sequelize = require('sequelize')
const slug = require('slug')

const db = require('../config/db')

const Projects = db.define(
  'projects',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    url: Sequelize.STRING
  },
  {
    hooks: {
      beforeCreate: project => {
        const url = slug(project.name).toLowerCase()
        project.url = url
      }
    }
  }
)

module.exports = Projects
