const mongoose = require('mongoose');

const AdmissionSchema = new mongoose.Schema({
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
  overview: {
    type: String,
  },
  eligibility: {
    type: String,
  },
  process: {
    type: String,
  },
  order: {
    type: Number,
    default: 0
  },
  studentLists: [
    {
      category: {
        type: String,
        enum: ['UG', 'PG', 'SUPER_SPECIALITY'],
      },
      year: String,
      title: String,
      fileUrl: String,
      students: [
        {
          name: String,
          registerNo: String,
          course: String,
          specialty: String
        }
      ]
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Admission', AdmissionSchema);
