const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

//
const Users = require('../models/Users')

// local strategy - Login with email and password
passport.use(
  new LocalStrategy(
    // by default, local strategy uses username and password, we will override with email
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        // find the user based on email
        const user = await Users.findOne({
          where: {
            email
          }
        })

        if (!user) {
          // done - require (error, user, info)
          return done(null, false, { message: 'Incorrect email' })
        }

        // check if password is correct
        const isMatch = await user.validatePassword(password)
        if (!isMatch) {
          // done - require (error, user, info)
          return done(null, false, { message: 'Incorrect password' })
        }

        // done - require (error, user, info)
        return done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
)

// serialize the user
passport.serializeUser((user, callback) => {
  // callback - require (error, user)
  callback(null, user)
})

// deserialize the user
passport.deserializeUser((user, callback) => {
  // callback - require (error, user)
  callback(null, user)
})

//export
module.exports = passport
