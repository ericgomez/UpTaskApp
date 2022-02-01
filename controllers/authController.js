const passport = require('passport')

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
