import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

const facilityTypes = [
  "Library",
  "Laboratory",
  "Hostel",
  "Transport",
  "Cafeteria",
  "Sports & Recreation",
  "Auditorium",
  "Medical Facilities",
];

const ManageFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentFacility, setCurrentFacility] = useState({
    id: "",
    title: "",
    description: "",
    imageUrl: "",
    category: "",
  });

  const token = localStorage.getItem("adminToken");

  // Fetch Facilities
  const fetchFacilities = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/facilities");
      const data = await res.json();
      setFacilities(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this facility?")) {
      try {
        await fetch(`http://localhost:5000/api/facilities/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchFacilities();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Save (Add / Edit)
  const handleSave = async (e) => {
    e.preventDefault();
    const isEditing = !!currentFacility._id;

    const url = isEditing
      ? `http://localhost:5000/api/facilities/${currentFacility._id}`
      : "http://localhost:5000/api/facilities";

    const method = isEditing ? "PUT" : "POST";

    try {
      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(currentFacility),
      });

      setShowModal(false);
      resetForm();
      fetchFacilities();
    } catch (err) {
      console.error(err);
    }
  };

  // Reset Form
  const resetForm = () => {
    setCurrentFacility({
      id: "",
      title: "",
      description: "",
      imageUrl: "",
      category: "",
    });
  };

  // Open Modals
  const openEditModal = (facility) => {
    setCurrentFacility(facility);
    setShowModal(true);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Facilities</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Facility
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                Description
              </th>
              <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {facilities.map((facility) => (
              <tr key={facility._id}>
                {/* Image */}
                <td className="px-6 py-4">
                  {facility.imageUrl ? (
                    <img
                      src={facility.imageUrl}
                      alt=""
                      className="h-10 w-10 rounded object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">No Img</span>
                  )}
                </td>

                {/* Title */}
                <td className="px-6 py-4 font-medium">
                  {facility.title}
                </td>

                {/* Category */}
                <td className="px-6 py-4 text-sm text-gray-600">
                  {facility.category}
                </td>

                {/* Description */}
                <td className="px-6 py-4 text-sm text-gray-500 line-clamp-2">
                  {facility.description}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => openEditModal(facility)}
                    className="text-indigo-600 mr-4"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>

                  <button
                    onClick={() => handleDelete(facility._id)}
                    className="text-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}

            {facilities.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No facilities found. Add one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">
              {currentFacility._id ? "Edit Facility" : "Add Facility"}
            </h2>

            <form onSubmit={handleSave}>
              {/* Title */}
              <div className="mb-4">
                <label className="block text-sm mb-1">Title</label>
                <input
                  type="text"
                  value={currentFacility.title}
                  onChange={(e) =>
                    setCurrentFacility({
                      ...currentFacility,
                      title: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>

              {/* Category */}
              <div className="mb-4">
                <label className="block text-sm mb-1">Category</label>
                <select
                  value={currentFacility.category}
                  onChange={(e) =>
                    setCurrentFacility({
                      ...currentFacility,
                      category: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded"
                  required
                >
                  <option value="">Select Category</option>
                  {facilityTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-sm mb-1">Description</label>
                <textarea
                  value={currentFacility.description}
                  onChange={(e) =>
                    setCurrentFacility({
                      ...currentFacility,
                      description: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded h-24"
                  required
                />
              </div>

              {/* Image */}
              <div className="mb-4">
                <label className="block text-sm mb-1">Image URL</label>
                <input
                  type="text"
                  value={currentFacility.imageUrl}
                  onChange={(e) =>
                    setCurrentFacility({
                      ...currentFacility,
                      imageUrl: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="border px-4 py-2 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFacilities;