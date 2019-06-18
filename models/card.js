const mongoose = require('mongoose')
const ChapterSchema = require('./chapter')

const CardSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  front: {
    type: String,
  },
  back: {
    type: String,
  },
  answers: {
    type: [String],
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  chapterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
})

module.exports = mongoose.model('Card', CardSchema)
