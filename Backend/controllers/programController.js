const Program = require('../models/program');

exports.getPrograms = async (req, res) => {
  try {
    const { academicLevel } = req.query; // Optional query parameter to filter by academic level
    let programs;
    if (academicLevel) {
      programs = await Program.find({ academic_level: academicLevel });
    } else {
      programs = await Program.find();
    }
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};