const AcademicLevel = require('../models/academicLevel');

exports.getAcademicLevels = async (req, res) => {
  try {
    const academicLevels = await AcademicLevel.find();
    console.log('Academic Levels:', academicLevels); // Add logging to debug
    res.status(200).json(academicLevels);
  } catch (error) {
    console.error('Error in getAcademicLevels:', error);
    res.status(500).json({ message: error.message });
  }
};