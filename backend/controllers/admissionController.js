const Admission = require('../models/Admission');

// @desc    Get all admissions
// @route   GET /api/admissions
// @access  Public
const getAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find().sort({ order: 1 });
    res.status(200).json(admissions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admissions', error: error.message });
  }
};

// @desc    Get admission by slug
// @route   GET /api/admissions/:slug
// @access  Public
const getAdmissionBySlug = async (req, res) => {
  try {
    const admission = await Admission.findOne({ slug: req.params.slug });
    if (!admission) {
      return res.status(404).json({ message: 'Admission not found' });
    }
    res.status(200).json(admission);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admission', error: error.message });
  }
};

// @desc    Create an admission
// @route   POST /api/admissions
// @access  Private (Admin)
const createAdmission = async (req, res) => {
  try {
    const { title, slug, shortDescription, overview, eligibility, process, order, studentLists } = req.body;
    
    const slugExists = await Admission.findOne({ slug });
    if (slugExists) {
      return res.status(400).json({ message: 'Slug already exists' });
    }

    const newAdmission = new Admission({
      title,
      slug,
      shortDescription,
      overview,
      eligibility,
      process,
      order: order || 0,
      studentLists: studentLists || []
    });

    const savedAdmission = await newAdmission.save();
    res.status(201).json(savedAdmission);
  } catch (error) {
    res.status(500).json({ message: 'Error creating admission', error: error.message });
  }
};

// @desc    Update an admission
// @route   PUT /api/admissions/:id
// @access  Private (Admin)
const updateAdmission = async (req, res) => {
  try {
    const { title, slug, shortDescription, overview, eligibility, process, order, studentLists } = req.body;

    const slugExists = await Admission.findOne({ slug, _id: { $ne: req.params.id } });
    if (slugExists) {
       return res.status(400).json({ message: 'Slug already exists' });
    }

    const updatedAdmission = await Admission.findByIdAndUpdate(
      req.params.id,
      { title, slug, shortDescription, overview, eligibility, process, order, studentLists },
      { new: true }
    );

    if (!updatedAdmission) {
      return res.status(404).json({ message: 'Admission not found' });
    }

    res.status(200).json(updatedAdmission);
  } catch (error) {
    res.status(500).json({ message: 'Error updating admission', error: error.message });
  }
};

// @desc    Delete an admission
// @route   DELETE /api/admissions/:id
// @access  Private (Admin)
const deleteAdmission = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);

    if (!admission) {
      return res.status(404).json({ message: 'Admission not found' });
    }

    await Admission.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Admission deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting admission', error: error.message });
  }
};

// @desc    Add a student list to an admission
// @route   POST /api/admissions/student-list
// @access  Private (Admin)
const addStudentList = async (req, res) => {
  try {
    const { admissionId, category, year, title, fileUrl, students } = req.body;
    const admission = await Admission.findById(admissionId);
    if (!admission) return res.status(404).json({ message: 'Admission not found' });

    admission.studentLists.push({ category, year, title, fileUrl, students });
    await admission.save();
    res.status(201).json(admission);
  } catch (error) {
    res.status(500).json({ message: 'Error adding student list', error: error.message });
  }
};

// @desc    Get student lists by category or year
// @route   GET /api/admissions/student-list
// @access  Public
const getStudentLists = async (req, res) => {
  try {
    const { category, year } = req.query;
    const matchCond = {};
    if (category) matchCond['studentLists.category'] = category;
    if (year) matchCond['studentLists.year'] = year;

    const admissions = await Admission.find({ 'studentLists': { $elemMatch: matchCond } });
    
    // Extract only matching lists
    let matchingLists = [];
    admissions.forEach(adm => {
      adm.studentLists.forEach(list => {
        let match = true;
        if (category && list.category !== category) match = false;
        if (year && list.year !== year) match = false;
        if (match) {
          matchingLists.push({ ...list.toObject(), admissionId: adm._id, admissionTitle: adm.title });
        }
      });
    });

    res.status(200).json(matchingLists);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student lists', error: error.message });
  }
};

// @desc    Get student lists by year
// @route   GET /api/admissions/student-list/:year
// @access  Public
const getStudentListsByYear = async (req, res) => {
  try {
    const year = req.params.year;
    const admissions = await Admission.find({ 'studentLists.year': year });
    
    let matchingLists = [];
    admissions.forEach(adm => {
      adm.studentLists.forEach(list => {
        if (list.year === year) {
          matchingLists.push({ ...list.toObject(), admissionId: adm._id, admissionTitle: adm.title });
        }
      });
    });

    res.status(200).json(matchingLists);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student lists by year', error: error.message });
  }
};

// @desc    Update a student list
// @route   PUT /api/admissions/student-list/:id
// @access  Private (Admin)
const updateStudentList = async (req, res) => {
  try {
    const listId = req.params.id;
    const updateData = req.body;
    
    // Create the $set object dynamically based on what was sent
    const setObj = {};
    for (const key in updateData) {
      setObj[`studentLists.$.${key}`] = updateData[key];
    }

    const updatedAdmission = await Admission.findOneAndUpdate(
      { 'studentLists._id': listId },
      { $set: setObj },
      { new: true }
    );

    if (!updatedAdmission) {
      return res.status(404).json({ message: 'Student list not found' });
    }

    res.status(200).json(updatedAdmission);
  } catch (error) {
    res.status(500).json({ message: 'Error updating student list', error: error.message });
  }
};

// @desc    Delete a student list
// @route   DELETE /api/admissions/student-list/:id
// @access  Private (Admin)
const deleteStudentList = async (req, res) => {
  try {
    const listId = req.params.id;
    
    const updatedAdmission = await Admission.findOneAndUpdate(
      { 'studentLists._id': listId },
      { $pull: { studentLists: { _id: listId } } },
      { new: true }
    );

    if (!updatedAdmission) {
      return res.status(404).json({ message: 'Student list not found' });
    }

    res.status(200).json({ message: 'Student list deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student list', error: error.message });
  }
};

module.exports = {
  getAdmissions,
  getAdmissionBySlug,
  createAdmission,
  updateAdmission,
  deleteAdmission,
  addStudentList,
  getStudentLists,
  getStudentListsByYear,
  updateStudentList,
  deleteStudentList
};
