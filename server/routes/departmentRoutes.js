const express = require("express");
const router = express.Router();
const Department = require("../models/Department");

// ✅ Seed default departments (runs only if DB is empty)
const seedDepartments = async () => {
  try {
    const count = await Department.countDocuments();

    if (count === 0) {
      await Department.insertMany([
        {
          name: "Emergency",
          description:
            "Provides immediate medical care for life-threatening conditions, accidents, and critical illnesses, available 24/7."
        },
        {
          name: "General Medicine",
          description:
            "Focuses on the diagnosis, treatment, and prevention of a wide range of adult diseases and health conditions."
        },
        {
          name: "General Surgery",
          description:
            "Performs surgical procedures for various conditions including abdominal issues, injuries, and soft tissue disorders."
        },
        {
          name: "Obstetrics & Gynaecology",
          description:
            "Provides comprehensive care for women's health, including pregnancy, childbirth, and reproductive system treatments."
        },
        {
          name: "Pediatrics",
          description:
            "Offers specialized medical care for infants, children, and adolescents, ensuring healthy growth and development."
        },
        {
          name: "Cardiology",
          description:
            "Deals with the diagnosis and treatment of heart diseases and cardiovascular conditions."
        },
        {
          name: "Radiology",
          description:
            "Uses advanced imaging techniques like X-rays, CT scans, and MRIs to diagnose and monitor diseases."
        }
      ]);

      console.log("✅ Default departments inserted successfully");
    }
  } catch (error) {
    console.error("❌ Error seeding departments:", error.message);
  }
};

// 👉 Call seed function
seedDepartments();


// ✅ GET all departments
router.get("/", async (req, res) => {
  try {
    const departments = await Department.find().sort({ name: 1 });

    res.json({
      success: true,
      count: departments.length,
      data: departments
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});


// ✅ GET single department by ID
router.get("/:id", async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found"
      });
    }

    res.json({
      success: true,
      data: department
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});


module.exports = router;