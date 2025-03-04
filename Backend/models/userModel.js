const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const socialLinksSchema = new mongoose.Schema({
  linkedin: String,
  twitter: String,
  website: String,
});

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher'], required: true },
  bio: String,
  address: String,
  school: String,
  profilePic: String,
  socialLinks: socialLinksSchema,

  // Student-specific fields
  academicLevel: {
    type: String,
    enum: ['Primary', 'O-Level', 'A-Level'],
    required: function() { return this.role === 'student'; }
  },
  academicSubLevel: {
    type: String,
    required: function() { return this.role === 'student'; }
  },
  academicProgram: {
    type: String,
    enum: ['REB', 'TVET'],
    required: function() { 
      return this.role === 'student' && this.academicLevel === 'A-Level';
    }
  },
  academicCombination: {
    type: String,
    required: function() {
      return this.role === 'student' && this.academicLevel === 'A-Level';
    }
  },
  selectedCourses: [{
    type: String,
    required: function() { return this.role === 'student'; }
  }],

  // Teacher-specific fields
  degree: {
    type: String,
    required: function() { return this.role === 'teacher'; }
  },
  degreeFile: {
    type: String,
    required: function() { return this.role === 'teacher'; }
  },
  teachingSubjects: [{
    type: String,
    required: function() { return this.role === 'teacher'; }
  }],
  teachingClasses: [{
    type: String,
    required: function() { return this.role === 'teacher'; }
  }],
  courses_teaching: [{
    type: String,
    required: function() { return this.role === 'teacher'; }
  }],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to transform the user object when converting to JSON
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model('User', userSchema);
module.exports = User;