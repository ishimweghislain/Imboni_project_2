const express = require('express');
const router = express.Router();
const academicLevelController = require('../controllers/academicLevelController');

router.get('/academic-levels', academicLevelController.getAcademicLevels);

// Test route to verify file is loaded
router.get('/test', (req, res) => res.send('Academic Level Routes Working!'));

module.exports = router;