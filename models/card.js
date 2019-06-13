const mongoose = require('mongoose')
const ChapterSchema = requre('chapterSchema')

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
  chapter: {
    type: ChapterSchema,
  },
})

module.exports = mongoose.model('Class', ClassSchema)
