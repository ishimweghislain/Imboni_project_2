const Class = require('../models/class');

// Fetch all classes with total student count
const getClasses = async (req, res) => {
  try {
    // Fetch all classes with relevant fields and populate students
    const classes = await Class.find()
      .select('level program acronym students')
      .populate('students', 'name email') // Adjust fields as needed
      .lean();

    if (classes.length === 0) {
      return res.status(404).json({ message: 'No classes found' });
    }

    // Add totalstudents field for each class with detailed student info
    const classesWithCounts = classes.map(classItem => ({
      ...classItem,
      totalstudents: classItem.students ? classItem.students.length : 0,
      studentDetails: classItem.students || [],
    }));

    res.status(200).json(classesWithCounts);
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ message: 'Error fetching classes', error: error.message });
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
    
    // Fetch the selected classes with populated students
    const selectedClasses = await Class.find({ level: { $in: classes } })
      .populate('students', 'name email')
      .lean();
    
    if (selectedClasses.length === 0) {
      return res.status(404).json({ message: 'No matching classes found' });
    }
    
    // Calculate total student count and collect student details
    const totalStudents = selectedClasses.reduce(
      (sum, classDoc) => sum + (classDoc.students?.length || 0),
      0
    );

    // Collect detailed information
    const classDetails = selectedClasses.map(classDoc => ({
      level: classDoc.level,
      studentCount: classDoc.students?.length || 0,
      students: classDoc.students || []
    }));
    
    res.status(200).json({ 
      totalStudents,
      classDetails,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error fetching student count:', error);
    res.status(500).json({ message: 'Error fetching student count', error: error.message });
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
    const classDetails = await Class.find({ level: { $in: classes } })
      .populate('students', 'name email')
      .lean();
    
    if (classDetails.length === 0) {
      return res.status(404).json({ message: 'No matching classes found' });
    }
    
    // Collect all students from the specified classes with additional details
    const allStudents = classDetails.flatMap(classDoc => 
      classDoc.students.map(student => ({
        name: student.name,
        email: student.email,
        class: classDoc.level,
        program: classDoc.program,
        dateAdded: student.createdAt
      }))
    );
    
    res.status(200).json({
      students: allStudents,
      totalCount: allStudents.length,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Error fetching students', error: error.message });
  }
};

// Fetch class details (including students) based on level
const getClassDetails = async (req, res) => {
  try {
    const { level } = req.params;
    
    // Fetch class details including populated students based on level
    const classDetails = await Class.findOne({ level })
      .populate('students', 'name email createdAt')
      .lean();
    
    if (!classDetails) {
      return res.status(404).json({ message: 'Class not found' });
    }
    
    // Add computed fields
    const enrichedClassDetails = {
      ...classDetails,
      totalStudents: classDetails.students?.length || 0,
      lastUpdated: new Date(),
      studentsSummary: {
        total: classDetails.students?.length || 0,
        active: classDetails.students?.filter(s => s.status !== 'inactive')?.length || 0
      }
    };
    
    res.status(200).json(enrichedClassDetails);
  } catch (error) {
    console.error('Error fetching class details:', error);
    res.status(500).json({ message: 'Error fetching class details', error: error.message });
  }
};

// Update class details
const updateClassDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedClass = await Class.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).populate('students', 'name email');

    if (!updatedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.status(200).json({
      message: 'Class updated successfully',
      class: updatedClass,
      studentCount: updatedClass.students?.length || 0
    });
  } catch (error) {
    console.error('Error updating class:', error);
    res.status(500).json({ message: 'Error updating class', error: error.message });
  }
};

module.exports = { 
  getClasses, 
  getStudentCount, 
  getClassDetails, 
  getStudentsFromClasses,
  updateClassDetails
};