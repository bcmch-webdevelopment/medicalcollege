const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  icon: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Facility', facilitySchema);
