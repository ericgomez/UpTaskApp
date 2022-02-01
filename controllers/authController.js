const passport = require('passport')

exports.userAuthenticate = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
  // badRequestMessage: 'Both fields are required'  -- change message default
})
