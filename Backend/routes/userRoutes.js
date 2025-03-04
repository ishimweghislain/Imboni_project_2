const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const upload = require('../middlewares/uploadMiddleware');
const { auth } = require('../middlewares/authMiddleware'); // Changed to destructure auth
const { loginUser, registerUser } = require('../controllers/authController');
const userController = require('../controllers/userController');

// Debug: Log the imported userController to verify its contents
console.log('userController:', userController);
console.log('getProfile:', userController.getProfile);

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', auth, userController.getProfile);
router.get('/all', auth, userController.getAllUsers);
router.get('/:id', auth, userController.getUserById);
router.delete('/:id', auth, userController.deleteUser);
router.put('/password', auth, userController.changePassword);

// Update profile - with file uploads
router.put('/profile', auth, upload.fields([
  { name: 'profilePic', maxCount: 1 },
  { name: 'degreeFile', maxCount: 1 }
]), userController.updateUser);

// Temporary test route to isolate the issue
router.get('/test', (req, res) => {
  res.send('Test route works');
});

module.exports = router;