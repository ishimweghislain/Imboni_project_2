const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');

router.get('/', programController.getPrograms); // Use '/' to avoid duplication with /api/programs

module.exports = router;