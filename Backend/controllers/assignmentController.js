const Assignment = require('../models/assignment');
const Class = require('../models/class');
const path = require('path');

exports.createAssignment = async (req, res) => {
  try {
    const {
      teacherName,
      courseName,
      selectedClasses,
      deadline,
      assignmentText
    } = req.body;

    const filePath = req.file ? req.file.path : null;

    // Parse the selectedClasses if it's a string
    let selectedClassesArray;
    try {
      selectedClassesArray = typeof selectedClasses === 'string' 
        ? JSON.parse(selectedClasses) 
        : selectedClasses;
    } catch (error) {
      return res.status(400).json({ message: 'Invalid class selection format' });
    }

    // Store complete class information
    const classIdentifiers = selectedClassesArray.map(cls => ({
      level: cls.level,
      program: cls.program,
      acronym: cls.acronym
    }));

    // Create a new assignment document with complete class information
    const newAssignment = new Assignment({
      teacherName,
      courseName,
      selectedClasses: classIdentifiers, // Store complete class information
      deadline,
      assignmentText,
      file: filePath,
    });

    // Save the assignment in the database
    const savedAssignment = await newAssignment.save();

    // Fetch current student count for exactly matched classes
    const classes = await Class.find({
      $or: classIdentifiers.map(cls => ({
        level: cls.level,
        program: cls.program,
        acronym: cls.acronym
      }))
    });

    const currentStudentCount = classes.reduce((total, cls) => total + cls.students.length, 0);

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

exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({});

    if (assignments.length === 0) {
      return res.status(404).json({ message: 'No assignments found' });
    }

    // Get current student counts for exactly matched classes
    const assignmentsWithCurrentCounts = await Promise.all(
      assignments.map(async (assignment) => {
        const classes = await Class.find({
          $or: assignment.selectedClasses.map(cls => ({
            level: cls.level,
            program: cls.program,
            acronym: cls.acronym
          }))
        });
        
        const currentStudentCount = classes.reduce(
          (total, cls) => total + cls.students.length, 
          0
        );

        return {
          ...assignment.toObject(),
          numStudents: currentStudentCount
        };
      })
    );

    res.status(200).json(assignmentsWithCurrentCounts);
  } catch (err) {
    console.error('Error fetching assignments:', err);
    res.status(500).json({ message: 'Failed to fetch assignments' });
  }
};

const getAssignmentStudents = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    const assignment = await Assignment.findById(assignmentId);
    
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Find students from exactly matched classes
    const classes = await Class.find({
      $or: assignment.selectedClasses.map(cls => ({
        level: cls.level,
        program: cls.program,
        acronym: cls.acronym
      }))
    }).select('students.name level program acronym students.submissionStatus');

    const formattedStudents = classes.flatMap(classDoc =>
      classDoc.students.map(student => ({
        name: student.name,
        class: classDoc.level,
        program: classDoc.program,
        acronym: classDoc.acronym,
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