const express = require('express');
const { loginUser, registerUser } = require('../controllers/authController');
const router = express.Router();

// Login Route
router.post('/login', loginUser);

// Register Route
router.post('/register', registerUser);

module.exports = router;
