const mongoose = require('mongoose');

const AcademicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
  },
  sublists: [
    {
      heading: { type: String },
      text: { type: String }
    }
  ],
  images: [{
    type: String
  }],
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Academic', AcademicSchema);
