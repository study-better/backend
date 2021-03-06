const mongoose = require('mongoose')
const ChapterSchema = require('./chapter')

const ClassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isDefinedClass: {
    type: Boolean,
    default: false,
  }
})

module.exports = mongoose.model('Class', ClassSchema)
