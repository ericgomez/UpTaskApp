const Users = require('../models/Users')

exports.formCreateCount = (req, res) => {
  res.render('createCount', {
    namePage: 'Create Count in UpTask'
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
    res.render('createCount', {
      error: error.errors,
      namePage: 'Create Count in UpTask'
    })
  }
}
