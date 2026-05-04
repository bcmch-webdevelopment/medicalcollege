const mongoose = require('mongoose');

const NewsEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  content: {
    type: String, // Rich text HTML
    required: true,
  },
  category: {
    type: String,
    enum: ['News', 'Event'],
    required: true,
  },
  featuredImage: {
    type: String, // URL/Path to image
  },
  galleryImages: {
    type: [String],
    default: []
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published'
  }
}, { timestamps: true });

module.exports = mongoose.model('NewsEvent', NewsEventSchema);
