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
      deadline,
      assignmentText,
      file: filePath, // Store the file path
    });

    // Save the assignment in the database
    const savedAssignment = await newAssignment.save();

    // Fetch current student count
    const classes = await Class.find({ level: { $in: selectedClassesArray } });
    const currentStudentCount = classes.reduce((total, cls) => total + cls.students.length, 0);

    // Respond with success and the saved assignment
    res.status(201).json({
      message: 'Assignment created successfully',
      assignment: {
        ...savedAssignment.toObject(),
        currentStudentCount
      },
    });
  } catch (error) {
    console.error('Error creating assignment:', error);
    res.status(500).json({
      message: 'Failed to create assignment',
      error: error.message
    });
  }
};

// Fetch all assignments with current student counts
exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({});

    if (assignments.length === 0) {
      return res.status(404).json({ message: 'No assignments found' });
    }

    // Get current student counts for each assignment
    const assignmentsWithCurrentCounts = await Promise.all(
      assignments.map(async (assignment) => {
        const classes = await Class.find({ 
          level: { $in: assignment.selectedClasses } 
        });
        
        const currentStudentCount = classes.reduce(
          (total, cls) => total + cls.students.length, 
          0
        );

        return {
          ...assignment.toObject(),
          numStudents: currentStudentCount // Override the stored count with current count
        };
      })
    );

    res.status(200).json(assignmentsWithCurrentCounts);
  } catch (err) {
    console.error('Error fetching assignments:', err);
    res.status(500).json({ message: 'Failed to fetch assignments' });
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
    const classes = await Class.find({
      level: { $in: assignment.selectedClasses }
    }).select('students.name level students.submissionStatus');

    // Flatten the students array and add class level
    const formattedStudents = classes.flatMap(classDoc =>
      classDoc.students.map(student => ({
        name: student.name,
        class: classDoc.level,
        submissionStatus: student.submissionStatus
      }))
    );

    res.status(200).json({
      students: formattedStudents,
      totalCount: formattedStudents.length
    });
  } catch (error) {
    console.error('Error fetching assignment students:', error);
    res.status(500).json({ message: 'Error fetching assignment students' });
  }
};

module.exports = {
  createAssignment: exports.createAssignment,
  getAssignments: exports.getAssignments,
  getAssignmentStudents
};