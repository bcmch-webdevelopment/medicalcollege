const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  uhid: { type: String },
  phone: { type: String, required: true },
  email: { type: String },
  doctorName: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  message: { type: String },
  department: { type: String, default: "Cardiology" },
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);