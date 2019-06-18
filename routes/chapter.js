const mongoose = require('mongoose')
const asyncExpress = require('async-express')
const Chapter = mongoose.model('Chapter')
const Card = mongoose.model('Card')
const auth = require('../middleware/auth')

module.exports = (app) => {
  app.get('/chapters', auth, loadChapters)
  app.post('/chapters', auth, createChapter)
  app.delete('/chapters', auth, deleteChapter)
}

const loadChapters = asyncExpress(async (req, res) => {
  const chapters = await Chapter.find({}).exec()
  res.json(chapters)
})

const createChapter = asyncExpress(async (req, res) => {
  const chapter = await Chapter.create(req.body)
  res.json(chapter._doc)
})

const deleteChapter = asyncExpress(async (req, res) => {
  const _chapter = await Chapter.findOne({
    _id: mongoose.Types.ObjectId(req.body._id),
  })
    .lean()
    .exec()
  if (!_chapter) {
    res.status(404).json({
      message: 'Could not find chapter to delete',
    })
    return
  }

  await Promise.all([
    Chapter.deleteOne({_id: mongoose.Types.ObjectId(req.body._id)}).exec(),
    Card.deleteMany({chapterId: mongoose.Types.ObjectId(req.body._id)}).exec(),
  ])
  res.status(204).end()
})
