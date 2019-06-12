const mongoose = require('mongoose')
const asyncExpress = require('async-express')
const Class = mongoose.model('Class')
const Assignment = mongoose.model('Assignment')

module.exports = (app) => {
  app.get('/classes', loadClasses)
}

const loadClasses = asyncExpress(async (req, res) => {
  const classes = await Class.find({}).exec()
  res.json(classes)
})

const createClass = asyncExpress(async (req, res) => {
  const _class = await Class.create(req.body)
  res.json(_class)
})