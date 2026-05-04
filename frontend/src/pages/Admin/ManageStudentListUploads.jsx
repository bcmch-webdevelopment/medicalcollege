import React, { useState, useEffect, useRef } from 'react';
import { UploadCloud, FileText, Trash2, Pencil, Search, Filter, Plus, X, Download, AlertCircle, CheckCircle2 } from 'lucide-react';

const ManageStudentListUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination & Filtering
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterYear, setFilterYear] = useState('');
  const [filterDept, setFilterDept] = useState('');
  
  // Modal states
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // Form State
  const initialForm = {
    _id: '',
    title: '',
    description: '',
    academicYear: '',
    department: '',
  };
  const [formData, setFormData] = useState(initialForm);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Status/Toast
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
  };

  const fetchUploads = async () => {
    try {
      setLoading(true);
      let query = `?page=${page}&limit=20`;
      if (filterYear) query += `&year=${filterYear}`;
      if (filterDept) query += `&department=${filterDept}`;
      
      const res = await fetch(`http://localhost:5000/api/student-list-uploads${query}`);
      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }
      const data = await res.json();
      
      setUploads(data.studentLists || []);
      setTotalPages(data.pagination?.pages || 1);
      setLoading(false);
    } catch (err) {
      console.error(err);
      showToast('Error fetching student lists', 'error');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUploads();
  }, [page, filterYear, filterDept]);

  const handleDragEnter = (e) => { e.preventDefault(); setIsDragActive(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragActive(false); };
  const handleDragOver = (e) => { e.preventDefault(); };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const openAddModal = () => {
    setFormData(initialForm);
    setSelectedFile(null);
    setShowFormModal(true);
  };

  const openEditModal = (item) => {
    setFormData(item);
    setSelectedFile(null); // File is optional on edit
    setShowFormModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEditing = !!formData._id;
    
    if (!isEditing && !selectedFile) {
      showToast('Please select a file to upload.', 'error');
      return;
    }

    const token = localStorage.getItem('adminToken');
    const payload = new FormData();
    payload.append('title', formData.title);
    payload.append('description', formData.description || '');
    payload.append('academicYear', formData.academicYear);
    payload.append('department', formData.department);
    if (selectedFile) {
      payload.append('file', selectedFile);
    }

    const url = isEditing 
      ? `http://localhost:5000/api/student-list-uploads/${formData._id}` 
      : `http://localhost:5000/api/student-list-uploads`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: payload
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Operation failed');
      }

      showToast(isEditing ? 'List updated successfully' : 'File uploaded successfully');
      setShowFormModal(false);
      fetchUploads();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const confirmDelete = async () => {
    if (!formData._id) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`http://localhost:5000/api/student-list-uploads/${formData._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Error deleting file');
      
      showToast('File deleted successfully');
      setShowDeleteModal(false);
      fetchUploads();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded shadow-lg text-white font-medium animate-in slide-in-from-right-5 ${toast.type === 'error' ? 'bg-red-500' : 'bg-emerald-500'}`}>
          {toast.type === 'error' ? <AlertCircle className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
          {toast.message}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
          <FileText className="h-6 w-6 text-indigo-600" />
          Student List Uploads
        </h1>
        <button 
          onClick={openAddModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded shadow flex items-center gap-2 transition font-medium"
        >
          <Plus className="h-4 w-4" /> Upload New List
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 mb-6 flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Filter by Year</label>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="e.g. 2024" 
              value={filterYear}
              onChange={(e) => { setFilterYear(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Filter by Category/Dept</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="e.g. UG, PG" 
              value={filterDept}
              onChange={(e) => { setFilterDept(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Table Area */}
      <div className="bg-white rounded shadow border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading uploads...</div>
        ) : uploads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Title & Desc</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Year</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">File</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {uploads.map(item => (
                  <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-slate-800">{item.title}</div>
                      {item.description && <div className="text-xs text-slate-500 mt-1 line-clamp-1">{item.description}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{item.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-700 bg-slate-50 text-center w-24 border-l border-r border-slate-100">{item.academicYear}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <a href={`http://localhost:5000${item.fileUrl}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 hover:underline font-medium">
                        <Download className="h-4 w-4" /> 
                        {item.originalFileName ? (item.originalFileName.length > 20 ? item.originalFileName.substring(0,20)+'...' : item.originalFileName) : 'Download'}
                      </a>
                      <div className="text-[10px] text-slate-400 mt-1 uppercase">{item.fileType?.split('/')[1] || 'FILE'} • {(item.fileSize / 1024 / 1024).toFixed(2)} MB</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button onClick={() => openEditModal(item)} className="text-indigo-600 hover:text-indigo-900 mr-4 transition-colors" title="Edit Metadata">
                        <Pencil className="h-5 w-5 inline" />
                      </button>
                      <button onClick={() => { setFormData(item); setShowDeleteModal(true); }} className="text-red-500 hover:text-red-700 transition-colors" title="Delete Upload">
                        <Trash2 className="h-5 w-5 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <UploadCloud className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-slate-700">No uploads found</h3>
            <p className="text-slate-500 mt-1">Try uploading a new student list or adjust filters.</p>
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-200 flex justify-between items-center bg-slate-50">
            <button 
              disabled={page === 1} 
              onClick={() => setPage(p => p - 1)}
              className="px-3 py-1.5 border border-slate-300 rounded text-sm text-slate-600 disabled:opacity-50 hover:bg-white transition"
            >
              Previous
            </button>
            <span className="text-sm font-medium text-slate-600">Page {page} of {totalPages}</span>
            <button 
              disabled={page === totalPages} 
              onClick={() => setPage(p => p + 1)}
              className="px-3 py-1.5 border border-slate-300 rounded text-sm text-slate-600 disabled:opacity-50 hover:bg-white transition"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
               <h2 className="text-xl font-bold text-slate-800">
                 {formData._id ? 'Edit Student List Metadata' : 'Upload Student List'}
               </h2>
               <button onClick={() => setShowFormModal(false)} className="text-slate-400 hover:text-slate-600 bg-white shadow-sm p-1.5 rounded-full border border-slate-200">
                  <X className="h-5 w-5" />
               </button>
            </div>

            <div className="overflow-y-auto p-6">
              <form id="upload-form" onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Title <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      required 
                      value={formData.title} 
                      onChange={e => setFormData({...formData, title: e.target.value})} 
                      placeholder="e.g. Final MBBS List 2024"
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Academic Year <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      required 
                      value={formData.academicYear} 
                      onChange={e => setFormData({...formData, academicYear: e.target.value})} 
                      placeholder="e.g. 2024"
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Department / Category <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    required 
                    value={formData.department} 
                    onChange={e => setFormData({...formData, department: e.target.value})} 
                    placeholder="e.g. UG, PG, Anatomy"
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-xs text-slate-500 mt-1">This groups files together (e.g. all 'UG' lists).</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
                  <textarea 
                    value={formData.description} 
                    onChange={e => setFormData({...formData, description: e.target.value})} 
                    placeholder="Optional details about this list..."
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none min-h-[80px]"
                  />
                </div>

                <div 
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'} ${formData._id && !selectedFile ? 'border-slate-200' : ''}`}
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={e => {
                      if(e.target.files && e.target.files[0]) setSelectedFile(e.target.files[0]);
                    }} 
                    accept=".pdf,.xls,.xlsx,.csv,.doc,.docx"
                  />
                  
                  {selectedFile ? (
                    <div className="flex flex-col items-center">
                      <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full mb-3 shadow-sm border border-emerald-200">
                        <CheckCircle2 className="h-8 w-8" />
                      </div>
                      <p className="font-semibold text-slate-800">{selectedFile.name}</p>
                      <p className="text-xs text-slate-500 mt-1">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      <button type="button" onClick={(e) => { e.stopPropagation(); setSelectedFile(null); fileInputRef.current.value=''; }} className="mt-4 text-sm text-red-500 hover:text-red-700 font-medium">Clear Selection</button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="bg-white text-indigo-500 p-3 rounded-full mb-3 shadow-sm border border-indigo-100">
                        <UploadCloud className="h-8 w-8" />
                      </div>
                      <p className="font-semibold text-slate-700 text-lg">Click to upload or drag & drop</p>
                      <p className="text-sm text-slate-500 mt-1">PDF, Excel (XLSX, CSV), Word (DOCX) up to 10MB</p>
                      {formData._id && <div className="mt-4 inline-block px-3 py-1 bg-amber-50 text-amber-700 text-xs rounded border border-amber-200">Optional: Overwrite existing file</div>}
                    </div>
                  )}
                </div>

              </form>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 mt-auto">
               <button 
                 type="button" 
                 onClick={() => setShowFormModal(false)}
                 className="px-5 py-2.5 rounded-lg text-slate-600 hover:bg-slate-200 font-medium transition"
               >
                 Cancel
               </button>
               <button 
                 type="submit" 
                 form="upload-form"
                 className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow transition"
               >
                 {formData._id ? 'Update List' : 'Upload List'}
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
           <div className="bg-white rounded-xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
             <div className="p-6 text-center">
               <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
                 <AlertCircle className="h-8 w-8" />
               </div>
               <h2 className="text-xl font-bold text-slate-800 mb-2">Delete Student List?</h2>
               <p className="text-slate-500 mb-6 font-medium">
                 Are you sure you want to delete <span className="text-slate-800">"{formData.title}"</span>? This will permanently delete the file from the server. This action cannot be undone.
               </p>
               <div className="flex gap-3 justify-center">
                 <button onClick={() => setShowDeleteModal(false)} className="px-5 py-2 rounded shadow-sm border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium transition flex-1">
                   Keep File
                 </button>
                 <button onClick={confirmDelete} className="px-5 py-2 rounded shadow-sm bg-red-600 hover:bg-red-700 text-white font-medium transition flex-1">
                   Delete Permanently
                 </button>
               </div>
             </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default ManageStudentListUploads;
