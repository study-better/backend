const mongoose = require('mongoose')
const asyncExpress = require('async-express')
const Assignment = mongoose.model('Assignment')
const auth = require('../middleware/auth')

module.exports = (app) => {
  app.get('/assignments', auth, loadAssignments)
  app.post('/assignments', auth, createAssignment)
  app.delete('/assignments', auth, deleteAssignment)
}

const loadAssignments = asyncExpress(async (req, res) => {
  const assignments = await Assignment.find({}).exec()
  res.json(assignments)
})

const createAssignment = asyncExpress(async (req, res) => {
  const assignment = await Assignment.create(req.body)
  res.json(assignment._doc)
})

const deleteAssignment = asyncExpress(async (req, res) => {
  const _assignment = await Class.findOne({
    _id: mongoose.Types.ObjectId(req.body._id),
  })
    .lean()
    .exec()
  if (!_class) {
    res.status(404).json({
      message: 'Could not find assignment to delete',
    })
    return
  }

  await Promise.all([
    Assignment.deleteMany({_id: mongoose.Types.ObjectId(req.body._id)}).exec(),
  ])
  res.status(204).end()
})
