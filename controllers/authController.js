const { Sequelize } = require('sequelize')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const Users = require('../models/Users')

const Op = Sequelize.Op

exports.userAuthenticate = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
  // badRequestMessage: 'Both fields are required'  -- change message default
})

// Function validate if user is logged
exports.isUserAuthenticate = (req, res, next) => {
  // if user is authenticate
  if (req.isAuthenticated()) {
    return next()
  }

  return res.redirect('/login')
}

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login')
  })
}

// generate token if users is authenticated
exports.forgotPassword = async (req, res) => {
  const { email } = req.body

  try {
    const user = await Users.findOne({
      where: {
        email
      }
    })

    if (!user) {
      req.flash('error', 'User not found')

      // res.render('forgotPassword', {
      //   namePage: 'Forgot Password in UpTask',
      //   messages: req.flash()
      // })

      res.redirect('/forgot-password')
    }

    // generate token
    user.token = crypto.randomBytes(20).toString('hex')
    user.expirationToken = new Date() + 3600000 // 1 hour

    await user.save()

    // url
    const resetUrl = `http://${req.headers.host}/reset-password/${user.token}`
    console.log(resetUrl)
  } catch (error) {
    res.redirect('/forgot-password')
  }
}

exports.formResetPassword = async (req, res) => {
  const { token } = req.params

  const user = await Users.findOne({
    where: {
      token
    }
  })

  if (!user) {
    req.flash('error', 'User not valid')
    res.redirect('/forgot-password')
  }

  res.render('resetPassword', {
    namePage: 'Reset Password'
  })
}

exports.resetPassword = async (req, res) => {
  const { token } = req.params
  const { password } = req.body

  const user = await Users.findOne({
    where: {
      token,
      // verifying date in database if mayor of date now
      expirationToken: {
        [Op.gte]: Date.now
      }
    }
  })

  if (!user) {
    req.flash('error', 'User not valid')
    res.redirect('/forgot-password')
  }

  // hash password
  user.password = bcrypt.hashSync(password, 10)
  // delete token and expiration of reset password
  user.token = null
  user.expirationToken = null

  await user.save()

  req.flash('correct', 'Your password is updated successfully')
  res.redirect('/login')
}
