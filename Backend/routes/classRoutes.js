const express = require('express');
const router = express.Router();
const { getClasses, getStudentCount } = require('../controllers/classController');

// Route to get all classes
router.get('/classes', getClasses);

// Route to get total students for selected classes
router.post('/classes/students-count', getStudentCount);

module.exports = router;
