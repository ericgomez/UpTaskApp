const Sequelize = require('sequelize')
const bcrypt = require('bcryptjs')

const db = require('../config/db')

const Projects = require('./Projects')

const Users = db.define(
  'users',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: Sequelize.STRING(60),
      allowNull: false
    },
    password: {
      type: Sequelize.STRING(60),
      allowNull: false
    }
  },
  {
    hooks: {
      beforeCreate (user) {
        user.password = bcrypt.hashSync(user.password, 10)
      }
    }
  }
)

Users.hasMany(Projects)

module.exports = Users
