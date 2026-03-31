const Facility = require('../models/Facility');

// @desc    Get all facilities
// @route   GET /api/facilities
// @access  Public
exports.getFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find();
    res.json(facilities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a facility
// @route   POST /api/facilities
// @access  Private/Admin
exports.createFacility = async (req, res) => {
  const { title, description, imageUrl, icon } = req.body;
  try {
    const facility = new Facility({ title, description, imageUrl, icon });
    const createdFacility = await facility.save();
    res.status(201).json(createdFacility);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a facility
// @route   PUT /api/facilities/:id
// @access  Private/Admin
exports.updateFacility = async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }

    facility.title = req.body.title || facility.title;
    facility.description = req.body.description || facility.description;
    facility.imageUrl = req.body.imageUrl || facility.imageUrl;
    facility.icon = req.body.icon || facility.icon;

    const updatedFacility = await facility.save();
    res.json(updatedFacility);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a facility
// @route   DELETE /api/facilities/:id
// @access  Private/Admin
exports.deleteFacility = async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    
    await facility.deleteOne();
    res.json({ message: 'Facility removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
