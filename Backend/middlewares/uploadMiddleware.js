const multer = require('multer');
const path = require('path');

// Configure storage for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine destination folder based on file type
    let uploadFolder = 'uploads/';
    
    if (file.fieldname === 'profilePic') {
      uploadFolder += 'profiles/';
    } else if (file.fieldname === 'degreeFile') {
      uploadFolder += 'degrees/';
    } else {
      uploadFolder += 'misc/';
    }
    
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    // Create a unique filename with timestamp and original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter to restrict file types
const fileFilter = (req, file, cb) => {
  // Allow different file types based on field name
  if (file.fieldname === 'profilePic') {
    // Only allow images for profile pictures
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed for profile pictures!'), false);
    }
  } else if (file.fieldname === 'degreeFile') {
    // Allow PDFs and images for degree files
    if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and image files are allowed for degree documents!'), false);
    }
  } else {
    // Default for other types
    cb(null, true);
  }
};

// Configure multer with the defined settings
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

module.exports = upload;