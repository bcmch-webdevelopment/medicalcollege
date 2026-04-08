const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  section: {
    type: String,
    enum: ['about-us', 'academics', 'facilities'],
    required: true,
  },
  heading: {
    type: String,
  },
  content: {
    type: String,
  },
  imagePosition: {
    type: String,
    enum: ['left', 'right', 'top'],
    default: 'left'
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Page',
    default: null
  },
  order: {
    type: Number,
    default: 0
  },
  image: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Page', PageSchema);
