const Appointment = require("../models/Appointment");


// Create Appointment

exports.createAppointment = async (req, res) => {
  try {

    const appointment = new Appointment(req.body);

    const savedAppointment = await appointment.save();

    res.status(201).json({
      success: true,
      data: savedAppointment,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// Get All Appointments

exports.getAppointments = async (req, res) => {
  try {

    const appointments = await Appointment.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: appointments,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};