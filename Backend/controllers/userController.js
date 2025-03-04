const User = require('../models/userModel');

// Get user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    // Only admin should be able to see all users
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to access this resource' });
    }
    
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    // Check if user exists
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Basic user data that can be updated
    const { 
      firstName, 
      lastName, 
      email,
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

    // Update basic fields if provided
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;

    // Update student-specific fields
    if (user.role === 'student') {
      if (academicLevel) user.academicLevel = academicLevel;
      if (academicSubLevel) user.academicSubLevel = academicSubLevel;
      if (selectedCourses) user.selectedCourses = selectedCourses;
      
      if (user.academicLevel === 'A-Level') {
        if (academicProgram) user.academicProgram = academicProgram;
        if (academicCombination) user.academicCombination = academicCombination;
      }
    }

    // Update teacher-specific fields
    if (user.role === 'teacher') {
      if (degree) user.degree = degree;
      if (teachingSubjects) user.teachingSubjects = teachingSubjects;
      if (teachingClasses) user.teachingClasses = teachingClasses;
      if (courses_teaching) user.courses_teaching = courses_teaching;
    }

    // Handle file uploads if any
    if (req.files) {
      // Profile picture upload
      if (req.files.profilePic) {
        user.profilePic = req.files.profilePic[0].path;
      }
      
      // Degree file upload (for teachers)
      if (req.files.degreeFile && user.role === 'teacher') {
        user.degreeFile = req.files.degreeFile[0].path;
      }
    }

    // Save updated user
    await user.save();

    // Return updated user without password
    const updatedUser = await User.findById(req.user.id).select('-password');
    res.json({
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    // Only admin or the user themselves can delete their account
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
      return res.status(403).json({ message: 'Not authorized to delete this user' });
    }
    
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Change password
const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getProfile,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  changePassword
};