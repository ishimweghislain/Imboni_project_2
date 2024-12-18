const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();

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

// Route to create a new assignment
router.post('/', upload.single('file'), createAssignment);

// Route to get all assignments
router.get('/', getAssignments);

// Route to get students for a specific assignment
router.get('/:assignmentId/students', getAssignmentStudents);

module.exports = router;