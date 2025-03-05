const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  academic_level: { type: String, required: true },
  type: { type: String, required: true, enum: ['REB', 'TVET'] }, // Restrict to REB or TVET
  combination: { type: String, required: true }
});

module.exports = mongoose.model('Program', programSchema, 'program'); // Explicitly map to 'program' collection