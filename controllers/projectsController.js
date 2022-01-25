const Projects = require('../models/Projects')

exports.projectsHome = (req, res) => {
  res.render('index', {
    namePage: 'Projects'
  })
}

exports.formProject = (req, res) => {
  res.render('newProject', {
    namePage: 'New Project'
  })
}

exports.createProject = async (req, res) => {
  // console.log(req.body)
  const { name } = req.body

  let errors = []

  if (!name) {
    errors.push({ text: 'Please add a name' })
  }

  if (errors.length > 0) {
    res.render('newProject', {
      namePage: 'New Project',
      errors
    })
  } else {
    // TODO: insert in DB
    const projects = await Projects.create({ name })
    res.redirect('/')
  }
}
