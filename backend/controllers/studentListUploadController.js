const StudentListUpload = require('../models/StudentListUpload');
const fs = require('fs');

// @desc    Upload new student list
// @route   POST /api/student-list-uploads
// @access  Private (Admin)
const uploadStudentList = async (req, res) => {
  try {
    const { title, description, academicYear, department } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    const newUpload = new StudentListUpload({
      title,
      description,
      academicYear,
      department,
      fileUrl: `/uploads/student-lists/${req.file.filename}`,
      filePath: req.file.path,
      originalFileName: req.file.originalname,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      uploadedBy: req.user ? req.user._id : null
    });

    const savedUpload = await newUpload.save();
    res.status(201).json(savedUpload);
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Server error during upload', error: error.message });
  }
};

// @desc    Get all uploaded student lists
// @route   GET /api/student-list-uploads
// @access  Public (or Private depending on needs, Public for viewing usually)
const getStudentLists = async (req, res) => {
  try {
    const { year, department } = req.query;
    const matchCond = {};
    if (year) matchCond.academicYear = year;
    if (department) matchCond.department = department;

    const limit = parseInt(req.query.limit) || 50;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const studentLists = await StudentListUpload.find(matchCond)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
      
    const total = await StudentListUpload.countDocuments(matchCond);

    res.status(200).json({
      studentLists,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student lists', error: error.message });
  }
};

// @desc    Get single student list by ID
// @route   GET /api/student-list-uploads/:id
// @access  Public
const getStudentListById = async (req, res) => {
  try {
    const studentList = await StudentListUpload.findById(req.params.id);
    if (!studentList) {
      return res.status(404).json({ message: 'Student list not found' });
    }
    res.status(200).json(studentList);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student list', error: error.message });
  }
};

// @desc    Update a student list metadata
// @route   PUT /api/student-list-uploads/:id
// @access  Private (Admin)
const updateStudentList = async (req, res) => {
  try {
    const { title, description, academicYear, department } = req.body;
    const updateData = { title, description, academicYear, department };

    let studentList = await StudentListUpload.findById(req.params.id);
    if (!studentList) {
       // if they attached a new file but record not found, delete it
       if (req.file) fs.unlinkSync(req.file.path);
       return res.status(404).json({ message: 'Student list not found' });
    }

    if (req.file) {
      // User uploaded a new file, delete old file locally
      if (studentList.filePath && fs.existsSync(studentList.filePath)) {
        fs.unlinkSync(studentList.filePath);
      }
      updateData.fileUrl = `/uploads/student-lists/${req.file.filename}`;
      updateData.filePath = req.file.path;
      updateData.originalFileName = req.file.originalname;
      updateData.fileType = req.file.mimetype;
      updateData.fileSize = req.file.size;
    }

    const updatedUpload = await StudentListUpload.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json(updatedUpload);
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ message: 'Error updating student list', error: error.message });
  }
};

// @desc    Delete a student list
// @route   DELETE /api/student-list-uploads/:id
// @access  Private (Admin)
const deleteStudentList = async (req, res) => {
  try {
    const studentList = await StudentListUpload.findById(req.params.id);
    if (!studentList) {
      return res.status(404).json({ message: 'Student list not found' });
    }

    // Delete the file from the filesystem safely
    if (studentList.filePath && fs.existsSync(studentList.filePath)) {
      fs.unlinkSync(studentList.filePath);
    }

    await StudentListUpload.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Student list deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student list', error: error.message });
  }
};

module.exports = {
  uploadStudentList,
  getStudentLists,
  getStudentListById,
  updateStudentList,
  deleteStudentList
};
