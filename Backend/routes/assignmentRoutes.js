const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Assignment = require('../models/assignment');
const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files in the uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename with timestamp
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB file size limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf',
      'text/plain',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
      'application/vnd.ms-excel', // .xls
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Invalid file type'), false); // Reject the file
    }
  },
});

// Route to handle assignment submission
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

    // Parse selectedClasses into an array
    const selectedClassesArray = selectedClasses.split(',').map(cls => cls.trim());

    // Create a new assignment document
    const newAssignment = new Assignment({
      teacherName,
      courseName,
      selectedClasses: selectedClassesArray,
      numStudents: parseInt(numStudents),
      deadline: new Date(deadline),
      assignmentText,
      file: file || null, // Save the file path or null if no file was uploaded
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

// Fetch all assignments
router.get('/', async (req, res) => {
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
});

module.exports = router;
