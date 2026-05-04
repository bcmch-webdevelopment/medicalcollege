const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  mainCategory: {
    type: String,
    enum: ['Pre-Clinical', 'Para-Clinical', 'Clinical'],
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  tagline: {
    type: String,
  },
  introduction: {
    type: String,
  },
  faculty: [
    {
      name: { type: String },
      role: { type: String },
      empId: { type: String },
      nmc: { type: String },
      qualification: { type: String },
      phone: { type: String },
      email: { type: String },
      image: { type: String },
    }
  ],
  activities: [
    {
      title: { type: String },
      description: { type: String }
    }
  ],
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Department', DepartmentSchema);
