import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const DynamicAcademic = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Treat the location.pathname as the slug/path identifier
    const pathSlug = location.pathname;
    
    // Convert e.g., '/attendance/ug' to 'attendance-ug' or just use the full path.
    // The backend can use the encodeURIComponent if using path, but it's simpler to replace '/' with '-' locally.
    const encodedPath = encodeURIComponent(pathSlug);

    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/academic/slug/${encodedPath}`);
        if (!res.ok) throw new Error('Not found');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Fetch error:', err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Content Not Set</h1>
        <p className="text-gray-600 mb-6">The academic section for this route has not been dynamically configured by the admin yet.</p>
        <button onClick={() => navigate(-1)} className="text-red-700 font-semibold hover:underline flex items-center justify-center gap-2 mx-auto">
           <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 font-sans">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content Header */}
        <div className="bg-white rounded-xl shadow-md p-8 md:p-10 mb-8 border-t-[6px] border-red-700 transform transition hover:shadow-lg">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 mb-6 tracking-tight relative pb-4 
            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-20 after:h-1 after:bg-red-600">
            {data.title}
          </h1>
          {data.content && (
            <div className="prose max-w-none text-slate-600 leading-relaxed text-lg whitespace-pre-line font-medium">
              {data.content}
            </div>
          )}
          
          {data.images && data.images.length > 0 && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.images.map((img, i) => (
                <img 
                  key={i} 
                  src={`http://localhost:5000${img}`} 
                  alt="Academic" 
                  className="w-full h-64 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300" 
                />
              ))}
            </div>
          )}
        </div>

        {/* Dynamic Sublists */}
        {data.sublists && data.sublists.length > 0 && (
          <div className="space-y-6">
            {data.sublists.map((sub, index) => (
              <div key={index} className="bg-white rounded-xl shadow p-6 md:p-8 hover:shadow-md transition duration-300 border border-gray-100">
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 flex items-start gap-3">
                  <span className="bg-red-50 text-red-700 border border-red-100 w-10 h-10 flex shrink-0 justify-center items-center rounded-lg shadow-sm text-lg font-bold mt-[-4px]">
                    {index + 1}
                  </span>
                  {sub.heading}
                </h3>
                <div className="text-slate-600 leading-relaxed whitespace-pre-line ml-0 md:ml-12 text-[1.05rem]">
                  {sub.text}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default DynamicAcademic;
