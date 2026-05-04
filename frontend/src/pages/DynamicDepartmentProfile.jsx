import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import TeachingFaulty from '../components/TeachingFaulty';
import { ArrowLeft } from 'lucide-react';

const DynamicDepartmentProfile = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [showActivities, setShowActivities] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/departments/slug/${slug}`);
        if (!res.ok) throw new Error('Not found');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f8f9fa]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#b71a22]"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-32 text-center flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Department Not Found</h1>
        <p className="text-gray-500 mb-8 max-w-md">We couldn't track down the department you are looking for. It might have been moved, removed, or is currently disabled.</p>
        <Link to="/departments" className="inline-flex items-center gap-2 bg-[#b71a22] hover:bg-red-800 text-white px-6 py-3 rounded-full font-semibold transition-all shadow hover:shadow-lg">
           <ArrowLeft className="w-5 h-5" /> Back to Departments
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#b71a22] to-red-700 text-white py-16 relative overflow-hidden">
        {/* Background Image if available */}
        {data.image && (
           <div className="absolute inset-0 opacity-20">
              <img src={`http://localhost:5000/uploads/departments/${data.image}`} alt={data.name} className="w-full h-full object-cover" />
           </div>
        )}
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">{data.name}</h1>
          <p className="text-lg opacity-90">{data.tagline || `Welcome to the Department of ${data.name}`}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4">
        {/* INTRODUCTION */}
        {data.introduction && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-12">
            <h2 className="text-3xl font-bold text-[#b71a22] mb-4">Introduction</h2>
            <div className={`text-gray-700 leading-relaxed text-lg whitespace-pre-line ${!showIntro && 'line-clamp-4'}`}>
              {data.introduction}
            </div>
            
            {data.introduction.length > 250 && (
              <button
                onClick={() => setShowIntro(!showIntro)}
                className="mt-4 text-[#b71a22] font-semibold hover:underline"
              >
                {showIntro ? "Read Less ↑" : "Read More →"}
              </button>
            )}
          </div>
        )}

        {/* TEACHING FACULTY */}
        {data.faculty && data.faculty.length > 0 && (
          <TeachingFaulty faculty={data.faculty} />
        )}

        {/* DEPARTMENT ACTIVITIES */}
        {data.activities && data.activities.length > 0 && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-12">
            <h2 className="text-3xl font-bold text-[#b71a22] mb-6">Department Activities</h2>
            
            <div className={`space-y-6 ${!showActivities && 'max-h-[400px] overflow-hidden relative'}`}>
              {data.activities.map((activity, index) => (
                <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                    {activity.description}
                  </p>
                </div>
              ))}
              
              {!showActivities && data.activities.length > 2 && (
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
              )}
            </div>

            {data.activities.length > 2 && (
              <button
                onClick={() => setShowActivities(!showActivities)}
                className="mt-6 text-[#b71a22] font-semibold hover:underline"
              >
                {showActivities ? "View Less ↑" : "View All Activities →"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicDepartmentProfile;
