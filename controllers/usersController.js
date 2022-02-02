const Users = require('../models/Users')
const sendEmail = require('../handlers/email')

exports.formCreateAccount = (req, res) => {
  res.render('createAccount', {
    namePage: 'Create Account in UpTask'
  })
}

exports.formLogin = (req, res) => {
  const { error } = res.locals.messages

  res.render('login', {
    namePage: 'Login in UpTask',
    error
  })
}

exports.createAccount = async (req, res, next) => {
  // read data from form
  const { email, password } = req.body

  // create new account
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
      subject: 'Confirm Account UpTask ✔',
      confirmUrl,
      file: 'confirm-account'
    })

    req.flash('correct', 'A message was send to your email, confirm account')
    res.redirect('/login')
  } catch (error) {
    // creating error with flash message
    req.flash(
      'error',
      error.errors.map(error => error.message)
    )

    res.render('createAccount', {
      // using error
      messages: req.flash(),
      namePage: 'Create Account in UpTask',
      email,
      password
    })
  }
}

exports.confirmAccount = async (req, res) => {
  const { email } = req.params

  const user = await Users.findOne({
    where: {
      email
    }
  })

  if (!user) {
    req.flash('error', 'User not valid')
    res.redirect('/create-account')
  }

  user.status = 1

  await user.save()

  req.flash('correct', 'Your account is activated successfully')
  res.redirect('/login')
}

exports.formForgotPassword = (req, res) => {
  res.render('forgotPassword', {
    namePage: 'Forgot Password in UpTask'
  })
}
