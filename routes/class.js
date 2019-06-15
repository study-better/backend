const mongoose = require('mongoose')
const asyncExpress = require('async-express')
const Class = mongoose.model('Class')
const Assignment = mongoose.model('Assignment')
const Card = mongoose.model('Card')
const Chapter = mongoose.model('Chapter')
const auth = require('../middleware/auth')

module.exports = (app) => {
  app.get('/classes', auth, loadClasses)
  app.post('/classes', auth, createClass)
  app.delete('/classes', auth, deleteClass)
}

const loadClasses = asyncExpress(async (req, res) => {
  const classes = await Class.find({}).exec()
  res.json(classes)
})

const createClass = asyncExpress(async (req, res) => {
  const _class = await Class.create(req.body)
  res.json(_class._doc)
})

const deleteClass = asyncExpress(async (req, res) => {
  const _class = await Class.findOne({
    _id: mongoose.Types.ObjectId(req.body._id),
  })
    .lean()
    .exec()
  if (!_class) {
    res.status(404).json({
      message: 'Could not find class to delete',
    })
    return
  }

  await Promise.all([
    Class.deleteOne({_id: mongoose.Types.ObjectId(req.body._id)}).exec(),
    Chapter.deleteMany({classId: mongoose.Types.ObjectId(req.body._id)}).exec(),
    Card.deleteMany({classId: mongoose.Types.ObjectId(req.body._id)}).exec(),
    Assignment.deleteMany({classId: mongoose.Types.ObjectId(req.body._id)}).exec(),
  ])
  res.status(204).end()
})
