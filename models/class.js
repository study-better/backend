const mongoose = require('mongoose')
const ChapterSchema = requre('chapterSchema')

const ClassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  chapters: {
    type: [ChapterSchema]
  },
  isDefinedClass: {
    type: Boolean,
    default: false,
  }
})

module.exports = mongoose.model('Class', ClassSchema)
