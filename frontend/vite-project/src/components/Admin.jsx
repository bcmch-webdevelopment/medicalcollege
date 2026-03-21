// src/components/AdminPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPage = () => {
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  // ----------------- Add Doctor -----------------
  const [addDoctors, setAddDoctors] = useState([
    { name: "", designation: "", department: "", bio: "", image: null }
  ]);

  // ----------------- Edit Doctor -----------------
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [editDoctor, setEditDoctor] = useState({
    name: "",
    designation: "",
    department: "",
    bio: "",
   
    imageFile: null,
    imageUrl: null
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ----------------- Load Departments -----------------
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/departments");
        if (res.data.success) setDepartments(res.data.data);
      } catch (err) {
        console.error("Failed to load departments:", err.message);
      }
    };
    fetchDepartments();
  }, []);

  // ----------------- Load Doctors -----------------
  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/doctors");
      if (res.data.success) setDoctors(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // ----------------- Add Doctor Handlers -----------------
  const handleAddChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...addDoctors];
    updated[index][name] = value;
    setAddDoctors(updated);
  };

  const handleAddFile = (index, e) => {
    const updated = [...addDoctors];
    updated[index].image = e.target.files[0];
    setAddDoctors(updated);
  };

  const addForm = () => {
    setAddDoctors([...addDoctors, { name: "", designation: "", department: "", bio: "",  image: null }]);
  };

  const removeAddForm = (index) => {
    setAddDoctors(addDoctors.filter((_, i) => i !== index));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      for (const doc of addDoctors) {
        const data = new FormData();
        data.append("name", doc.name);
        data.append("designation", doc.designation);
        data.append("department", doc.department);
        data.append("bio", doc.bio);
        
        if (doc.image) data.append("image", doc.image);

        await axios.post("http://localhost:5000/api/doctors", data, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      setMessage("✅ Doctors added successfully!");
      setAddDoctors([{ name: "", designation: "", department: "", bio: "",image: null }]);
      fetchDoctors();
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ----------------- Edit Doctor Handlers -----------------
  const handleDoctorSelect = (e) => {
    const doctorId = e.target.value;
    setSelectedDoctorId(doctorId);
    const doctor = doctors.find((d) => d._id === doctorId);

    if (doctor) {
      setEditDoctor({
        name: doctor.name,
        designation: doctor.designation,
        department: doctor.department._id,
        bio: doctor.bio,
       
        imageFile: null,
        imageUrl: doctor.image ? `http://localhost:5000/uploads/${doctor.image}` : null
      });
    } else {
      setEditDoctor({ name: "", designation: "", department: "", bio: "",  imageFile: null, imageUrl: null });
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditFile = (e) => {
    setEditDoctor((prev) => ({ ...prev, imageFile: e.target.files[0] }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedDoctorId) return;
    setLoading(true);
    setMessage("");

    try {
      const data = new FormData();
      data.append("name", editDoctor.name);
      data.append("designation", editDoctor.designation);
      data.append("department", editDoctor.department);
      data.append("bio", editDoctor.bio);
      
      if (editDoctor.imageFile) data.append("image", editDoctor.imageFile);

      const res = await axios.put(`http://localhost:5000/api/doctors/${selectedDoctorId}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      const updatedDoctor = res.data.data;
      setEditDoctor({
        name: updatedDoctor.name,
        designation: updatedDoctor.designation,
        department: updatedDoctor.department._id,
        bio: updatedDoctor.bio,
        
        imageFile: null,
        imageUrl: updatedDoctor.image ? `http://localhost:5000/uploads/${updatedDoctor.image}` : null
      });

      setMessage("✅ Doctor updated successfully!");
      fetchDoctors();
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedDoctorId) return;
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/doctors/${selectedDoctorId}`);
      setMessage("✅ Doctor deleted successfully!");
      setSelectedDoctorId("");
      setEditDoctor({ name: "", designation: "", department: "", bio: "",  imageFile: null, imageUrl: null });
      fetchDoctors();
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    }
  };

  // ----------------- JSX -----------------
  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Manage Doctors</h2>
      {message && <p className="text-center">{message}</p>}

      {/* ---------------- Add Doctors ---------------- */}
      <h4>Add Doctors</h4>
      <form onSubmit={handleAddSubmit}>
        {addDoctors.map((doc, index) => (
          <div key={index} className="border p-3 mb-3 rounded shadow-sm">
            <h5>Doctor {index + 1}</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <label>Name</label>
                <input type="text" name="name" value={doc.name} onChange={(e) => handleAddChange(index, e)} className="form-control" required />
              </div>
              <div className="col-md-6">
                <label>Designation</label>
                <input type="text" name="designation" value={doc.designation} onChange={(e) => handleAddChange(index, e)} className="form-control" required />
              </div>
              <div className="col-md-6">
                <label>Department</label>
                <select name="department" value={doc.department} onChange={(e) => handleAddChange(index, e)} className="form-select" required>
                  <option value="">Select Department</option>
                  {departments.map((d) => <option key={d._id} value={d._id}>{d.name}</option>)}
                </select>
              </div>
             
              <div className="col-12">
                <label>Bio</label>
                <textarea name="bio" value={doc.bio} onChange={(e) => handleAddChange(index, e)} className="form-control" required />
              </div>
              <div className="col-12">
                <label>Image</label>
                <input type="file" onChange={(e) => handleAddFile(index, e)} accept="image/*" className="form-control" />
                {doc.image && <img src={URL.createObjectURL(doc.image)} alt="preview" style={{ width: "120px", marginTop: "10px", borderRadius: "8px" }} />}
              </div>
              <div className="col-12 text-end">
                {addDoctors.length > 1 && <button type="button" className="btn btn-danger" onClick={() => removeAddForm(index)}>Remove</button>}
              </div>
            </div>
          </div>
        ))}
        <div className="text-center mb-5">
          <button type="button" className="btn btn-secondary me-2" onClick={addForm}>Add Another Doctor</button>
          <button type="submit" className="btn btn-success" disabled={loading}>{loading ? "Saving..." : "Submit Doctors"}</button>
        </div>
      </form>

      {/* ---------------- Edit/Delete Doctors ---------------- */}
      <h4>Edit / Delete Doctors</h4>
      <div className="mb-3">
        <label>Select Doctor</label>
        <select className="form-select" value={selectedDoctorId} onChange={handleDoctorSelect}>
          <option value="">-- Select Doctor --</option>
          {doctors.map((d) => <option key={d._id} value={d._id}>{d.name} ({d.designation})</option>)}
        </select>
      </div>

      {selectedDoctorId && (
        <form onSubmit={handleUpdate}>
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label>Name</label>
              <input type="text" name="name" value={editDoctor.name} onChange={handleEditChange} className="form-control" required />
            </div>
            <div className="col-md-6">
              <label>Designation</label>
              <input type="text" name="designation" value={editDoctor.designation} onChange={handleEditChange} className="form-control" required />
            </div>
            <div className="col-md-6">
              <label>Department</label>
              <select name="department" value={editDoctor.department} onChange={handleEditChange} className="form-select" required>
                <option value="">Select Department</option>
                {departments.map((d) => <option key={d._id} value={d._id}>{d.name}</option>)}
              </select>
            </div>
            
            <div className="col-12">
              <label>Bio</label>
              <textarea name="bio" value={editDoctor.bio} onChange={handleEditChange} className="form-control" required />
            </div>
            <div className="col-12">
              <label>Image</label>
              <input type="file" onChange={handleEditFile} accept="image/*" className="form-control" />
              {editDoctor.imageFile ? (
                <img src={URL.createObjectURL(editDoctor.imageFile)} alt="preview" style={{ width: "120px", marginTop: "10px", borderRadius: "8px" }} />
              ) : editDoctor.imageUrl ? (
                <img src={editDoctor.imageUrl} alt="doctor" style={{ width: "120px", marginTop: "10px", borderRadius: "8px" }} />
              ) : null}
            </div>
          </div>
          <div className="text-center mb-5">
            <button type="submit" className="btn btn-success me-2">{loading ? "Updating..." : "Update Doctor"}</button>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete Doctor</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminPage;