const mongoose = require('mongoose')

const AssignmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
})

module.exports = mongoose.model('Assignment', AssignmentSchema)
