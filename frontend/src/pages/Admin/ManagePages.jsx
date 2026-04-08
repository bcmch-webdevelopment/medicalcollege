import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, ArrowLeft } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams, useNavigate } from 'react-router-dom';

const ManagePages = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  const [pagesList, setPagesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  const initialFormState = { _id: '', title: '', slug: '', heading: '', content: '', imagePosition: 'left', parentId: 'none', order: 0 };
  const [currentPage, setCurrentPage] = useState(initialFormState);

  const token = localStorage.getItem('adminToken');

  const fetchPages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/pages/${section}`);
      const data = await res.json();
      setPagesList(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, [section]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      try {
        const res = await fetch(`http://localhost:5000/api/pages/${section}/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (!res.ok) {
           const errData = await res.json();
           alert(errData.message || 'Error deleting page');
           return;
        }
        
        fetchPages();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const isEditing = !!currentPage._id;
    const url = isEditing 
      ? `http://localhost:5000/api/pages/${section}/${currentPage._id}` 
      : `http://localhost:5000/api/pages/${section}`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const formData = new FormData();
      formData.append('title', currentPage.title);
      formData.append('slug', currentPage.slug);
      formData.append('heading', currentPage.heading || '');
      formData.append('imagePosition', currentPage.imagePosition || 'left');
      formData.append('content', currentPage.content || '');
      formData.append('parentId', currentPage.parentId !== 'none' ? currentPage.parentId : '');
      formData.append('order', currentPage.order);
      
      if (currentPage.newImage) {
        formData.append('image', currentPage.newImage);
      } else if (currentPage.image && !currentPage.newImage) {
        formData.append('image', currentPage.image);
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
      setCurrentPage(initialFormState);
      fetchPages();
    } catch (err) {
      console.error(err);
    }
  };

  const openEditModal = (item) => {
    setCurrentPage({
      ...item,
      parentId: item.parentId || 'none'
    });
    setShowModal(true);
  };

  const openAddModal = () => {
    setCurrentPage(initialFormState);
    setShowModal(true);
  };

  const getParentTitle = (parentId) => {
    if (!parentId || parentId === 'none') return "None (Root)";
    const parent = pagesList.find(item => item._id === parentId);
    return parent ? parent.title : "Unknown";
  };

  const formatSectionName = (sec) => {
    return sec ? sec.replace('-', ' ').replace(/\b\w/g, char => char.toUpperCase()) : '';
  };

  if (loading) return <div className="p-4">Loading section data...</div>;

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ]
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          Manage {formatSectionName(section)} Pages
        </h1>
        <button 
          onClick={openAddModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow flex items-center gap-2 transition"
        >
          <Plus className="h-4 w-4" /> Add Page
        </button>
      </div>

      <div className="bg-white rounded shadow overflow-hidden border border-slate-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Order</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Title / Slug</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Hierarchy</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pagesList.map(item => (
              <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-medium">{item.order}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="font-semibold text-slate-800">{item.title}</div>
                  <div className="text-xs text-slate-400 mt-1">/{item.slug}</div>
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  {item.parentId ? (
                    <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs px-2.5 py-1 rounded-full font-medium inline-flex items-center">
                      Child of: {getParentTitle(item.parentId)}
                    </span>
                  ) : (
                    <span className="bg-slate-100 text-slate-700 border border-slate-200 text-xs px-2.5 py-1 rounded-full font-medium inline-flex items-center">
                      Root Page
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => openEditModal(item)} className="text-indigo-600 hover:text-indigo-900 mr-4 transition-colors">
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700 transition-colors">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
            {pagesList.length === 0 && (
              <tr>
                <td colSpan="4" className="px-8 py-10 text-center text-slate-500 bg-slate-50">
                  <div className="flex flex-col items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center mb-3">
                      <Plus className="h-5 w-5 text-slate-400" />
                    </div>
                    <p className="text-sm font-medium text-slate-600">No pages found in this section</p>
                    <p className="text-xs text-slate-400 mt-1">Click the Add Page button to get started.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 lg:p-8 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl my-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 mb-2">
               <h2 className="text-xl font-bold text-slate-800">
                 {currentPage._id ? 'Edit Page' : 'Add New Page'}
               </h2>
               <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                  <ArrowLeft className="h-5 w-5" />
               </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Menu Title</label>
                  <input 
                    type="text" 
                    value={currentPage.title}
                    onChange={e => setCurrentPage({...currentPage, title: e.target.value, slug: currentPage._id ? currentPage.slug : e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')})}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                    placeholder="E.g. History & Values"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Slug (URL snippet)</label>
                  <input 
                    type="text" 
                    value={currentPage.slug}
                    onChange={e => setCurrentPage({...currentPage, slug: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none bg-slate-50"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Page Main Heading</label>
                  <input 
                    type="text" 
                    value={currentPage.heading || ''}
                    onChange={e => setCurrentPage({...currentPage, heading: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                    placeholder="Large heading shown at top of the page"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Parent Page (Sub-menu)</label>
                  <select
                    value={currentPage.parentId || 'none'}
                    onChange={e => setCurrentPage({...currentPage, parentId: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none bg-white"
                  >
                    <option value="none">None (Root Page)</option>
                    {pagesList
                      .filter(item => item._id !== currentPage._id) 
                      .filter(item => !item.parentId) 
                      .map(item => (
                      <option key={item._id} value={item._id}>{item.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                 <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Sorting Order</label>
                    <input 
                      type="number" 
                      value={currentPage.order}
                      onChange={e => setCurrentPage({...currentPage, order: e.target.value})}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                      min="0"
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Featured Image</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={e => setCurrentPage({...currentPage, newImage: e.target.files[0]})}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                    {currentPage.image && !currentPage.newImage && (
                      <div className="mt-2 text-xs text-slate-500 truncate">Current: {currentPage.image}</div>
                    )}
                 </div>
                 <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Image Layout Position</label>
                    <select 
                      value={currentPage.imagePosition || 'left'}
                      onChange={e => setCurrentPage({...currentPage, imagePosition: e.target.value})}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none bg-white"
                    >
                      <option value="left">Left (Image Left, Text Right)</option>
                      <option value="right">Right (Text Left, Image Right)</option>
                      <option value="top">Top Banner (Text Below)</option>
                    </select>
                 </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Rich Text Page Content</label>
                <div className="border border-slate-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
                   <ReactQuill 
                     theme="snow" 
                     modules={modules}
                     value={currentPage.content || ''} 
                     onChange={(val) => setCurrentPage({...currentPage, content: val})} 
                     className="bg-white min-h-[350px] custom-quill"
                   />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium shadow-md shadow-indigo-200 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-300 transform active:scale-95 transition-all"
                >
                  Save Page
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePages;
