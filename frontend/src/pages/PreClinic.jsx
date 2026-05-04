import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Image as ImageIcon } from 'lucide-react';

const PreClinic = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/departments?mainCategory=Pre-Clinical&isActive=true');
        if (res.ok) {
          const data = await res.json();
          setDepartments(data.departments || []);
        }
      } catch (error) {
        console.error("Failed to fetch pre-clinical departments", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* -------- Heading -------- */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#b71a22] mb-4">
            Pre-Clinical Departments
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore the foundational medical sciences that build the base for clinical practice.
          </p>
        </div>

        {/* -------- Cards -------- */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b71a22]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {departments.map((dept) => (
              <div
                key={dept._id}
                className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition transform hover:-translate-y-2 group flex flex-col overflow-hidden"
              >

                {/*  Image Section */}
                <div className="w-full h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                  {dept.image ? (
                    <img
                      src={`http://localhost:5000/uploads/departments/${dept.image}`}
                      alt={dept.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <ImageIcon size={48} className="text-gray-300" />
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#b71a22] transition">
                    {dept.name}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-6 flex-grow">
                    {dept.description || 'Information regarding this department will be updated soon.'}
                  </p>

                  {/* Button */}
                  <button
                    onClick={() => navigate(`/department/${dept.slug}`)}
                    className="mt-auto bg-[#b71a22] hover:bg-red-800 text-white font-semibold py-2 px-4 rounded-lg transition"
                  >
                    View Details →
                  </button>

                </div>
              </div>
            ))}
            {departments.length === 0 && (
              <div className="col-span-full text-center py-10 text-gray-500">
                No departments found in this category.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PreClinic;