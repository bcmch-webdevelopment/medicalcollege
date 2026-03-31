import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';

const ManageFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentFacility, setCurrentFacility] = useState({ id: '', title: '', description: '', imageUrl: '', icon: '' });

  const token = localStorage.getItem('adminToken');

  const fetchFacilities = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/facilities');
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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this facility?')) {
      try {
        await fetch(`http://localhost:5000/api/facilities/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        fetchFacilities();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const isEditing = !!currentFacility._id;
    const url = isEditing 
      ? `http://localhost:5000/api/facilities/${currentFacility._id}` 
      : 'http://localhost:5000/api/facilities';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(currentFacility)
      });
      setShowModal(false);
      setCurrentFacility({ id: '', title: '', description: '', imageUrl: '', icon: '' });
      fetchFacilities();
    } catch (err) {
      console.error(err);
    }
  };

  const openEditModal = (facility) => {
    setCurrentFacility(facility);
    setShowModal(true);
  };

  const openAddModal = () => {
    setCurrentFacility({ id: '', title: '', description: '', imageUrl: '', icon: '' });
    setShowModal(true);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Facilities</h1>
        <button 
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Facility
        </button>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icon/Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {facilities.map(facility => (
              <tr key={facility._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {facility.imageUrl ? <img src={facility.imageUrl} alt="" className="h-10 w-10 object-cover rounded" /> : <span className="text-gray-400">No Img</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{facility.title}</td>
                <td className="px-6 py-4">
                  <p className="line-clamp-2 text-sm text-gray-500">{facility.description}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => openEditModal(facility)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleDelete(facility._id)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
            {facilities.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No facilities found. Add one to get started.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">{currentFacility._id ? 'Edit Facility' : 'Add New Facility'}</h2>
            
            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input 
                  type="text" 
                  value={currentFacility.title}
                  onChange={e => setCurrentFacility({...currentFacility, title: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  value={currentFacility.description}
                  onChange={e => setCurrentFacility({...currentFacility, description: e.target.value})}
                  className="w-full border rounded px-3 py-2 h-24"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input 
                  type="text" 
                  value={currentFacility.imageUrl || ''}
                  onChange={e => setCurrentFacility({...currentFacility, imageUrl: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
