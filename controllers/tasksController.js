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

exports.updateTask = async (req, res, next) => {
  const { id } = req.params
  const task = await Tasks.findOne({ where: { id } })

  // change status
  task.status = task.status === 0 ? 1 : 0

  const result = await task.save()

  if (!result) next()

  res.status(200).send('Updated task')
}

exports.deleteTask = async (req, res, next) => {
  const { id } = req.params

  const result = await Tasks.destroy({ where: { id } })

  if (!result) next()

  res.status(200).send('Deleted task')
}
