const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

/**
 * Authentication middleware
 * Verifies the JWT token and attaches the user data to the request
 */
const auth = async (req, res, next) => {
  // Get token from header
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  // Check if token exists
  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Access denied. No token provided.' 
    });
  }
  
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user by id
    const user = await User.findById(decoded.id).select('-password');
    
    // Check if user exists
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid token. User not found.' 
      });
    }
    
    // Attach user to request object
    req.user = decoded;
    req.token = token;
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    
    // Handle different JWT errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token expired. Please login again.' 
      });
    }
    
    res.status(401).json({ 
      success: false,
      message: 'Invalid token. Authorization denied.' 
    });
  }
};

/**
 * Role-based authorization middleware
 * Restricts access based on user roles
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role (${req.user.role}) is not authorized to access this resource`
      });
    }
    next();
  };
};

module.exports = { auth, authorize };