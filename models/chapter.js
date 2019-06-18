const mongoose = require('mongoose')

const ChapterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
})

module.exports = mongoose.model('Chapter', ChapterSchema)
