const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
const protect = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// Create notes
router.post('/', protect, upload.single('file'), notesController.createNotes);

// Get all notes
router.get('/', protect, notesController.getNotes);

// Update notes
router.put('/:id', protect, upload.single('file'), notesController.updateNotes);

// Delete notes
router.delete('/:id', protect, notesController.deleteNotes);

// Get notes by teacher ID
router.get('/teacher/:teacherId', protect, notesController.getNotesByTeacher);

// Get single note by ID
router.get('/:id', protect, notesController.getNoteById);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error('Notes route error:', err);
  
  if (req.file && req.file.path) {
    fs.unlinkSync(req.file.path);
  }
  
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

module.exports = router;