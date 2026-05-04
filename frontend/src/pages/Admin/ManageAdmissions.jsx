import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, ArrowLeft, Users } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ManageStudentLists from './ManageStudentLists';

const ManageAdmissions = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showStudentListModal, setShowStudentListModal] = useState(false);
  const [activeAdmissionIdForLists, setActiveAdmissionIdForLists] = useState(null);
  
  const initialFormState = { 
    _id: '', 
    title: '', 
    slug: '', 
    shortDescription: '', 
    overview: '', 
    eligibility: '', 
    process: '', 
    order: 0,
    studentLists: [] 
  };
  const [currentAdmission, setCurrentAdmission] = useState(initialFormState);

  const fetchAdmissions = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/admissions`);
      const data = await res.json();
      setAdmissions(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch admissions:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this admission program?')) {
      try {
        const res = await fetch(`http://localhost:5000/api/admissions/${id}`, {
          method: 'DELETE'
        });
        
        if (!res.ok) {
           const errData = await res.json();
           alert(errData.message || 'Error deleting admission');
           return;
        }
        
        fetchAdmissions();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const isEditing = !!currentAdmission._id;
    const url = isEditing 
      ? `http://localhost:5000/api/admissions/${currentAdmission._id}` 
      : `http://localhost:5000/api/admissions`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const resp = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentAdmission)
      });
      
      if (!resp.ok) {
        const errorData = await resp.json();
        alert(errorData.message || 'Error occurred while saving');
        return;
      }
      
      setShowModal(false);
      setCurrentAdmission(initialFormState);
      fetchAdmissions();
    } catch (err) {
      console.error(err);
    }
  };

  const openEditModal = (item) => {
    setCurrentAdmission(item);
    setShowModal(true);
  };

  const openAddModal = () => {
    setCurrentAdmission(initialFormState);
    setShowModal(true);
  };

  const openStudentListModal = (item) => {
    setActiveAdmissionIdForLists(item._id);
    setShowStudentListModal(true);
  };

  if (loading) return <div className="p-4">Loading admission data...</div>;

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link'],
      ['clean'],
    ]
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          Manage Admissions
        </h1>
        <button 
          onClick={openAddModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow flex items-center gap-2 transition"
        >
          <Plus className="h-4 w-4" /> Add Program
        </button>
      </div>

      <div className="bg-white rounded shadow overflow-hidden border border-slate-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Order</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Program Title</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {admissions.map(item => (
              <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-medium">{item.order}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="font-semibold text-slate-800">{item.title}</div>
                  <div className="text-xs text-slate-400 mt-1">/{item.slug}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => openStudentListModal(item)} className="text-emerald-600 hover:text-emerald-900 mr-4 transition-colors" title="Manage Student Lists">
                    <Users className="h-5 w-5" />
                  </button>
                  <button onClick={() => openEditModal(item)} className="text-indigo-600 hover:text-indigo-900 mr-4 transition-colors" title="Edit Program">
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700 transition-colors" title="Delete Program">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
            {admissions.length === 0 && (
              <tr>
                <td colSpan="3" className="px-8 py-10 text-center text-slate-500 bg-slate-50">
                  <p className="text-sm font-medium text-slate-600">No admission programs found</p>
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
                 {currentAdmission._id ? 'Edit Admission Program' : 'Add New Admission Program'}
               </h2>
               <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                  <ArrowLeft className="h-5 w-5" />
               </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 pt-0 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Program Title</label>
                  <input 
                    type="text" 
                    value={currentAdmission.title}
                    onChange={e => setCurrentAdmission({...currentAdmission, title: e.target.value, slug: currentAdmission._id ? currentAdmission.slug : e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')})}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Slug</label>
                  <input 
                    type="text" 
                    value={currentAdmission.slug}
                    onChange={e => setCurrentAdmission({...currentAdmission, slug: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-slate-50"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Short Description</label>
                  <textarea 
                    value={currentAdmission.shortDescription}
                    onChange={e => setCurrentAdmission({...currentAdmission, shortDescription: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none min-h-[100px]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Sorting Order</label>
                  <input 
                    type="number" 
                    value={currentAdmission.order}
                    onChange={e => setCurrentAdmission({...currentAdmission, order: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Overview Section</label>
                <div className="border border-slate-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/20">
                   <ReactQuill 
                     theme="snow" 
                     modules={modules}
                     value={currentAdmission.overview || ''} 
                     onChange={(val) => setCurrentAdmission({...currentAdmission, overview: val})} 
                     className="bg-white min-h-[200px]"
                   />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Eligibility Section</label>
                <div className="border border-slate-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/20">
                   <ReactQuill 
                     theme="snow" 
                     modules={modules}
                     value={currentAdmission.eligibility || ''} 
                     onChange={(val) => setCurrentAdmission({...currentAdmission, eligibility: val})} 
                     className="bg-white min-h-[200px]"
                   />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Process Section</label>
                <div className="border border-slate-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/20">
                   <ReactQuill 
                     theme="snow" 
                     modules={modules}
                     value={currentAdmission.process || ''} 
                     onChange={(val) => setCurrentAdmission({...currentAdmission, process: val})} 
                     className="bg-white min-h-[200px]"
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
                  Save Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showStudentListModal && activeAdmissionIdForLists && (
        <ManageStudentLists 
          admissionId={activeAdmissionIdForLists} 
          onClose={() => setShowStudentListModal(false)} 
        />
      )}
    </div>
  );
};

export default ManageAdmissions;
