const mongoose = require('mongoose');

const ClassSelectionSchema = new mongoose.Schema({
  level: { 
    type: String, 
    required: true 
  },
  program: { 
    type: String, 
    required: true 
  },
  acronym: { 
    type: String, 
    required: true 
  }
}, { _id: false });

const AssignmentSchema = new mongoose.Schema({
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
  selectedClasses: {
    type: [ClassSelectionSchema],
    required: true,
    validate: {
      validator: function(classes) {
        return classes && classes.length > 0;
      },
      message: 'At least one class must be selected'
    }
  },
  deadline: { 
    type: Date, 
    required: true 
  },
  assignmentText: { 
    type: String,
    required: function() {
      return !this.file;
    }
  },
  file: { 
    type: String,
    required: function() {
      return !this.assignmentText;
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for getting current student count
AssignmentSchema.virtual('currentStudentCount').get(function() {
  return this._currentStudentCount;
});

// Virtual for formatted deadline
AssignmentSchema.virtual('formattedDeadline').get(function() {
  return this.deadline ? this.deadline.toLocaleDateString() : '';
});

// Virtual for remaining time
AssignmentSchema.virtual('remainingTime').get(function() {
  if (!this.deadline) return null;
  const now = new Date();
  const timeLeft = this.deadline - now;
  return timeLeft > 0 ? timeLeft : 0;
});

// Pre-save middleware to ensure either file or assignmentText is provided
AssignmentSchema.pre('save', function(next) {
  if (!this.file && !this.assignmentText) {
    next(new Error('Either file or assignment text must be provided'));
  } else {
    next();
  }
});

// Method to check if assignment is active
AssignmentSchema.methods.isActive = function() {
  return new Date() < this.deadline;
};

// Static method to find active assignments
AssignmentSchema.statics.findActive = function() {
  return this.find({
    deadline: { $gt: new Date() }
  });
};

// Indexes for efficient queries
AssignmentSchema.index({ deadline: 1 });
AssignmentSchema.index({ 'selectedClasses.level': 1 });
AssignmentSchema.index({ teacherName: 1 });
AssignmentSchema.index({ teacherId: 1 });

module.exports = mongoose.model('Assignment', AssignmentSchema);