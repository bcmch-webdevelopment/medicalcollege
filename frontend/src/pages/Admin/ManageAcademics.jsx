import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';

const ManageAcademics = () => {
  const [academicList, setAcademicList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  const initialFormState = { id: '', title: '', slug: '', content: '', order: 0, sublists: [] };
  const [currentAcademic, setCurrentAcademic] = useState(initialFormState);

  const token = localStorage.getItem('adminToken');

  const fetchAcademics = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/academic');
      const data = await res.json();
      setAcademicList(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAcademics();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this Academic section?')) {
      try {
        await fetch(`http://localhost:5000/api/academic/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchAcademics();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const isEditing = !!currentAcademic._id;
    const url = isEditing 
      ? `http://localhost:5000/api/academic/${currentAcademic._id}` 
      : 'http://localhost:5000/api/academic';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      // Use JSON for Academic if we don't have images
      const payload = { ...currentAcademic };
      
      const resp = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      if (!resp.ok) {
        const errorData = await resp.json();
        alert(errorData.message || 'Error occurred while saving');
        return;
      }
      
      setShowModal(false);
      setCurrentAcademic(initialFormState);
      fetchAcademics();
    } catch (err) {
      console.error(err);
    }
  };

  const openEditModal = (item) => {
    setCurrentAcademic(item);
    setShowModal(true);
  };

  const openAddModal = () => {
    setCurrentAcademic(initialFormState);
    setShowModal(true);
  };

  const handleSublistChange = (index, field, value) => {
    const updatedSublists = [...currentAcademic.sublists];
    updatedSublists[index][field] = value;
    setCurrentAcademic({ ...currentAcademic, sublists: updatedSublists });
  };

  const addSublistItem = () => {
    setCurrentAcademic({
      ...currentAcademic,
      sublists: [...currentAcademic.sublists, { heading: '', text: '' }]
    });
  };

  const removeSublistItem = (index) => {
    const updatedSublists = currentAcademic.sublists.filter((_, i) => i !== index);
    setCurrentAcademic({ ...currentAcademic, sublists: updatedSublists });
  };

  if (loading) return <p>Loading...</p>;

  // Pre-fill path helper
  const popularPaths = [
    "/attendance/ug", "/attendance/pg", "/exam/notification", "/exam/timetable",
    "/exam/results", "/teaching/ug", "/teaching/pg", "/teaching/superspeciality",
    "/research/team", "/research/projects", "/research/publications", "/awards",
    "/cme", "/workshops/cme", "/workshops/conference", "/student-feedback",
    "/ug/foundation", "/ug/cbme", "/student-manual", "/student-support"
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Academic Pages</h1>
        <button 
          onClick={openAddModal}
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Academic Route
        </button>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title / Path</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sublists Count</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {academicList.map(item => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">{item.order}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-400">{decodeURIComponent(item.slug)}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {item.sublists?.length || 0} sublists
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => openEditModal(item)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
            {academicList.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No entries found. Add one to get started.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">{currentAcademic._id ? 'Edit Academic Page' : 'Add New Academic Page'}</h2>
            
            <form onSubmit={handleSave}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input 
                    type="text" 
                    value={currentAcademic.title}
                    onChange={e => setCurrentAcademic({...currentAcademic, title: e.target.value})}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Path (Slug equivalent)</label>
                  <input 
                    type="text" 
                    value={decodeURIComponent(currentAcademic.slug)}
                    onChange={e => setCurrentAcademic({...currentAcademic, slug: encodeURIComponent(e.target.value)})}
                    className="w-full border rounded px-3 py-2 text-sm"
                    placeholder="e.g. /attendance/ug"
                    required
                    list="pathOptions"
                  />
                  <datalist id="pathOptions">
                    {popularPaths.map(p => <option key={p} value={p} />)}
                  </datalist>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Order Mode</label>
                  <input 
                    type="number" 
                    value={currentAcademic.order}
                    onChange={e => setCurrentAcademic({...currentAcademic, order: e.target.value})}
                    className="w-full border rounded px-3 py-2"
                    min="0"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Main Content Description</label>
                <textarea 
                  value={currentAcademic.content}
                  onChange={e => setCurrentAcademic({...currentAcademic, content: e.target.value})}
                  className="w-full border rounded px-3 py-2 h-24"
                  placeholder="Introductory text..."
                ></textarea>
              </div>
              
              <div className="mt-8 border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Sublists</h3>
                  <button 
                    type="button" 
                    onClick={addSublistItem}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm flex items-center gap-1 border"
                  >
                    <Plus className="h-4 w-4" /> Add Sub-Section
                  </button>
                </div>
                
                {currentAcademic.sublists.map((sub, index) => (
                  <div key={index} className="bg-gray-50 border p-4 rounded mb-4 relative group">
                    <button 
                      type="button"
                      onClick={() => removeSublistItem(index)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"
                      title="Remove sublist"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    
                    <div className="mb-3 pr-8">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Sub-Heading</label>
                      <input 
                        type="text" 
                        value={sub.heading}
                        onChange={e => handleSublistChange(index, 'heading', e.target.value)}
                        className="w-full border focus:ring focus:ring-red-100 rounded px-3 py-2 text-sm"
                        placeholder="e.g. Overview"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Sub-Content</label>
                      <textarea 
                        value={sub.text}
                        onChange={e => handleSublistChange(index, 'text', e.target.value)}
                        className="w-full border focus:ring focus:ring-red-100 rounded px-3 py-2 h-20 text-sm"
                        placeholder="Enter description points..."
                      ></textarea>
                    </div>
                  </div>
                ))}

                {currentAcademic.sublists.length === 0 && (
                  <div className="text-center text-sm text-gray-400 py-6 border-2 border-dashed bg-gray-50 rounded">
                    No sublists added yet. Click "Add Sub-Section" to append entries.
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-3 mt-8 border-t pt-4 bg-white sticky bottom-0">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-red-700 text-white rounded font-medium shadow hover:bg-red-800 transition"
                >
                  Save Section
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAcademics;
