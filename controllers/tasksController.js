const Projects = require('../models/Projects')
const Tasks = require('../models/Tasks')

exports.addTask = async (req, res, next) => {
  const project = await Projects.findOne({ where: { url: req.params.url } })

  const { task } = req.body
  const projectId = project.id

  const result = await Tasks.create({ task, projectId })

  if (!result) next()

  res.redirect(`/project/${req.params.url}`)
}

exports.updateTask = (req, res, next) => {
  res.send('updateTask')
}
