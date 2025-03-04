const Class = require('../models/class');

exports.getClasses = async (req, res) => {
  try {
    const { academicLevel } = req.query; // Optional query parameter to filter by academic level
    let classes;
    if (academicLevel) {
      classes = await Class.find({ academic_level: academicLevel });
    } else {
      classes = await Class.find();
    }
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};