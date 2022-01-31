const Projects = require('../models/Projects')

exports.projectsHome = async (req, res) => {
  const projects = await Projects.findAll()

  res.render('index', {
    namePage: 'Projects',
    projects
  })
}

exports.formProject = async (req, res) => {
  const projects = await Projects.findAll()

  res.render('newProject', {
    namePage: 'New Project',
    projects
  })
}

exports.createProject = async (req, res) => {
  const projects = await Projects.findAll()
  const { name } = req.body

  let errors = []

  if (!name) {
    errors.push({ text: 'Please add a name' })
  }

  if (errors.length > 0) {
    res.render('newProject', {
      namePage: 'New Project',
      projects,
      errors
    })
  } else {
    // TODO: insert in DB
    const projects = await Projects.create({ name })
    res.redirect('/')
  }
}
exports.projectDetail = async (req, res, next) => {
  const projects = await Projects.findAll()
  const project = await Projects.findOne({ where: { url: req.params.url } })

  // in case the project doesn't exist return null
  if (!project) return next()

  // res.send('Detail of the project: ' + project.name)
  res.render('tasks', {
    namePage: 'Task Detail of ' + project.name,
    projects,
    project
  })
}

exports.formEdit = async (req, res, next) => {
  const projects = await Projects.findAll()
  const project = await Projects.findOne({ where: { id: req.params.id } })

  // in case the project doesn't exist return null
  if (!project) return next()

  // res.send('Detail of the project: ' + project.name)
  res.render('newProject', {
    namePage: 'Edit Project ',
    projects,
    project
  })
}

exports.updateProject = async (req, res) => {
  const projects = await Projects.findAll()
  const { name } = req.body

  let errors = []

  if (!name) {
    errors.push({ text: 'Please add a name' })
  }

  if (errors.length > 0) {
    res.render('newProject', {
      namePage: 'New Project',
      projects,
      errors
    })
  } else {
    // TODO: update in DB
    await Projects.update({ name }, { where: { id: req.params.id } })
    res.redirect('/')
  }
}

exports.deleteProject = async (req, res, next) => {
  const { urlProject } = req.query

  // DELETE FROM projects WHERE url = urlProject is equivalent to:
  const result = await Projects.destroy({ where: { url: urlProject } })

  res.status(200).send(`Your project has been deleted: ${result}`)
}
