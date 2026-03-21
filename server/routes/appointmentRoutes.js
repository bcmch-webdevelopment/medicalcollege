const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// POST /api/appointments
router.post("/", async (req, res) => {
  try {
    const {
      patientName,
      uhid,
      phone,
      email,
      doctorName,
      appointmentDate,
      message,
      department
    } = req.body;

    // Basic validation
    if (!patientName || !phone || !doctorName || !appointmentDate) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const newAppointment = new Appointment({
      patientName,
      uhid,
      phone,
      email,
      doctorName,
      appointmentDate,
      message,
      department: department || "Cardiology",
    });

    await newAppointment.save();

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: newAppointment,
    });

  } catch (error) {
    console.error("Error saving appointment:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;