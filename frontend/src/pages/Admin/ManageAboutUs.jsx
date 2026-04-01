import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, GripVertical } from 'lucide-react';

const ManageAboutUs = () => {
  const [aboutUsList, setAboutUsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  const initialFormState = { id: '', title: '', slug: '', content: '', order: 0, sublists: [] };
  const [currentAboutUs, setCurrentAboutUs] = useState(initialFormState);

  const token = localStorage.getItem('adminToken');

  const fetchAboutUs = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/aboutus');
      const data = await res.json();
      setAboutUsList(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutUs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this About Us section?')) {
      try {
        await fetch(`http://localhost:5000/api/aboutus/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        fetchAboutUs();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const isEditing = !!currentAboutUs._id;
    const url = isEditing 
      ? `http://localhost:5000/api/aboutus/${currentAboutUs._id}` 
      : 'http://localhost:5000/api/aboutus';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const resp = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(currentAboutUs)
      });
      
      if (!resp.ok) {
        const errorData = await resp.json();
        alert(errorData.message || 'Error occurred while saving');
        return;
      }
      
      setShowModal(false);
      setCurrentAboutUs(initialFormState);
      fetchAboutUs();
    } catch (err) {
      console.error(err);
    }
  };

  const openEditModal = (item) => {
    setCurrentAboutUs(item);
    setShowModal(true);
  };

  const openAddModal = () => {
    setCurrentAboutUs(initialFormState);
    setShowModal(true);
  };

  const handleSublistChange = (index, field, value) => {
    const updatedSublists = [...currentAboutUs.sublists];
    updatedSublists[index][field] = value;
    setCurrentAboutUs({ ...currentAboutUs, sublists: updatedSublists });
  };

  const addSublistItem = () => {
    setCurrentAboutUs({
      ...currentAboutUs,
      sublists: [...currentAboutUs.sublists, { heading: '', text: '' }]
    });
  };

  const removeSublistItem = (index) => {
    const updatedSublists = currentAboutUs.sublists.filter((_, i) => i !== index);
    setCurrentAboutUs({ ...currentAboutUs, sublists: updatedSublists });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage About Us Pages</h1>
        <button 
          onClick={openAddModal}
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Page
        </button>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title / Slug</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sublists Count</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {aboutUsList.map(item => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">{item.order}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-400">/{item.slug}</div>
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
            {aboutUsList.length === 0 && (
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
            <h2 className="text-xl font-bold mb-4 border-b pb-2">{currentAboutUs._id ? 'Edit About Us Page' : 'Add New About Us Page'}</h2>
            
            <form onSubmit={handleSave}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input 
                    type="text" 
                    value={currentAboutUs.title}
                    onChange={e => setCurrentAboutUs({...currentAboutUs, title: e.target.value, slug: currentAboutUs._id ? currentAboutUs.slug : e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')})}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL endpoint)</label>
                  <input 
                    type="text" 
                    value={currentAboutUs.slug}
                    onChange={e => setCurrentAboutUs({...currentAboutUs, slug: e.target.value})}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Order Mode</label>
                  <input 
                    type="number" 
                    value={currentAboutUs.order}
                    onChange={e => setCurrentAboutUs({...currentAboutUs, order: e.target.value})}
                    className="w-full border rounded px-3 py-2"
                    min="0"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Main Content Description</label>
                <textarea 
                  value={currentAboutUs.content}
                  onChange={e => setCurrentAboutUs({...currentAboutUs, content: e.target.value})}
                  className="w-full border rounded px-3 py-2 h-24"
                  placeholder="Introductory text describing this section..."
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
                
                {currentAboutUs.sublists.map((sub, index) => (
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
                        placeholder="e.g. Our Core Values"
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

                {currentAboutUs.sublists.length === 0 && (
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

export default ManageAboutUs;
