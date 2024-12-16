const Assignment = require('../models/assignment');
const path = require('path');

// Create a new assignment
exports.createAssignment = async (req, res) => {
  try {
    const { 
      teacherName, 
      courseName, 
      selectedClasses, 
      numStudents, 
      deadline, 
      assignmentText 
    } = req.body;

    // Handle file path
    const filePath = req.file ? req.file.path : null;

    // Ensure selectedClasses is properly parsed into an array
    const selectedClassesArray = selectedClasses.split(',').map(cls => cls.trim());

    // Create a new assignment document
    const newAssignment = new Assignment({
      teacherName,
      courseName,
      selectedClasses: selectedClassesArray,
      numStudents,
      deadline,
      assignmentText,
      file: filePath, // Store the file path
    });

    // Save the assignment in the database
    const savedAssignment = await newAssignment.save();

    // Respond with success and the saved assignment
    res.status(201).json({
      message: 'Assignment created successfully',
      assignment: savedAssignment,
    });
  } catch (error) {
    console.error('Error creating assignment:', error);
    res.status(500).json({ 
      message: 'Failed to create assignment', 
      error: error.message 
    });
  }
};
