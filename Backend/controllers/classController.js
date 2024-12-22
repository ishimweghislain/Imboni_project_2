const Class = require('../models/class');

const getClasses = async (req, res) => {
  try {
    const classes = await Class.find()
      .select('level program acronym students')
      .populate('students', 'name email')
      .lean();

    if (classes.length === 0) {
      return res.status(404).json({ message: 'No classes found' });
    }

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

const getStudentCount = async (req, res) => {
  try {
    const { classes } = req.body;
    
    if (!Array.isArray(classes) || classes.length === 0) {
      return res.status(400).json({ message: 'Invalid input: Please provide a list of classes' });
    }

    // Create exact match criteria for each class
    const classQueries = classes.map(cls => ({
      level: cls.level,
      program: cls.program,
      acronym: cls.acronym
    }));
    
    const selectedClasses = await Class.find({ 
      $or: classQueries
    }).lean();
    
    if (selectedClasses.length === 0) {
      return res.status(404).json({ message: 'No matching classes found' });
    }
    
    const totalStudents = selectedClasses.reduce(
      (sum, classDoc) => sum + (classDoc.students?.length || 0),
      0
    );

    const classDetails = selectedClasses.map(classDoc => ({
      level: classDoc.level,
      program: classDoc.program,
      acronym: classDoc.acronym,
      studentCount: classDoc.students?.length || 0
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

const getStudentsFromClasses = async (req, res) => {
  try {
    const { classes } = req.body;

    if (!Array.isArray(classes) || classes.length === 0) {
      return res.status(400).json({ message: 'Invalid input: Please provide a list of classes' });
    }

    // Create exact match criteria for each class
    const classQueries = classes.map(cls => ({
      level: cls.level,
      program: cls.program,
      acronym: cls.acronym
    }));
    
    const classDetails = await Class.find({ $or: classQueries })
      .populate('students', 'name email')
      .lean();
    
    if (classDetails.length === 0) {
      return res.status(404).json({ message: 'No matching classes found' });
    }
    
    const allStudents = classDetails.flatMap(classDoc => 
      classDoc.students.map(student => ({
        name: student.name,
        email: student.email,
        class: classDoc.level,
        program: classDoc.program,
        acronym: classDoc.acronym,
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

const getClassDetails = async (req, res) => {
  try {
    const { level, program, acronym } = req.params;
    
    const classDetails = await Class.findOne({ level, program, acronym })
      .populate('students', 'name email createdAt')
      .lean();
    
    if (!classDetails) {
      return res.status(404).json({ message: 'Class not found' });
    }
    
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