import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionBlock from './SectionBlock';
import { Download, Users } from 'lucide-react';

const AdmissionDetails = ({ title, overview, eligibility, process, studentLists = [] }) => {
  // Get unique categories from the student lists dynamically based on department
  const availableCategories = [...new Set(studentLists.map(list => list.department))].filter(Boolean);
  
  const [activeCategory, setActiveCategory] = useState(availableCategories.length > 0 ? availableCategories[0] : '');
  
  // Set default active category
  React.useEffect(() => {
    if (availableCategories.length > 0 && !availableCategories.includes(activeCategory)) {
      setActiveCategory(availableCategories[0]);
    }
  }, [studentLists]);

  const [activeYear, setActiveYear] = useState('');

  const listsForCategory = studentLists.filter(list => list.department === activeCategory);
  
  // Default select the first year when switching category
  React.useEffect(() => {
    if (listsForCategory.length > 0) {
      if (!listsForCategory.some(l => l.academicYear === activeYear)) {
        setActiveYear(listsForCategory[0].academicYear);
      }
    } else {
      setActiveYear('');
    }
  }, [activeCategory, listsForCategory]);

  const currentList = listsForCategory.find(l => l.academicYear === activeYear);

  return (
    <main className="flex-grow bg-[#f8f9fa] font-sans text-gray-800">
      {/* Banner / Header Title */}
      <section className="bg-red-50 py-16 px-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#b71a22] tracking-wide mb-4 uppercase">
            {title}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Detailed information regarding admission policies, requirements, and procedures for {title}.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 bg-white min-h-[500px]">
        <div className="max-w-5xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100">
          
          {overview && (
            <SectionBlock title="Overview">
              {overview}
            </SectionBlock>
          )}

          {eligibility && (
            <SectionBlock title="Eligibility Criteria">
              {eligibility}
            </SectionBlock>
          )}

          {process && (
            <SectionBlock title="Admission Process">
              {process}
            </SectionBlock>
          )}

          {/* Student Lists Section */}
          {studentLists && studentLists.length > 0 && (
            <SectionBlock title="Student Lists">
              <div className="mt-6 border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                
                {/* Category Tabs */}
                <div className="flex bg-slate-50 border-b border-slate-200">
                  {availableCategories.map(cat => {
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`flex-1 py-4 text-center font-semibold text-sm transition-colors ${
                          activeCategory === cat 
                            ? 'bg-white text-[#b71a22] border-b-2 border-[#b71a22]' 
                            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {cat}
                      </button>
                    )
                  })}
                </div>

                <div className="p-6 bg-white min-h-[300px]">
                  {listsForCategory.length > 0 ? (
                    <>
                      {/* Year Tabs */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {listsForCategory.map(list => (
                          <button
                            key={list._id}
                            onClick={() => setActiveYear(list.academicYear)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              activeYear === list.academicYear
                                ? 'bg-[#b71a22] text-white shadow-md transform scale-105'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {list.academicYear}
                          </button>
                        ))}
                      </div>

                      {/* Content Area */}
                      {currentList && (
                        <div className="animate-in fade-in duration-300">
                          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Users className="h-5 w-5 text-[#b71a22]" /> 
                            {currentList.title}
                          </h3>

                          {currentList.fileUrl ? (
                            <div className="bg-slate-50 border border-slate-200 p-8 text-center rounded-xl">
                              <p className="text-slate-600 mb-4">{currentList.description || 'The student list for this category and year is available as a downloadable file.'}</p>
                              <a 
                                href={currentList.fileUrl.startsWith('http') ? currentList.fileUrl : `http://localhost:5000${currentList.fileUrl}`} 
                                target="_blank" 
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 bg-[#b71a22] hover:bg-red-800 text-white font-semibold py-2.5 px-6 rounded-lg shadow transition"
                              >
                                <Download className="h-5 w-5" /> View / Download Document
                              </a>
                            </div>
                          ) : currentList.students && currentList.students.length > 0 ? (
                            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-[#f8f9fa] border-b border-gray-200">
                                  <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Reg No</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Student Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Course</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Specialty</th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {currentList.students.map((student, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-slate-700">{student.registerNo}</td>
                                      <td className="px-6 py-3 whitespace-nowrap text-sm font-semibold text-slate-800">{student.name}</td>
                                      <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-600">{student.course}</td>
                                      <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-600">{student.specialty}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <p className="text-slate-500 italic py-8 text-center bg-slate-50 rounded border border-slate-100">
                              No student data recorded for this selection.
                            </p>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-center text-slate-500 py-10">No lists available for this category.</p>
                  )}
                </div>
              </div>
            </SectionBlock>
          )}
          
          {/* Back button */}
          <div className="mt-12 pt-8 border-t border-gray-100 text-center">
            <Link to="/admissions" className="inline-block bg-[#b71a22] hover:bg-red-800 text-white font-bold py-3 px-8 rounded shadow-md transition transform hover:-translate-y-1">
              &larr; Back to Admissions
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdmissionDetails;
