const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const appointmentRoutes = require("./routes/appointmentRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const departmentRoutes = require("./routes/departmentRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());




// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit if DB connection fails
  });

// Routes
app.use("/api/appointments", appointmentRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/uploads", express.static("uploads"));

// Health check / test route
app.get("/", (req, res) => {
  res.send(" Hospital Server Running");
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));