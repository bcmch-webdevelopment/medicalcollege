import React, { useState } from "react";

const BookAppointment = ({ doctor }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    uhid: "",
    phone: "",
    email: "",
    date: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorName: doctor?.name,
          patientName: formData.name,
          uhid: formData.uhid,
          phone: formData.phone,
          email: formData.email,
          appointmentDate: formData.date,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Appointment booked successfully!");
        setFormData({ name: "", uhid: "", phone: "", email: "", date: "", message: "" });
        setShowModal(false);
      } else {
        alert(data.message || "Booking failed");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Server error while booking appointment");
    }
  };

  return (
    <>
      <button className="btn btn-secondary btn-sm" onClick={() => setShowModal(true)}>
        Book Appointment
      </button>

      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3">
              <button className="btn-close ms-auto" onClick={() => setShowModal(false)}></button>
              <h4 className="mb-2">Book Appointment</h4>
              <p className="text-muted">{doctor?.name}</p>
              <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Patient Name" className="form-control mb-2" value={formData.name} onChange={handleChange} required />
                <input type="text" name="uhid" placeholder="UHID" className="form-control mb-2" value={formData.uhid} onChange={handleChange} />
                <input type="tel" name="phone" placeholder="Phone Number" className="form-control mb-2" value={formData.phone} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" className="form-control mb-2" value={formData.email} onChange={handleChange} />
                <input type="date" name="date" className="form-control mb-2" value={formData.date} onChange={handleChange} required />
                <textarea name="message" placeholder="Message" className="form-control mb-3" value={formData.message} onChange={handleChange} />
                <button type="submit" className="btn btn-primary w-100">Submit Appointment</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookAppointment;