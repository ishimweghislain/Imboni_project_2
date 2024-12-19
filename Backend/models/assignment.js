const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  teacherName: { type: String, required: true },
  courseName: { type: String, required: true },
  selectedClasses: { type: [String], required: true },
  deadline: { type: Date, required: true },
  assignmentText: { type: String },
  file: { type: String }, // Path to the uploaded file
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for getting current student count
AssignmentSchema.virtual('currentStudentCount').get(function() {
  // This will be populated by the controller
  return this._currentStudentCount;
});

module.exports = mongoose.model('Assignment', AssignmentSchema);