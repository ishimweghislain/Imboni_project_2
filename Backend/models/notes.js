const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  teacherEmail: {
    type: String,
    required: true
  },
  teacherName: {
    type: String,
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  unitCount: {
    type: Number,
    required: true
  },
  units: [{
    unitNumber: Number,
    subContent: String
  }],
  filePath: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Notes', notesSchema);