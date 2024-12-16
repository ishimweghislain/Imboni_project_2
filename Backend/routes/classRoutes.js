const express = require('express');
const router = express.Router();
const { getClasses, getStudentCount, getClassDetails } = require('../controllers/classController');

// Route to get all classes
router.get('/classes', getClasses);

// Route to get total students for selected classes
router.post('/classes/students-count', getStudentCount);

// Route to get details of a class based on level
router.get('/classes/:level', getClassDetails);

module.exports = router;
