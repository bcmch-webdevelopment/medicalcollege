import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookAppointment from "./BookAppointment";

const DepartmentPage = () => {
  const { id } = useParams();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ NEW STATE for popup
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/doctors/department/${id}`
        );

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
  }, [id]);

  if (loading) return <p className="text-center">Loading doctors...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Doctors</h2>

      <div className="row">
        {doctors.length === 0 ? (
          <p className="text-center">No doctors found in this department</p>
        ) : (
          doctors.map((doctor) => (
            <div key={doctor._id} className="col-md-6 mb-4">
              <div className="card shadow-sm p-3 d-flex flex-row align-items-center">

                {/* Image */}
                <img
                  src={
                    doctor.image
                      ? `http://localhost:5000/uploads/${doctor.image}`
                      : "https://via.placeholder.com/120"
                  }
                  alt={doctor.name}
                  className="img-fluid me-3"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "12px",
                    objectFit: "contain",  
                    backgroundColor: "#f8f9fa",
                    padding: "5px"
                  }}
                />

                <div>
                  <h5>{doctor.name}</h5>
                  <p className="text-muted">{doctor.designation}</p>
                  {/* <p>{doctor.experience} years experience</p> */}

                  {/* ✅ View Profile Button */}
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    View Profile
                  </button>

                  {/* Book Appointment */}
                  <BookAppointment doctor={doctor} />
                </div>

              </div>
            </div>
          ))
        )}
      </div>

      {/* ✅ POPUP MODAL */}
      {selectedDoctor && (
        <div
          className="modal show fade"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3">

              {/* Close Button */}
              <div className="text-end">
                <button
                  className="btn-close"
                  onClick={() => setSelectedDoctor(null)}
                ></button>
              </div>

              {/* Doctor Details */}
              <div className="text-center">
                <img
                  src={
                    selectedDoctor.image
                      ? `http://localhost:5000/uploads/${selectedDoctor.image}`
                      : "https://via.placeholder.com/150"
                  }
                  alt={selectedDoctor.name}
                 style={{
                      width: "180px",
                      height: "220px",              // ✅ oval shape
                      borderRadius: "50% / 60%",    // ✅ oval (ellipse)
                      objectFit: "cover",           // ✅ keeps shape
                      objectPosition: "top",        // ✅ IMPORTANT (prevents head cut)
                      backgroundColor: "#f8f9fa",
                      border: "3px solid #e9ecef",
                      marginBottom: "15px"
                }}
                />

                <h4>{selectedDoctor.name}</h4>
                <p className="text-muted">{selectedDoctor.designation}</p>

                {/* <p><strong>Experience:</strong> {selectedDoctor.experience} years</p> */}

                <p>
                  {/* <strong>Bio:</strong><br /> */}
                  {selectedDoctor.bio || "No description available"}
                </p>

                {/* Book Appointment inside popup */}
                <BookAppointment doctor={selectedDoctor} />
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentPage;