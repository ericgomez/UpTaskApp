const Users = require('../models/Users')

exports.formCreateCount = (req, res) => {
  res.render('createCount', {
    namePage: 'Create Count in UpTask'
  })
}

exports.formLogin = (req, res) => {
  const { error } = res.locals.messages

  res.render('login', {
    namePage: 'Login in UpTask',
    error
  })
}

exports.createCount = async (req, res, next) => {
  // read data from form
  const { email, password } = req.body

  // create new count
  try {
    await Users.create({
      email,
      password
    })

    res.redirect('/login')
  } catch (error) {
    // creating error with flash message
    req.flash(
      'error',
      error.errors.map(error => error.message)
    )

    res.render('createCount', {
      // using error
      messages: req.flash(),
      namePage: 'Create Count in UpTask',
      email,
      password
    })
  }
}

exports.formForgotPassword = (req, res) => {
  res.render('forgotPassword', {
    namePage: 'Forgot Password in UpTask'
  })
}
