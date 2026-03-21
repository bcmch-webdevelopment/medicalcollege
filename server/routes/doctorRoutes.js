// routes/doctorRoutes.js
const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");
const upload = require("../middleware/uploads");

// ----------------- ADD DOCTOR -----------------
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, designation, department, bio } = req.body;

    const newDoctor = new Doctor({
      name,
      designation,
      department,
      bio,
      image: req.file ? req.file.filename : null
    });

    await newDoctor.save();

    res.status(201).json({
      success: true,
      data: newDoctor
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ----------------- GET ALL DOCTORS -----------------
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("department", "name");

    res.json({
      success: true,
      data: doctors
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ----------------- GET DOCTORS BY DEPARTMENT -----------------
router.get("/department/:id", async (req, res) => {
  try {
    const doctors = await Doctor.find({ department: req.params.id }).populate("department", "name");

    res.json({ success: true, data: doctors });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ----------------- GET SINGLE DOCTOR -----------------
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate("department", "name");

    if (!doctor) return res.status(404).json({ success: false, message: "Doctor not found" });

    res.json({ success: true, data: doctor });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ----------------- UPDATE DOCTOR -----------------
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ success: false, message: "Doctor not found" });

    const { name, designation, department, bio } = req.body;

    doctor.name = name;
    doctor.designation = designation;
    doctor.department = department;
    doctor.bio = bio;

    if (req.file) doctor.image = req.file.filename;

    await doctor.save();

    // Populate department before sending response
    const updatedDoctor = await Doctor.findById(doctor._id).populate("department", "name");

    res.json({ success: true, data: updatedDoctor , message: 'Updated Successfully'});
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
// ----------------- DELETE DOCTOR -----------------
router.delete("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ success: false, message: "Doctor not found" });

    await doctor.deleteOne();

    res.json({ success: true, message: "Doctor deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;