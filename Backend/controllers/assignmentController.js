const Assignment = require('../models/assignment');
const Class = require('../models/class');
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

// Fetch students for specific classes assigned to an assignment
const getAssignmentStudents = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    // Find the assignment first
    const assignment = await Assignment.findById(assignmentId);
    
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Find students from the assigned classes
    const students = await Class.find({ 
      level: { $in: assignment.selectedClasses } 
    }).select('students.name level');

    // Flatten the students array and add class level
    const formattedStudents = students.flatMap(classDoc => 
      classDoc.students.map(student => ({
        name: student.name,
        class: classDoc.level
      }))
    );

    res.status(200).json(formattedStudents);
  } catch (error) {
    console.error('Error fetching assignment students:', error);
    res.status(500).json({ message: 'Error fetching assignment students' });
  }
};

// Fetch all assignments
exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({}, 'courseName deadline numStudents file assignmentText');
    
    if (assignments.length === 0) {
      return res.status(404).json({ message: 'No assignments found' });
    }
    
    res.status(200).json(assignments);
  } catch (err) {
    console.error('Error fetching assignments:', err);
    res.status(500).json({ message: 'Failed to fetch assignments' });
  }
};

module.exports = { 
  createAssignment: exports.createAssignment,
  getAssignments: exports.getAssignments,
  getAssignmentStudents 
};