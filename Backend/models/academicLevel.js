const mongoose = require('mongoose');

const academicLevelSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model('AcademicLevel', academicLevelSchema, 'academic_level');