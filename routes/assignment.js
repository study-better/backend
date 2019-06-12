const mongoose = require('mongoose')
const asyncExpress = require('async-express')
const Assignment = mongoose.model('Assignment')

module.exports = (app) => {
  app.get('/assignments', loadAssignments)
  app.post('/assignments', createAssignment)
}

const loadAssignments = asyncExpress(async (req, res) => {
  const assignments = await Assignment.find({}).exec()
  res.json(assignments)
})

const createAssignment = asyncExpress(async (req, res) => {
  const assignment = await Assignment.create(req.body)
  res.json(assignment)
})