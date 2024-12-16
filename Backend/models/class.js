const mongoose = require('mongoose');

// Define the schema
const classSchema = new mongoose.Schema(
  {
    level: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    program: {
      type: String,
      trim: true,
    },
    acronym: {
      type: String,
      trim: true,
    },
    students: [
      {
        name: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
    collection: 'classes',
  }
);

// Virtual field to calculate total students
classSchema.virtual('totalstudents').get(function () {
  return this.students.length;
});

// Ensure virtual fields are included in JSON and Object output
classSchema.set('toObject', { virtuals: true });
classSchema.set('toJSON', { virtuals: true });

// Model export
module.exports = mongoose.model('Class', classSchema);
