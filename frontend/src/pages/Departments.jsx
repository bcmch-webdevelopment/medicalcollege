import React from "react";
import { useNavigate } from "react-router-dom";

const mainDepartments = [
  { name: "Pre-Clinical", path: "/pre-clinic" },
  { name: "Para-Clinical", path: "/para-clinic" },
  { name: "Clinical", path: "/clinical" },
];

const Department = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9fa]">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#b71a22] to-red-700 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
          Departments
        </h1>
        <p className="text-lg opacity-90">
          Explore departments categorized for easy navigation
        </p>
      </div>

      {/* MAIN CARDS */}
      <div className="max-w-5xl mx-auto py-20 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {mainDepartments.map((dept, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition"
          >
            {/* Title */}
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {dept.name}
            </h2>

            {/* Button */}
            <button
              onClick={() => navigate(dept.path)}
              className="px-5 py-2 bg-[#b71a22] text-white rounded-lg hover:bg-red-700 transition"
            >
              View Details
            </button>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Department;