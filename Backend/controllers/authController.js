const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Create response object with role-specific information
    const responseUser = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    };

    // Add student-specific fields
    if (user.role === 'student') {
      responseUser.academicLevel = user.academicLevel;
      responseUser.academicSubLevel = user.academicSubLevel;
      responseUser.selectedCourses = user.selectedCourses;
      
      if (user.academicLevel === 'A-Level') {
        responseUser.academicProgram = user.academicProgram;
        responseUser.academicCombination = user.academicCombination;
      }
    }

    // Add teacher-specific fields
    if (user.role === 'teacher') {
      responseUser.degree = user.degree;
      responseUser.teachingSubjects = user.teachingSubjects;
      responseUser.teachingClasses = user.teachingClasses;
      responseUser.courses_teaching = user.courses_teaching;
    }
    
    res.json({
      token,
      user: responseUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Register User
const registerUser = async (req, res) => {
  const { 
    firstName, 
    lastName, 
    email, 
    password, 
    role,
    academicLevel,
    academicSubLevel,
    academicProgram,
    academicCombination,
    selectedCourses,
    degree,
    teachingSubjects,
    teachingClasses,
    courses_teaching
  } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create base user object
    const userData = {
      firstName,
      lastName,
      email,
      password,
      role
    };

    // Add student-specific fields if role is student
    if (role === 'student') {
      userData.academicLevel = academicLevel || 'Primary'; // Default value
      userData.academicSubLevel = academicSubLevel || '1'; // Default value
      userData.selectedCourses = selectedCourses || [];

      // Add A-Level specific fields if applicable
      if (academicLevel === 'A-Level') {
        userData.academicProgram = academicProgram || 'REB'; // Default value
        userData.academicCombination = academicCombination || 'PCM'; // Default value
      }
    }

    // Add teacher-specific fields if role is teacher
    if (role === 'teacher') {
      userData.degree = degree || 'Bachelor'; // Default value
      userData.degreeFile = 'default-path.pdf'; // Temporary default
      userData.teachingSubjects = teachingSubjects || [];
      userData.teachingClasses = teachingClasses || [];
      userData.courses_teaching = courses_teaching || [];
    }

    const user = new User(userData);
    await user.save();

    // Generate JWT token for immediate login after registration
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Create response object with role-specific information
    const responseUser = {
      id: user._id,
      firstName,
      lastName,
      email,
      role
    };

    // Add student-specific fields to the response if the user is a student
    if (role === 'student') {
      responseUser.academicLevel = user.academicLevel;
      responseUser.academicSubLevel = user.academicSubLevel;
      responseUser.selectedCourses = user.selectedCourses;
      
      if (user.academicLevel === 'A-Level') {
        responseUser.academicProgram = user.academicProgram;
        responseUser.academicCombination = user.academicCombination;
      }
    }

    // Add teacher-specific fields to the response if the user is a teacher
    if (role === 'teacher') {
      responseUser.degree = user.degree;
      responseUser.teachingSubjects = user.teachingSubjects;
      responseUser.teachingClasses = user.teachingClasses;
      responseUser.courses_teaching = user.courses_teaching;
    }

    res.status(201).json({
      message: 'User registered successfully',
      token,  // Include token in response
      user: responseUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Server Error', 
      error: error.message,
      details: error.errors // This will show validation errors
    });
  }
};

module.exports = { loginUser, registerUser };