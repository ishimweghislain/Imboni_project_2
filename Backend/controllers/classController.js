const Class = require('../models/class');

// Fetch all classes with total student count
const getClasses = async (req, res) => {
  try {
    // Fetch all classes with relevant fields
    const classes = await Class.find().select('level program acronym students').lean();

    if (classes.length === 0) {
      return res.status(404).json({ message: 'No classes found' });
    }

    // Add totalstudents field for each class
    const classesWithCounts = classes.map(classItem => ({
      ...classItem,
      totalstudents: classItem.students ? classItem.students.length : 0, // Calculate total students
    }));

    res.status(200).json(classesWithCounts);
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ message: 'Error fetching classes' });
  }
};

// Get total student count for selected classes
const getStudentCount = async (req, res) => {
  try {
    const { classes } = req.body;
    
    // Validate input
    if (!Array.isArray(classes) || classes.length === 0) {
      return res.status(400).json({ message: 'Invalid input: Please provide a list of classes' });
    }
    
    // Fetch the selected classes
    const selectedClasses = await Class.find({ level: { $in: classes } });
    
    if (selectedClasses.length === 0) {
      return res.status(404).json({ message: 'No matching classes found' });
    }
    
    // Calculate total student count
    const totalStudents = selectedClasses.reduce(
      (sum, classDoc) => sum + (classDoc.students?.length || 0),
      0
    );
    
    res.status(200).json({ totalStudents });
  } catch (error) {
    console.error('Error fetching student count:', error);
    res.status(500).json({ message: 'Error fetching student count' });
  }
};

// Fetch students from specified classes
const getStudentsFromClasses = async (req, res) => {
  try {
    const { classes } = req.body;
    
    // Validate input
    if (!Array.isArray(classes) || classes.length === 0) {
      return res.status(400).json({ message: 'Invalid input: Please provide a list of classes' });
    }
    
    // Fetch classes with their students
    const classDetails = await Class.find({ level: { $in: classes } });
    
    if (classDetails.length === 0) {
      return res.status(404).json({ message: 'No matching classes found' });
    }
    
    // Collect all students from the specified classes
    const allStudents = classDetails.flatMap(classDoc => 
      classDoc.students.map(student => ({
        name: student.name,
        class: classDoc.level
      }))
    );
    
    res.status(200).json(allStudents);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Error fetching students' });
  }
};

// Fetch class details (including students) based on level
const getClassDetails = async (req, res) => {
  try {
    const { level } = req.params;
    
    // Fetch class details including students based on level
    const classDetails = await Class.findOne({ level }).lean();
    
    if (!classDetails) {
      return res.status(404).json({ message: 'Class not found' });
    }
    
    res.status(200).json(classDetails);
  } catch (error) {
    console.error('Error fetching class details:', error);
    res.status(500).json({ message: 'Error fetching class details' });
  }
};

module.exports = { 
  getClasses, 
  getStudentCount, 
  getClassDetails, 
  getStudentsFromClasses 
};
