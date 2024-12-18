const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  program: {
    type: String,
    trim: true
  },
  acronym: {
    type: String,
    trim: true
  },
  students: [
    {
      name: { type: String, required: true },
      submissionStatus: { type: String, enum: ['submitted', 'not submitted'], default: 'not submitted' }
    }
  ]
}, {
  timestamps: true,
  collection: 'classes'
});

classSchema.virtual('totalstudents').get(function () {
  return this.students.length;
});

classSchema.virtual('submittedStudents').get(function () {
  return this.students.filter(student => student.submissionStatus === 'submitted').length;
});

classSchema.set('toObject', { virtuals: true });
classSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Class', classSchema);