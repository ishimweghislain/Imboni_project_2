const express = require('express');
const multer = require('multer');
const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Handle new assignment submission
router.post('/', upload.single('file'), (req, res) => {
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

    // Simulate saving to a database
    res.status(201).json({
      message: 'Assignment submitted successfully',
      data: {
        teacherName,
        courseName,
        selectedClasses,
        numStudents,
        deadline,
        assignmentText,
        file,
      }
    });
  } catch (err) {
    console.error('Error submitting assignment:', err);
    res.status(500).json({ message: 'Failed to submit assignment' });
  }
});

module.exports = router;
