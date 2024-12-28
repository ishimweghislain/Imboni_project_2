const Notes = require('../models/notes');
const fs = require('fs');
const path = require('path');

exports.createNotes = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }

    if (!req.body.courseName || !req.body.unitCount || !req.body.units) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    let unitsData;
    try {
      unitsData = JSON.parse(req.body.units);
    } catch (error) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        message: 'Invalid units data format'
      });
    }

    const newNotes = new Notes({
      teacherId: req.user._id,
      teacherEmail: req.user.email,
      teacherName: req.user.name,
      courseName: req.body.courseName,
      unitCount: parseInt(req.body.unitCount),
      units: unitsData.map((content, index) => ({
        unitNumber: index + 1,
        subContent: content,
      })),
      filePath: req.file.path
    });

    const savedNotes = await newNotes.save();
    
    res.status(201).json({
      success: true,
      message: 'Notes created successfully',
      data: savedNotes
    });
  } catch (error) {
    console.error('Error in createNotes:', error);
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({
      success: false,
      message: 'Failed to create notes',
      error: error.message
    });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Notes.find();
    res.status(200).json({
      success: true,
      data: notes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notes',
      error: error.message
    });
  }
};

exports.updateNotes = async (req, res) => {
  try {
    const noteId = req.params.id;
    const existingNote = await Notes.findById(noteId);
    
    if (!existingNote) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(404).json({
        success: false,
        message: 'Notes not found'
      });
    }

    let updateData = { ...req.body };

    if (req.file) {
      if (existingNote.filePath && fs.existsSync(existingNote.filePath)) {
        fs.unlinkSync(existingNote.filePath);
      }
      updateData.filePath = req.file.path;
    }

    if (req.body.units) {
      try {
        const unitsData = JSON.parse(req.body.units);
        updateData.units = unitsData.map((content, index) => ({
          unitNumber: index + 1,
          subContent: content,
        }));
      } catch (error) {
        if (req.file) fs.unlinkSync(req.file.path);
        return res.status(400).json({
          success: false,
          message: 'Invalid units data format'
        });
      }
    }

    const updatedNotes = await Notes.findByIdAndUpdate(
      noteId,
      updateData,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Notes updated successfully',
      data: updatedNotes
    });
  } catch (error) {
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({
      success: false,
      message: 'Failed to update notes',
      error: error.message
    });
  }
};

exports.deleteNotes = async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Notes not found'
      });
    }

    if (note.filePath && fs.existsSync(note.filePath)) {
      fs.unlinkSync(note.filePath);
    }

    await Notes.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Notes deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete notes',
      error: error.message
    });
  }
};

exports.getNotesByTeacher = async (req, res) => {
  try {
    const notes = await Notes.find({ teacherId: req.params.teacherId });
    res.status(200).json({
      success: true,
      data: notes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notes',
      error: error.message
    });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Notes not found'
      });
    }
    res.status(200).json({
      success: true,
      data: note
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch note',
      error: error.message
    });
  }
};