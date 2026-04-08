const Academic = require('../models/Academic');

exports.getAllAcademics = async (req, res) => {
  try {
    const academics = await Academic.find().sort({ order: 1 });
    res.status(200).json(academics);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAcademicBySlug = async (req, res) => {
  try {
    const academic = await Academic.findOne({ slug: req.params.slug });
    if (!academic) return res.status(404).json({ message: 'Academic section not found' });
    res.status(200).json(academic);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createAcademic = async (req, res) => {
  try {
    let { title, slug, content, sublists, order } = req.body;
    
    if (typeof sublists === 'string') {
      try {
        sublists = JSON.parse(sublists);
      } catch (e) {
        sublists = [];
      }
    }

    const existing = await Academic.findOne({ slug });
    if (existing) {
      return res.status(400).json({ message: 'Section with this slug already exists' });
    }

    const newAcademic = new Academic({
      title,
      slug,
      content,
      sublists,
      order
    });

    const savedAcademic = await newAcademic.save();
    res.status(201).json(savedAcademic);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create section', error: err.message });
  }
};

exports.updateAcademic = async (req, res) => {
  try {
    let { title, slug, content, sublists, order } = req.body;
    
    if (typeof sublists === 'string') {
      try {
        sublists = JSON.parse(sublists);
      } catch (e) {
        sublists = [];
      }
    }

    const updateData = { title, slug, content, sublists, order };

    const updatedAcademic = await Academic.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedAcademic) {
      return res.status(404).json({ message: 'Academic section not found' });
    }

    res.status(200).json(updatedAcademic);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update section', error: err.message });
  }
};

exports.deleteAcademic = async (req, res) => {
  try {
    const academic = await Academic.findById(req.params.id);
    if (!academic) return res.status(404).json({ message: 'Academic section not found' });

    await academic.deleteOne();
    res.status(200).json({ message: 'Academic section removed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete section', error: err.message });
  }
};
