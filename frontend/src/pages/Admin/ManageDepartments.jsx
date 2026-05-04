import React, { useState, useEffect, useRef } from 'react';
import { Pencil, Trash2, Plus, Search, Image as ImageIcon } from 'lucide-react';

const ManageDepartments = () => {
  const [departmentList, setDepartmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  // Pagination & Search states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const initialFormState = { 
    _id: '', 
    name: '', 
    mainCategory: 'Pre-Clinical', 
    slug: '', 
    description: '', 
    tagline: '', 
    introduction: '', 
    faculty: [], 
    activities: [], 
    order: 0, 
    isActive: true 
  };
  const [currentDept, setCurrentDept] = useState(initialFormState);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const token = localStorage.getItem('adminToken');

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      let url = `http://localhost:5000/api/departments?page=${page}&limit=10`;
      if (search) url += `&search=${search}`;
      if (categoryFilter) url += `&mainCategory=${categoryFilter}`;
      
      const res = await fetch(url);
      const data = await res.json();
      setDepartmentList(data.departments || []);
      setTotalPages(data.pagination?.pages || 1);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [page, search, categoryFilter]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this Department?')) {
      try {
        await fetch(`http://localhost:5000/api/departments/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchDepartments();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const isEditing = !!currentDept._id;
    const url = isEditing 
      ? `http://localhost:5000/api/departments/${currentDept._id}` 
      : 'http://localhost:5000/api/departments';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const formData = new FormData();
      formData.append('name', currentDept.name);
      formData.append('mainCategory', currentDept.mainCategory);
      formData.append('slug', currentDept.slug);
      formData.append('description', currentDept.description);
      formData.append('tagline', currentDept.tagline);
      formData.append('introduction', currentDept.introduction);
      formData.append('order', currentDept.order);
      formData.append('isActive', currentDept.isActive);
      
      formData.append('faculty', JSON.stringify(currentDept.faculty));
      formData.append('activities', JSON.stringify(currentDept.activities));

      if (selectedFile) {
        formData.append('image', selectedFile);
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
      setCurrentDept(initialFormState);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      fetchDepartments();
    } catch (err) {
      console.error(err);
    }
  };

  const openEditModal = async (dept) => {
    // Fetch full details including arrays from admin endpoint
    try {
      const res = await fetch(`http://localhost:5000/api/departments/admin/${dept._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const fullDept = await res.json();
        setCurrentDept(fullDept);
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        setShowModal(true);
      }
    } catch (err) {
      console.error("Failed to fetch full department details", err);
    }
  };

  const openAddModal = () => {
    setCurrentDept(initialFormState);
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setShowModal(true);
  };

  // --- Dynamic Form Handlers ---
  const handleFacultyChange = (index, field, value) => {
    const updated = [...currentDept.faculty];
    updated[index][field] = value;
    setCurrentDept({ ...currentDept, faculty: updated });
  };
  const addFaculty = () => setCurrentDept({ ...currentDept, faculty: [...currentDept.faculty, { name: '', role: '', qualification: '' }] });
  const removeFaculty = (index) => setCurrentDept({ ...currentDept, faculty: currentDept.faculty.filter((_, i) => i !== index) });

  const handleActivityChange = (index, field, value) => {
    const updated = [...currentDept.activities];
    updated[index][field] = value;
    setCurrentDept({ ...currentDept, activities: updated });
  };
  const addActivity = () => setCurrentDept({ ...currentDept, activities: [...currentDept.activities, { title: '', description: '' }] });
  const removeActivity = (index) => setCurrentDept({ ...currentDept, activities: currentDept.activities.filter((_, i) => i !== index) });


  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Manage Departments</h1>
        <button 
          onClick={openAddModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded flex items-center gap-2 transition"
        >
          <Plus className="h-4 w-4" /> Add Department
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded shadow mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex items-center w-full md:w-1/2 relative">
          <Search className="absolute left-3 text-gray-400 h-5 w-5" />
          <input 
            type="text" 
            placeholder="Search departments..." 
            className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <div className="w-full md:w-1/4">
          <select 
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
          >
            <option value="">All Categories</option>
            <option value="Pre-Clinical">Pre-Clinical</option>
            <option value="Para-Clinical">Para-Clinical</option>
            <option value="Clinical">Clinical</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan="5" className="text-center py-10">Loading...</td></tr>
            ) : departmentList.map(dept => (
              <tr key={dept._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {dept.image ? (
                    <img src={`http://localhost:5000/uploads/departments/${dept.image}`} alt={dept.name} className="h-10 w-10 object-cover rounded shadow-sm" />
                  ) : (
                    <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                      <ImageIcon size={20} />
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{dept.name}</div>
                  <div className="text-xs text-gray-500">/department/{dept.slug}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {dept.mainCategory}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${dept.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {dept.isActive ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => openEditModal(dept)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleDelete(dept._id)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
            {!loading && departmentList.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-gray-500">No departments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-1 rounded ${page === p ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border'}`}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">{currentDept._id ? 'Edit Department' : 'Add New Department'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl leading-none">&times;</button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="deptForm" onSubmit={handleSave}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department Name *</label>
                    <input type="text" value={currentDept.name} onChange={e => setCurrentDept({...currentDept, name: e.target.value})} className="w-full border rounded-lg px-3 py-2" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug *</label>
                    <input type="text" value={currentDept.slug} onChange={e => setCurrentDept({...currentDept, slug: e.target.value})} className="w-full border rounded-lg px-3 py-2" required placeholder="e.g. anatomy" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Main Category *</label>
                    <select value={currentDept.mainCategory} onChange={e => setCurrentDept({...currentDept, mainCategory: e.target.value})} className="w-full border rounded-lg px-3 py-2" required>
                      <option value="Pre-Clinical">Pre-Clinical</option>
                      <option value="Para-Clinical">Para-Clinical</option>
                      <option value="Clinical">Clinical</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <div className="flex items-center mt-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={currentDept.isActive} onChange={e => setCurrentDept({...currentDept, isActive: e.target.checked})} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-700">{currentDept.isActive ? 'Active (Visible)' : 'Disabled (Hidden)'}</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Banner Image</label>
                  <input type="file" ref={fileInputRef} onChange={e => setSelectedFile(e.target.files[0])} accept="image/*" className="w-full border rounded-lg px-3 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                  {currentDept.image && !selectedFile && (
                    <p className="text-xs text-gray-500 mt-2">Current Image: {currentDept.image}</p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Short Description (For listing cards)</label>
                  <textarea value={currentDept.description} onChange={e => setCurrentDept({...currentDept, description: e.target.value})} className="w-full border rounded-lg px-3 py-2 h-20" placeholder="A brief summary..."></textarea>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profile Tagline</label>
                  <input type="text" value={currentDept.tagline} onChange={e => setCurrentDept({...currentDept, tagline: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="e.g. Foundation of Medical Education" />
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Introduction</label>
                  <textarea value={currentDept.introduction} onChange={e => setCurrentDept({...currentDept, introduction: e.target.value})} className="w-full border rounded-lg px-3 py-2 h-32" placeholder="Full description for the department profile page..."></textarea>
                </div>

                {/* Faculty Section */}
                <div className="mb-8 bg-gray-50 p-4 rounded-xl border">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Teaching Faculty</h3>
                    <button type="button" onClick={addFaculty} className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded hover:bg-indigo-200">+ Add Faculty</button>
                  </div>
                  {currentDept.faculty.map((member, index) => (
                    <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 bg-white p-3 rounded shadow-sm border relative group">
                      <button type="button" onClick={() => removeFaculty(index)} className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"><Trash2 size={14}/></button>
                      <input type="text" placeholder="Name (e.g. Dr. John Doe)" value={member.name} onChange={e => handleFacultyChange(index, 'name', e.target.value)} className="border rounded px-2 py-1 text-sm" />
                      <input type="text" placeholder="Role (e.g. Professor & HOD)" value={member.role} onChange={e => handleFacultyChange(index, 'role', e.target.value)} className="border rounded px-2 py-1 text-sm" />
                      <input type="text" placeholder="Qualification (e.g. MBBS, MD)" value={member.qualification} onChange={e => handleFacultyChange(index, 'qualification', e.target.value)} className="border rounded px-2 py-1 text-sm" />
                    </div>
                  ))}
                  {currentDept.faculty.length === 0 && <p className="text-sm text-gray-500 text-center py-2">No faculty members added yet.</p>}
                </div>

                {/* Activities Section */}
                <div className="mb-4 bg-gray-50 p-4 rounded-xl border">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Department Activities</h3>
                    <button type="button" onClick={addActivity} className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded hover:bg-indigo-200">+ Add Activity</button>
                  </div>
                  {currentDept.activities.map((activity, index) => (
                    <div key={index} className="mb-4 bg-white p-3 rounded shadow-sm border relative group">
                      <button type="button" onClick={() => removeActivity(index)} className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"><Trash2 size={14}/></button>
                      <input type="text" placeholder="Activity Title" value={activity.title} onChange={e => handleActivityChange(index, 'title', e.target.value)} className="border rounded px-2 py-1 text-sm w-full mb-2 font-medium" />
                      <textarea placeholder="Description" value={activity.description} onChange={e => handleActivityChange(index, 'description', e.target.value)} className="border rounded px-2 py-1 text-sm w-full h-16"></textarea>
                    </div>
                  ))}
                  {currentDept.activities.length === 0 && <p className="text-sm text-gray-500 text-center py-2">No activities added yet.</p>}
                </div>

              </form>
            </div>

            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100">Cancel</button>
              <button type="submit" form="deptForm" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow font-medium">Save Department</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDepartments;
