const Notes = require('../models/notes');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

exports.createNotes = async (req, res) => {
  try {
    const { teacherName, courseName, unitCount, units } = req.body;
    
    // Validate file upload
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        message: 'File upload is required.' 
      });
    }

    // Parse units array if it's a string
    let parsedUnits;
    try {
      parsedUnits = typeof units === 'string' ? JSON.parse(units) : units;
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid units data format'
      });
    }

    // Create new notes document
    const notes = new Notes({
      teacherId: req.user._id, // Assuming you have user info from auth middleware
      teacherEmail: req.user.email,
      teacherName,
      courseName,
      unitCount: parseInt(unitCount),
      units: parsedUnits,
      filePath: req.file.path
    });

    // Save to database
    const savedNotes = await notes.save();
    
    res.status(201).json({ 
      success: true,
      message: 'Notes created successfully.',
      notes: savedNotes
    });
  } catch (error) {
    console.error('Error creating notes:', error);
    
    // Clean up uploaded file if there's an error
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting file:', unlinkError);
      }
    }
    
    res.status(500).json({ 
      success: false,
      message: 'Error creating notes',
      error: error.message 
    });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Notes.find()
      .sort({ createdAt: -1 }); // Get newest first
    
    res.status(200).json({
      success: true,
      notes
    });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching notes',
      error: error.message 
    });
  }
};

exports.getNotesByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const notes = await Notes.find({ teacherId })
      .sort({ createdAt: -1 });

    if (!notes || notes.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No notes found for this teacher.'
      });
    }

    res.status(200).json({
      success: true,
      notes
    });
  } catch (error) {
    console.error('Error fetching teacher notes:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching teacher notes',
      error: error.message 
    });
  }
};

exports.downloadNotesFile = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Notes.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Notes not found.'
      });
    }

    const filePath = note.filePath;
    
    // Check if original file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'File not found.'
      });
    }

    const zipPath = `${filePath}.zip`;
    const archive = archiver('zip', { zlib: { level: 9 } });
    const output = fs.createWriteStream(zipPath);

    // Handle streaming completion
    output.on('close', () => {
      res.download(zipPath, `${note.courseName}-notes.zip`, err => {
        if (err) {
          console.error('Error downloading zip:', err);
        }
        // Clean up zip file after download
        try {
          fs.unlinkSync(zipPath);
        } catch (unlinkError) {
          console.error('Error deleting zip file:', unlinkError);
        }
      });
    });

    // Handle archiver errors
    archive.on('error', err => {
      fs.unlinkSync(zipPath); // Clean up on error
      res.status(500).json({
        success: false,
        message: 'Error creating zip file',
        error: err.message
      });
    });

    archive.pipe(output);
    archive.file(filePath, { name: path.basename(filePath) });
    archive.finalize();

  } catch (error) {
    console.error('Error downloading notes file:', error);
    res.status(500).json({
      success: false,
      message: 'Error downloading notes file',
      error: error.message
    });
  }
};