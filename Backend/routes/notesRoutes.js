const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const notesController = require('../controllers/notesController');
const auth = require('../middlewares/authMiddleware'); // Make sure you have this middleware

// Apply auth middleware to all routes
router.use(auth);

// Create notes - handles file upload
router.post('/', 
  upload.single('file'), // Handle single file upload
  (req, res, next) => {
    // Handle multer errors
    if (req.fileValidationError) {
      return res.status(400).json({
        success: false,
        message: req.fileValidationError
      });
    }
    next();
  },
  notesController.createNotes
);

// Get all notes
router.get('/', notesController.getNotes);

// Get notes for a specific teacher
router.get('/teacher/:teacherId', notesController.getNotesByTeacher);

// Download notes file
router.get('/download/:id', notesController.downloadNotesFile);

// Error handling middleware
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Handle multer-specific errors
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size is too large. Maximum size is 5MB.'
      });
    }
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
  
  // Handle other errors
  console.error('Route Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = router;