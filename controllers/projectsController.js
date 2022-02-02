const Projects = require('../models/Projects')
const Tasks = require('../models/Tasks')

exports.projectsHome = async (req, res) => {
  // console.log(res.locals.user)

  const userId = res.locals.user.id
  const projects = await Projects.findAll({ where: { userId } })

  res.render('index', {
    namePage: 'Projects',
    projects
  })
}

exports.formProject = async (req, res) => {
  const userId = res.locals.user.id
  const projects = await Projects.findAll({ where: { userId } })

  res.render('newProject', {
    namePage: 'New Project',
    projects
  })
}

exports.createProject = async (req, res) => {
  const userId = res.locals.user.id
  const projects = await Projects.findAll({ where: { userId } })

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
    const userId = res.locals.user.id
    // TODO: insert in DB
    await Projects.create({ name, userId })
    res.redirect('/')
  }
}
exports.projectDetail = async (req, res, next) => {
  const userId = res.locals.user.id

  const projectsPromise = Projects.findAll({ where: { userId } })
  const projectPromise = Projects.findOne({
    where: { url: req.params.url, userId }
  })

  const [projects, project] = await Promise.all([
    projectsPromise,
    projectPromise
  ])

  const tasks = await Tasks.findAll({
    where: { projectId: project.id }
    // include: [{ model: Projects }] // include is equal a JOIN
  })

  // in case the project doesn't exist return null
  if (!project) return next()

  // res.send('Detail of the project: ' + project.name)
  res.render('tasks', {
    namePage: 'Task Detail of ' + project.name,
    projects,
    project,
    tasks
  })
}

exports.formEdit = async (req, res, next) => {
  const userId = res.locals.user.id

  const projectsPromise = Projects.findAll({ where: { userId } })
  const projectPromise = Projects.findOne({
    where: { id: req.params.id, userId }
  })

  const [projects, project] = await Promise.all([
    projectsPromise,
    projectPromise
  ])

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
  const userId = res.locals.user.id
  const projects = await Projects.findAll({ where: { userId } })

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

  if (!result) next()

  res.status(200).send(`Your project has been deleted: ${result}`)
}
