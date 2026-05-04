import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Pencil, ArrowLeft, X } from 'lucide-react';

const ManageStudentLists = ({ admissionId, onClose }) => {
  const [admission, setAdmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  const initialFormState = {
    _id: '',
    category: 'UG',
    year: '',
    title: '',
    fileUrl: '',
    students: []
  };
  
  const [currentList, setCurrentList] = useState(initialFormState);

  const fetchAdmissionData = async () => {
    try {
      setLoading(true);
      // Fetch the specific admission to get its studentLists
      const res = await fetch(`http://localhost:5000/api/admissions`);
      const allAds = await res.json();
      const targetAd = allAds.find(ad => ad._id === admissionId);
      setAdmission(targetAd);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (admissionId) {
      fetchAdmissionData();
    }
  }, [admissionId]);

  const handleDelete = async (listId) => {
    if (window.confirm('Are you sure you want to delete this student list?')) {
      try {
        const res = await fetch(`http://localhost:5000/api/admissions/student-list/${listId}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          fetchAdmissionData();
        } else {
          alert('Failed to delete student list.');
        }
      } catch (err) {
         console.error(err);
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const isEditing = !!currentList._id;
    
    try {
      if (isEditing) {
        const res = await fetch(`http://localhost:5000/api/admissions/student-list/${currentList._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentList)
        });
        if (!res.ok) throw new Error('Failed to update');
      } else {
        const payload = { ...currentList, admissionId };
        const res = await fetch(`http://localhost:5000/api/admissions/student-list`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Failed to create');
      }
      setShowForm(false);
      setCurrentList(initialFormState);
      fetchAdmissionData();
    } catch (err) {
      alert(err.message);
    }
  };

  const openEditForm = (list) => {
    setCurrentList(list);
    setShowForm(true);
  };

  const openAddForm = () => {
    setCurrentList(initialFormState);
    setShowForm(true);
  };

  const handleAddStudent = () => {
    setCurrentList({
      ...currentList,
      students: [...currentList.students, { name: '', registerNo: '', course: '', specialty: '' }]
    });
  };

  const updateStudent = (index, field, value) => {
    const updatedStudents = [...currentList.students];
    updatedStudents[index][field] = value;
    setCurrentList({ ...currentList, students: updatedStudents });
  };

  const removeStudent = (index) => {
    const updatedStudents = currentList.students.filter((_, i) => i !== index);
    setCurrentList({ ...currentList, students: updatedStudents });
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading student lists...</div>;
  if (!admission) return <div className="p-8 text-center text-red-500">Admission program not found.</div>;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 lg:p-8 z-[60] overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl my-auto animate-in fade-in zoom-in-95 duration-200 h-[90vh] overflow-y-auto flex flex-col">
        <div className="sticky top-0 z-10 bg-white flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Manage Student Lists</h2>
            <p className="text-sm text-slate-500 mt-1">Program: <span className="font-semibold text-indigo-600">{admission.title}</span></p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 flex-grow bg-slate-50">
          {!showForm ? (
            <div className="bg-white rounded shadow border border-slate-200 overflow-hidden">
               <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                  <h3 className="font-semibold text-slate-700">Existing Lists</h3>
                  <button onClick={openAddForm} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow text-sm flex items-center gap-2 transition">
                    <Plus className="h-4 w-4" /> Add List
                  </button>
               </div>
               {admission.studentLists?.length > 0 ? (
                 <table className="min-w-full divide-y divide-gray-200">
                   <thead className="bg-slate-50">
                     <tr>
                       <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Category</th>
                       <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Year</th>
                       <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Title</th>
                       <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Data/File</th>
                       <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="bg-white divide-y divide-gray-200">
                     {admission.studentLists.map(list => (
                       <tr key={list._id} className="hover:bg-slate-50">
                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800">{list.category}</td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{list.year}</td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{list.title}</td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                           {list.fileUrl ? (
                             <a href={list.fileUrl} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">View File</a>
                           ) : (
                             <span>{list.students?.length || 0} Students</span>
                           )}
                         </td>
                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                           <button onClick={() => openEditForm(list)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                             <Pencil className="h-4 w-4" />
                           </button>
                           <button onClick={() => handleDelete(list._id)} className="text-red-500 hover:text-red-700">
                             <Trash2 className="h-4 w-4" />
                           </button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               ) : (
                 <div className="p-8 text-center text-slate-500">No student lists found for this program.</div>
               )}
            </div>
          ) : (
            <form onSubmit={handleSave} className="bg-white p-6 rounded shadow border border-slate-200">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-bold text-slate-800 border-l-4 border-indigo-600 pl-3">
                   {currentList._id ? 'Edit Student List' : 'Add New Student List'}
                 </h3>
                 <button type="button" onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-sm bg-slate-100 px-3 py-1.5 rounded">
                   <ArrowLeft className="h-4 w-4" /> Back to Lists
                 </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                 <div>
                   <label className="block text-sm font-semibold text-slate-700 mb-1.5">Category</label>
                   <select 
                     value={currentList.category}
                     onChange={e => setCurrentList({...currentList, category: e.target.value})}
                     className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                     required
                   >
                     <option value="UG">UG (MBBS)</option>
                     <option value="PG">PG/MS (MD/MS)</option>
                     <option value="SUPER_SPECIALITY">Super Speciality</option>
                   </select>
                 </div>
                 <div>
                   <label className="block text-sm font-semibold text-slate-700 mb-1.5">Year</label>
                   <input 
                     type="text" 
                     placeholder="e.g. U2024"
                     value={currentList.year}
                     onChange={e => setCurrentList({...currentList, year: e.target.value})}
                     className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                     required
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-semibold text-slate-700 mb-1.5">Title</label>
                   <input 
                     type="text" 
                     placeholder="e.g. 2024 Batch Admitted Students"
                     value={currentList.title}
                     onChange={e => setCurrentList({...currentList, title: e.target.value})}
                     className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                     required
                   />
                 </div>
               </div>

               <div className="mb-8 hidden">
                 {/* Optional: Add manual student list vs file upload toggle here */}
               </div>

               <div className="mb-8">
                 <label className="block text-sm font-semibold text-slate-700 mb-1.5 border-t border-slate-100 pt-6">Option 1: Upload File Link (PDF/Excel)</label>
                 <p className="text-xs text-slate-500 mb-2">If you provide a valid URL here, it will be prioritized over the manual table data below.</p>
                 <input 
                   type="url" 
                   placeholder="https://example.com/students-2024.pdf"
                   value={currentList.fileUrl || ''}
                   onChange={e => setCurrentList({...currentList, fileUrl: e.target.value})}
                   className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                 />
               </div>

               <div className="mb-6 pt-6 border-t border-slate-100 mt-4">
                 <div className="flex justify-between items-center mb-4">
                   <div>
                     <label className="block text-sm font-semibold text-slate-700">Option 2: Add Students Manually</label>
                     <p className="text-xs text-slate-500 mt-1">Leave file link empty above to use this table data.</p>
                   </div>
                   <button 
                     type="button" 
                     onClick={handleAddStudent}
                     className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded text-sm flex items-center gap-1 font-medium transition"
                   >
                     <Plus className="h-4 w-4" /> Add Row
                   </button>
                 </div>
                 
                 {currentList.students.length > 0 ? (
                   <div className="border border-slate-200 rounded-lg overflow-hidden">
                     <table className="min-w-full divide-y divide-gray-200">
                       <thead className="bg-slate-50">
                         <tr>
                           <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Name</th>
                           <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Reg No</th>
                           <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Course</th>
                           <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Specialty</th>
                           <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 w-16">Remove</th>
                         </tr>
                       </thead>
                       <tbody className="bg-white divide-y divide-slate-100">
                         {currentList.students.map((student, idx) => (
                           <tr key={idx}>
                             <td className="px-3 py-2">
                               <input type="text" value={student.name} onChange={e => updateStudent(idx, 'name', e.target.value)} className="w-full border border-slate-200 rounded px-2 py-1.5 text-sm" placeholder="Student Name" />
                             </td>
                             <td className="px-3 py-2">
                               <input type="text" value={student.registerNo} onChange={e => updateStudent(idx, 'registerNo', e.target.value)} className="w-full border border-slate-200 rounded px-2 py-1.5 text-sm" placeholder="Register No" />
                             </td>
                             <td className="px-3 py-2">
                               <input type="text" value={student.course} onChange={e => updateStudent(idx, 'course', e.target.value)} className="w-full border border-slate-200 rounded px-2 py-1.5 text-sm" placeholder="Course" />
                             </td>
                             <td className="px-3 py-2">
                               <input type="text" value={student.specialty} onChange={e => updateStudent(idx, 'specialty', e.target.value)} className="w-full border border-slate-200 rounded px-2 py-1.5 text-sm" placeholder="Specialty" />
                             </td>
                             <td className="px-3 py-2 text-center">
                               <button type="button" onClick={() => removeStudent(idx)} className="text-slate-400 hover:text-red-500 transition-colors">
                                 <Trash2 className="h-4 w-4 mx-auto" />
                               </button>
                             </td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   </div>
                 ) : (
                   <div className="bg-slate-50 border border-slate-200 border-dashed rounded-lg p-6 text-center">
                     <p className="text-sm text-slate-500 mb-3">No manual students added to this list.</p>
                     <button type="button" onClick={handleAddStudent} className="mx-auto bg-white border border-slate-300 shadow-sm text-slate-700 hover:bg-slate-50 px-4 py-2 rounded text-sm flex items-center gap-2 transition">
                       <Plus className="h-4 w-4" /> Start Adding Students
                     </button>
                   </div>
                 )}
               </div>

               <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                 <button type="submit" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-md transition-all">
                   Save Student List
                 </button>
               </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageStudentLists;
