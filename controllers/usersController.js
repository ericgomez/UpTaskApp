const Users = require('../models/Users')

exports.formCreateCount = (req, res) => {
  res.render('createCount', {
    namePage: 'Create Count in UpTask'
  })
}

exports.createCount = (req, res, next) => {
  // read data from form
  const { email, password } = req.body

  // create new count
  Users.create({
    email,
    password
  }).then(() => {
    res.redirect('/login')
  })
}
