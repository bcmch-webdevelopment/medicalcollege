const Department = require('../models/Department');
const fs = require('fs');
const path = require('path');

exports.getAllDepartments = async (req, res) => {
  try {
    const { mainCategory, isActive, search, page, limit } = req.query;
    const filter = {};
    
    if (mainCategory) filter.mainCategory = mainCategory;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 100; // default large limit if not specified
    const skip = (pageNumber - 1) * pageSize;

    const total = await Department.countDocuments(filter);
    const departments = await Department.find(filter)
      .sort({ order: 1 })
      .skip(skip)
      .limit(pageSize);

    res.status(200).json({
      departments,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize)
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getDepartmentBySlug = async (req, res) => {
  try {
    const department = await Department.findOne({ slug: req.params.slug, isActive: true });
    if (!department) return res.status(404).json({ message: 'Department not found or inactive' });
    res.status(200).json(department);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getDepartmentByIdAdmin = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).json({ message: 'Department not found' });
    res.status(200).json(department);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createDepartment = async (req, res) => {
  try {
    let { name, mainCategory, slug, description, tagline, introduction, faculty, activities, order, isActive } = req.body;
    
    if (typeof faculty === 'string') {
      try { faculty = JSON.parse(faculty); } catch (e) { faculty = []; }
    }
    if (typeof activities === 'string') {
      try { activities = JSON.parse(activities); } catch (e) { activities = []; }
    }

    const existing = await Department.findOne({ slug });
    if (existing) {
      if (req.file) fs.unlinkSync(req.file.path); // remove uploaded file
      return res.status(400).json({ message: 'Department with this slug already exists' });
    }

    const newDepartment = new Department({
      name,
      mainCategory,
      slug,
      description,
      tagline,
      introduction,
      faculty,
      activities,
      order: order ? parseInt(order) : 0,
      isActive: isActive === 'true' || isActive === true,
      image: req.file ? req.file.filename : ''
    });

    const savedDepartment = await newDepartment.save();
    res.status(201).json(savedDepartment);
  } catch (err) {
    if (req.file) fs.unlinkSync(req.file.path); // remove uploaded file on error
    res.status(500).json({ message: 'Failed to create department', error: err.message });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    let { name, mainCategory, slug, description, tagline, introduction, faculty, activities, order, isActive } = req.body;
    
    if (typeof faculty === 'string') {
      try { faculty = JSON.parse(faculty); } catch (e) { faculty = []; }
    }
    if (typeof activities === 'string') {
      try { activities = JSON.parse(activities); } catch (e) { activities = []; }
    }

    const department = await Department.findById(req.params.id);
    if (!department) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: 'Department not found' });
    }

    const updateData = { 
      name, mainCategory, slug, description, tagline, introduction, faculty, activities, 
      order: order ? parseInt(order) : 0,
      isActive: isActive === 'true' || isActive === true 
    };

    if (req.file) {
      updateData.image = req.file.filename;
      // remove old image
      if (department.image) {
        const oldPath = path.join(__dirname, '../uploads/departments', department.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    }

    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedDepartment);
  } catch (err) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ message: 'Failed to update department', error: err.message });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).json({ message: 'Department not found' });

    if (department.image) {
      const imgPath = path.join(__dirname, '../uploads/departments', department.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await department.deleteOne();
    res.status(200).json({ message: 'Department removed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete department', error: err.message });
  }
};
