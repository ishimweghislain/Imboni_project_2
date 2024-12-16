const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  teacherName: { type: String, required: true },
  courseName: { type: String, required: true },
  selectedClasses: { type: [String], required: true },
  numStudents: { type: Number, required: true },
  deadline: { type: Date, required: true },
  assignmentText: { type: String },
  file: { type: String }, // Path to the uploaded file
}, { timestamps: true });

module.exports = mongoose.model('Assignment', AssignmentSchema);
