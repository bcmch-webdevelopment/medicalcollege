import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ManageAboutUs = () => {
  const [aboutUsList, setAboutUsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  const initialFormState = { id: '', title: '', slug: '', heading: '', content: '', imagePosition: 'left', parentId: 'none', order: 0 };
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
      const formData = new FormData();
      formData.append('title', currentAboutUs.title);
      formData.append('slug', currentAboutUs.slug);
      formData.append('heading', currentAboutUs.heading || '');
      formData.append('imagePosition', currentAboutUs.imagePosition || 'left');
      formData.append('content', currentAboutUs.content || '');
      formData.append('parentId', currentAboutUs.parentId || 'none');
      formData.append('order', currentAboutUs.order);
      
      if (currentAboutUs.newImage) {
        formData.append('image', currentAboutUs.newImage);
      }

      const resp = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
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
    setCurrentAboutUs({
      ...item,
      parentId: item.parentId || 'none'
    });
    setShowModal(true);
  };

  const openAddModal = () => {
    setCurrentAboutUs(initialFormState);
    setShowModal(true);
  };

  const getParentTitle = (parentId) => {
    if (!parentId || parentId === 'none') return "None (Root)";
    const parent = aboutUsList.find(item => item._id === parentId);
    return parent ? parent.title : "Unknown";
  };

  if (loading) return <p>Loading...</p>;

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ]
  };

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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent Page</th>
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
                  {item.parentId ? (
                    <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded inline-flex items-center">
                      Child of: {getParentTitle(item.parentId)}
                    </span>
                  ) : (
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded inline-flex items-center">
                      Root Page
                    </span>
                  )}
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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">{currentAboutUs._id ? 'Edit About Us Page' : 'Add New About Us Page'}</h2>
            
            <form onSubmit={handleSave}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Menu Title</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Page Heading</label>
                  <input 
                    type="text" 
                    value={currentAboutUs.heading || ''}
                    onChange={e => setCurrentAboutUs({...currentAboutUs, heading: e.target.value})}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parent Page (Optional)</label>
                  <select
                    value={currentAboutUs.parentId || 'none'}
                    onChange={e => setCurrentAboutUs({...currentAboutUs, parentId: e.target.value})}
                    className="w-full border rounded px-3 py-2 bg-white"
                  >
                    <option value="none">None (Root Page)</option>
                    {aboutUsList
                      .filter(item => item._id !== currentAboutUs._id) 
                      .filter(item => !item.parentId) 
                      .map(item => (
                      <option key={item._id} value={item._id}>{item.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                    <input 
                      type="number" 
                      value={currentAboutUs.order}
                      onChange={e => setCurrentAboutUs({...currentAboutUs, order: e.target.value})}
                      className="w-full border rounded px-3 py-2"
                      min="0"
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image Upload</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={e => setCurrentAboutUs({...currentAboutUs, newImage: e.target.files[0]})}
                      className="w-full border rounded px-3 py-2 text-sm"
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image Position</label>
                    <select 
                      value={currentAboutUs.imagePosition || 'left'}
                      onChange={e => setCurrentAboutUs({...currentAboutUs, imagePosition: e.target.value})}
                      className="w-full border rounded px-3 py-2 bg-white"
                    >
                      <option value="left">Left (Image Left, Text Right)</option>
                      <option value="right">Right (Text Left, Image Right)</option>
                      <option value="top">Top (Banner Layout, Text Below)</option>
                    </select>
                 </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-1">Rich Text Content</label>
                <div className="h-64 mb-12">
                   <ReactQuill 
                     theme="snow" 
                     modules={modules}
                     value={currentAboutUs.content || ''} 
                     onChange={(val) => setCurrentAboutUs({...currentAboutUs, content: val})} 
                     className="h-full"
                   />
                </div>
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
