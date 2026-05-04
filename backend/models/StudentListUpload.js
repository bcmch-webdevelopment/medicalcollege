const mongoose = require('mongoose');

const StudentListUploadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  academicYear: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  originalFileName: {
    type: String,
  },
  fileType: {
    type: String,
  },
  fileSize: {
    type: Number,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, { timestamps: true });

module.exports = mongoose.model('StudentListUpload', StudentListUploadSchema);
