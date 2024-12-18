const express = require('express');
const router = express.Router();
const { 
  getClasses, 
  getStudentCount, 
  getClassDetails, 
  getStudentsFromClasses 
} = require('../controllers/classController');

// Route to get all classes
router.get('/classes', getClasses);

// Route to get total students for selected classes
router.post('/classes/students-count', getStudentCount);

// Route to get details of a class based on level
router.get('/classes/:level', getClassDetails);

// Route to get students from specified classes
router.post('/classes/students', getStudentsFromClasses);

module.exports = router;