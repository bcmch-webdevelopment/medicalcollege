import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, ArrowLeft } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ManageNewsEvents = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  const initialFormState = { 
    _id: '', 
    title: '', 
    slug: '', 
    shortDescription: '', 
    content: '', 
    category: 'News', 
    publishDate: new Date().toISOString().slice(0, 10), 
    isFeatured: false,
    status: 'published',
    featuredImage: null
  };
  const [currentItem, setCurrentItem] = useState(initialFormState);

  const fetchNewsEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/news-events`);
      const resData = await res.json();
      setData(Array.isArray(resData) ? resData : []);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch news and events:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsEvents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this specific item?')) {
      try {
        const res = await fetch(`http://localhost:5000/api/news-events/${id}`, {
          method: 'DELETE'
        });
        
        if (!res.ok) {
           const errData = await res.json();
           alert(errData.message || 'Error deleting item');
           return;
        }
        
        fetchNewsEvents();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const isEditing = !!currentItem._id;
    const url = isEditing 
      ? `http://localhost:5000/api/news-events/${currentItem._id}` 
      : `http://localhost:5000/api/news-events`;
    const method = isEditing ? 'PUT' : 'POST';

    const formData = new FormData();
    formData.append('title', currentItem.title);
    formData.append('slug', currentItem.slug);
    formData.append('shortDescription', currentItem.shortDescription);
    formData.append('content', currentItem.content);
    formData.append('category', currentItem.category);
    formData.append('publishDate', currentItem.publishDate);
    formData.append('isFeatured', currentItem.isFeatured);
    formData.append('status', currentItem.status);

    if (currentItem.featuredImage instanceof File) {
      formData.append('featuredImage', currentItem.featuredImage);
    } else if (currentItem.featuredImage && typeof currentItem.featuredImage === 'string') {
      formData.append('existingFeaturedImage', currentItem.featuredImage);
    }

    try {
      const resp = await fetch(url, {
        method,
        body: formData // Using FormData for express multer upload. NO 'Content-Type' header needed, browser will attach
      });
      
      if (!resp.ok) {
        const errorData = await resp.json();
        alert(errorData.message || 'Error occurred while saving');
        return;
      }
      
      setShowModal(false);
      setCurrentItem(initialFormState);
      fetchNewsEvents();
    } catch (err) {
      console.error(err);
    }
  };

  const openEditModal = (item) => {
    setCurrentItem({
      ...item,
      publishDate: new Date(item.publishDate).toISOString().slice(0, 10),
      featuredImage: item.featuredImage || null
    });
    setShowModal(true);
  };

  const openAddModal = () => {
    setCurrentItem(initialFormState);
    setShowModal(true);
  };

  if (loading) return <div className="p-4">Loading data...</div>;

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image'],
      ['clean'],
    ]
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          Manage News & Events
        </h1>
        <button 
          onClick={openAddModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow flex items-center gap-2 transition"
        >
          <Plus className="h-4 w-4" /> Add Post
        </button>
      </div>

      <div className="bg-white rounded shadow overflow-hidden border border-slate-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map(item => (
              <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-medium">
                  {new Date(item.publishDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="font-semibold text-slate-800 line-clamp-2">{item.title}</div>
                  <div className="text-xs text-slate-400 mt-1">/{item.slug}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${item.category === 'News' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                     {item.category}
                  </span>
                  {item.isFeatured && <span className="ml-2 text-amber-500 text-xs">★ Featured</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {item.status}
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
            {data.length === 0 && (
              <tr>
                <td colSpan="5" className="px-8 py-10 text-center text-slate-500 bg-slate-50">
                  <p className="text-sm font-medium text-slate-600">No news or events found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 lg:p-8 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl my-auto animate-in fade-in zoom-in-95 duration-200 h-[90vh] overflow-y-auto">
            <div className="sticky top-0 z-10 bg-white flex items-center justify-between p-6 border-b border-slate-100 mb-2">
               <h2 className="text-xl font-bold text-slate-800">
                 {currentItem._id ? 'Edit Post' : 'Add New Post'}
               </h2>
               <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                  <ArrowLeft className="h-5 w-5" />
               </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 pt-0 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Title</label>
                  <input 
                    type="text" 
                    value={currentItem.title}
                    onChange={e => setCurrentItem({...currentItem, title: e.target.value, slug: currentItem._id ? currentItem.slug : e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')})}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Slug</label>
                  <input 
                    type="text" 
                    value={currentItem.slug}
                    onChange={e => setCurrentItem({...currentItem, slug: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-slate-50"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className="block text-sm font-semibold text-slate-700 mb-1.5">Category</label>
                   <select 
                     value={currentItem.category}
                     onChange={e => setCurrentItem({...currentItem, category: e.target.value})}
                     className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                     required
                   >
                     <option value="News">News</option>
                     <option value="Event">Event</option>
                   </select>
                 </div>
                 <div>
                   <label className="block text-sm font-semibold text-slate-700 mb-1.5">Publish Date</label>
                   <input 
                     type="date" 
                     value={currentItem.publishDate}
                     onChange={e => setCurrentItem({...currentItem, publishDate: e.target.value})}
                     className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-slate-50"
                     required
                   />
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Short Description</label>
                  <textarea 
                    value={currentItem.shortDescription}
                    onChange={e => setCurrentItem({...currentItem, shortDescription: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none min-h-[100px]"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Featured Image</label>
                  <input 
                    type="file" 
                    onChange={e => setCurrentItem({...currentItem, featuredImage: e.target.files[0]})}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-slate-50 mb-2"
                  />
                  {currentItem.featuredImage && typeof currentItem.featuredImage === 'string' && (
                     <p className="text-xs text-blue-600">Current File: {currentItem.featuredImage.substring(currentItem.featuredImage.lastIndexOf('/') + 1)}</p>
                  )}
                  <div className="flex items-center gap-6 mt-4">
                     <label className="flex items-center text-sm font-semibold text-slate-700 cursor-pointer">
                       <input 
                         type="checkbox" 
                         checked={currentItem.isFeatured}
                         onChange={e => setCurrentItem({...currentItem, isFeatured: e.target.checked})}
                         className="w-4 h-4 mr-2 text-indigo-600 rounded"
                       />
                       Feature on Homepage
                     </label>
                     
                     <label className="flex items-center text-sm font-semibold text-slate-700 cursor-pointer">
                       <input 
                         type="checkbox" 
                         checked={currentItem.status === 'published'}
                         onChange={e => setCurrentItem({...currentItem, status: e.target.checked ? 'published' : 'draft'})}
                         className="w-4 h-4 mr-2 text-indigo-600 rounded"
                       />
                       Publish Post
                     </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Content</label>
                <div className="border border-slate-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/20">
                   <ReactQuill 
                     theme="snow" 
                     modules={modules}
                     value={currentItem.content || ''} 
                     onChange={(val) => setCurrentItem({...currentItem, content: val})} 
                     className="bg-white min-h-[300px]"
                   />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium shadow-md hover:bg-indigo-700 transition-all"
                >
                  Save Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNewsEvents;
