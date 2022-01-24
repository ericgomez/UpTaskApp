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

exports.createProject = (req, res) => {
  res.send('Sending new project')
}
