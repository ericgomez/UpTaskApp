const passport = require('passport')

const Users = require('../models/Users')

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

      res.render('forgotPassword', {
        namePage: 'Forgot Password in UpTask',
        messages: req.flash()
      })
    }
  } catch (error) {}
}
