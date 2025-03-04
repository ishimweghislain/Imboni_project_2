const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');

// Ensure the route is exactly as expected
router.get('/', schoolController.getSchools);

module.exports = router;