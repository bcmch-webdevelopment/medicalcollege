const AboutUs = require('../models/AboutUs');

// @desc    Get all About Us sections
// @route   GET /api/aboutus
// @access  Public
exports.getAllAboutUs = async (req, res) => {
  try {
    const aboutUsSections = await AboutUs.find().sort({ order: 1 });
    res.status(200).json(aboutUsSections);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Get single About Us section by slug
// @route   GET /api/aboutus/slug/:slug
// @access  Public
exports.getAboutUsBySlug = async (req, res) => {
  try {
    const aboutUs = await AboutUs.findOne({ slug: req.params.slug });
    if (!aboutUs) return res.status(404).json({ message: 'About Us section not found' });
    res.status(200).json(aboutUs);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Create new About Us section
// @route   POST /api/aboutus
// @access  Private
exports.createAboutUs = async (req, res) => {
  try {
    const { title, slug, content, sublists, order } = req.body;
    
    // Check if slug exists
    const existing = await AboutUs.findOne({ slug });
    if (existing) {
      return res.status(400).json({ message: 'Section with this slug already exists' });
    }

    const newAboutUs = new AboutUs({
      title,
      slug,
      content,
      sublists,
      order
    });

    const savedAboutUs = await newAboutUs.save();
    res.status(201).json(savedAboutUs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create section', error: err.message });
  }
};

// @desc    Update About Us section
// @route   PUT /api/aboutus/:id
// @access  Private
exports.updateAboutUs = async (req, res) => {
  try {
    const { title, slug, content, sublists, order } = req.body;
    
    const updatedAboutUs = await AboutUs.findByIdAndUpdate(
      req.params.id,
      { title, slug, content, sublists, order },
      { new: true, runValidators: true }
    );

    if (!updatedAboutUs) {
      return res.status(404).json({ message: 'About Us section not found' });
    }

    res.status(200).json(updatedAboutUs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update section', error: err.message });
  }
};

// @desc    Delete About Us section
// @route   DELETE /api/aboutus/:id
// @access  Private
exports.deleteAboutUs = async (req, res) => {
  try {
    const aboutUs = await AboutUs.findById(req.params.id);
    if (!aboutUs) return res.status(404).json({ message: 'About Us section not found' });

    await aboutUs.deleteOne();
    res.status(200).json({ message: 'About Us section removed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete section', error: err.message });
  }
};
