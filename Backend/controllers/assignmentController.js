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

    const filePath = req.file ? req.file.path : null; // Uploaded file path
    
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
      file: filePath, // Make sure it matches the schema
    });

    // Save the assignment in the database
    await newAssignment.save();
    res.status(201).json({ message: 'Assignment created successfully', assignment: newAssignment });
  } catch (error) {
    console.error('Error creating assignment:', error);
    res.status(500).json({ message: 'Failed to create assignment', error: error.message });
  }
};
