const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Assignment = require('../models/assignment');
const router = express.Router();

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'), false);
    }
  },
});

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

    const file = req.file?.filename;

    const selectedClassesArray = selectedClasses.split(',').map(cls => cls.trim());

    const newAssignment = new Assignment({
      teacherName,
      courseName,
      selectedClasses: selectedClassesArray,
      numStudents: parseInt(numStudents),
      deadline: new Date(deadline),
      assignmentText,
      file: file || null,
    });

    const savedAssignment = await newAssignment.save();

    res.status(201).json({
      message: 'Assignment submitted successfully',
      assignment: savedAssignment,
    });
  } catch (err) {
    console.error('Error submitting assignment:', err);
    res.status(500).json({ message: 'Failed to submit assignment' });
  }
});

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
