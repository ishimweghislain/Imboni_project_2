const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { auth } = require('../middlewares/authMiddleware'); // Changed to destructure auth

const { 
  createAssignment, 
  getAssignments,
  getAssignmentStudents 
} = require('../controllers/assignmentController');

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
      'application/pdf'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only images and PDFs are allowed'), false);
    }
  },
});

// Protected routes - only accessible to authenticated users
router.post('/', auth, upload.single('file'), createAssignment); // Changed protect to auth
router.get('/', auth, getAssignments); // Changed protect to auth
router.get('/:assignmentId/students', auth, getAssignmentStudents); // Changed protect to auth

module.exports = router;