const express = require('express');
const multer = require('multer');
const Assignment = require('../models/assignment'); // Import the Assignment model
const router = express.Router();

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');  // Ensure the directory exists or is created
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);  // Unique filename with timestamp
  }
});

const upload = multer({ storage });

// Handle new assignment submission and save it to the database
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const {
      teacherName,
      courseName,
      selectedClasses,
      numStudents,
      deadline,
      assignmentText,
    } = req.body;

    const file = req.file?.filename; // Get the uploaded file's filename

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
      file: file ? file : null,  // Save the file path or null if no file was uploaded
    });

    // Save the assignment to the database
    const savedAssignment = await newAssignment.save();

    // Send response with saved assignment data
    res.status(201).json({
      message: 'Assignment submitted successfully',
      assignment: savedAssignment,
    });
  } catch (err) {
    console.error('Error submitting assignment:', err);
    res.status(500).json({ message: 'Failed to submit assignment' });
  }
});

// Add route to fetch all assignments
router.get('/', async (req, res) => {
  try {
    // Fetch all assignments from the database
    const assignments = await Assignment.find();
    
    if (assignments.length === 0) {
      return res.status(404).json({ message: 'No assignments found' });
    }

    // Send back the assignments as a response
    res.status(200).json(assignments);
  } catch (err) {
    console.error('Error fetching assignments:', err);
    res.status(500).json({ message: 'Failed to fetch assignments' });
  }
});

module.exports = router;
