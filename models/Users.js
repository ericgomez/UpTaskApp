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
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Email cannot be empty'
        },
        isEmail: {
          msg: 'Invalid email'
        }
      },
      unique: {
        args: true,
        msg: 'Email already in use'
      }
    },
    password: {
      type: Sequelize.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password cannot be empty'
        }
      }
    },
    status: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    token: Sequelize.STRING,
    expirationToken: Sequelize.DATE
  },
  {
    hooks: {
      beforeCreate (user) {
        user.password = bcrypt.hashSync(user.password, 10)
      }
    }
  }
)

// Methods personality
Users.prototype.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

Users.hasMany(Projects)

module.exports = Users
