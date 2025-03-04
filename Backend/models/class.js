const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  academic_level: { type: String, required: true },
  acronym: { type: String, required: true }
});

module.exports = mongoose.model('Class', classSchema, 'class'); // Explicitly map to 'class' collection