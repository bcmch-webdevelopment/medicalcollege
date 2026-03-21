import React, { useEffect, useState } from "react";
import axios from "axios";
import BookAppointment from "./BookAppointment";

const Cardiology = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);

  // Fetch all cardiology doctors (basic info)
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/doctors/cardiology");
        if (response.data.success) {
          setDoctors(response.data.data);
        } else {
          setError("Failed to fetch doctors");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Fetch single doctor by ID for the modal
  const viewProfile = async (id) => {
    try {
      setProfileLoading(true);
      const response = await axios.get(`http://localhost:5000/api/doctors/${id}`);
      if (response.data.success) {
        setSelectedDoctor(response.data.data);
      } else {
        alert("Failed to fetch doctor profile");
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setProfileLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-5">Loading doctors...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <div className="container my-5">
      <h1 className="display-4 text-center mb-4">Cardiology Department</h1>
      <p className="text-center mb-5">
        Providing advanced heart care with expert cardiologists and state-of-the-art technology.
      </p>

      <h2 className="mt-5 mb-4">Our Cardiologists</h2>
      <div className="row g-4">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="col-md-6">
            <div className="card shadow-sm p-3 d-flex flex-row align-items-center">
              <img
                src={doctor.image || "https://via.placeholder.com/120"}
                alt={doctor.name}
                className="img-fluid me-3"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "12px",
                  objectFit: "contain",
                  backgroundColor: "#f0f0f0",
                }}
              />
              <div className="flex-grow-1">
                <h5>{doctor.name}</h5>
                <p className="text-muted">{doctor.specialty}</p>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-dark btn-sm"
                    onClick={() => viewProfile(doctor._id)}
                  >
                    {profileLoading ? "Loading..." : "View Profile"}
                  </button>
                  <BookAppointment doctor={doctor} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for selected doctor */}
      {selectedDoctor && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content p-3">
              <button
                className="btn-close position-absolute top-0 end-0 m-3"
                onClick={() => setSelectedDoctor(null)}
              ></button>
              <div className="modal-body d-flex flex-column flex-md-row gap-4 mt-4">
                <img
                  src={selectedDoctor.image || "https://via.placeholder.com/250"}
                  alt={selectedDoctor.name}
                  className="img-fluid rounded"
                  style={{ width: "250px", height: "250px", objectFit: "contain" }}
                />
                <div>
                  <h4>{selectedDoctor.name}</h4>
                  <p className="text-muted">{selectedDoctor.specialty}</p>
                  <p>{selectedDoctor.bio}</p>
                  {selectedDoctor.experience && (
                    <p><strong>Experience:</strong> {selectedDoctor.experience} years</p>
                  )}
                  <BookAppointment doctor={selectedDoctor} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cardiology;