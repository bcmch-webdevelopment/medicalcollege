const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true
  },
    bio: {
    type: String   // ✅ ADD THIS
  },
  image: {
    type: String // file path
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Doctor", doctorSchema);