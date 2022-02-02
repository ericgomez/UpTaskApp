const Users = require('../models/Users')
const sendEmail = require('../handlers/email')

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

    // create url of confirm
    const confirmUrl = `http://${req.headers.host}/confirm/${email}`

    // create object of user
    const user = {
      email
    }

    // Send email
    await sendEmail.sendEmail({
      user,
      subject: 'Confirm count UpTask ✔',
      confirmUrl,
      file: 'confirm-count'
    })

    req.flash('correct', 'A message was send to your email, confirm count')
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
