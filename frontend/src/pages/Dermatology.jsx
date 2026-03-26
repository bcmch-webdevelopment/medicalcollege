import React, { useState } from "react";
import TeachingFaulty from "../components/TeachingFaulty";

// Replace with actual image if available
import dermImg from "../img/dermatologist.jpeg";

const dermatologyFaculty = [
  {
    id: 1,
    name: "Dr. Mary Thomas",
    role: "Professor & HOD",
    empId: "EMP1601",
    nmc: "NMC1601",
    qualification: "MBBS, MD (Dermatology)",
    phone: "9876543210",
    email: "derma1@bcmch.edu.in",
    image: dermImg,
  },
  {
    id: 2,
    name: "Dr. Anitha George",
    role: "Associate Professor",
    empId: "EMP1602",
    nmc: "NMC1602",
    qualification: "MBBS, MD",
    phone: "9876543211",
    email: "derma2@bcmch.edu.in",
    image: null,
  },
  {
    id: 3,
    name: "Dr. Riya Jacob",
    role: "Assistant Professor",
  },
  {
    id: 4,
    name: "Dr. Nisha Paul",
    role: "Assistant Professor",
  },
  {
    id: 5,
    name: "Dr. Kevin Samuel",
    role: "Senior Resident",
  },
  {
    id: 6,
    name: "Dr. Sona Maria",
    role: "Tutor",
  },
  {
    id: 7,
    name: "Ms. Meera John",
    role: "Cosmetologist",
  },
  {
    id: 8,
    name: "Mr. Arun Joseph",
    role: "Dermatology Technician",
  },
];

const Dermatology = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [showActivities, setShowActivities] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#b71a22] to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            Dermatology
          </h1>
          <p className="text-lg opacity-90">
            Department of Skin, Hair & Venereology
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4">
        {/* INTRODUCTION */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-12">
          <h2 className="text-3xl font-bold text-[#b71a22] mb-4">
            Introduction
          </h2>

          <p className="text-gray-700 leading-relaxed text-lg">
            The Department of Dermatology focuses on the diagnosis and treatment
            of skin, hair, and nail disorders.
          </p>

          {showIntro && (
            <p className="text-gray-700 leading-relaxed text-lg mt-4">
              It also manages sexually transmitted infections and provides cosmetic
              dermatology services like laser treatments and skin rejuvenation.
            </p>
          )}

          <button
            onClick={() => setShowIntro(!showIntro)}
            className="mt-4 text-[#b71a22] font-semibold hover:underline"
          >
            {showIntro ? "Read Less ↑" : "Read More →"}
          </button>
        </div>

        {/* TEACHING FACULTY */}
        <TeachingFaulty faculty={dermatologyFaculty} />

        {/* DEPARTMENT ACTIVITIES */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-[#b71a22] mb-6">
            Department Activities
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Clinical Dermatology & Cosmetic Procedures
          </h3>

          <p className="text-gray-700 leading-relaxed text-lg">
            Students are trained in diagnosing and managing various skin conditions.
          </p>

          {showActivities && (
            <div className="text-gray-700 leading-relaxed text-lg space-y-4 mt-4">
              <p>Skin disease diagnosis and treatment planning.</p>
              <p>Dermatosurgery and minor surgical procedures.</p>
              <p>Cosmetic treatments like chemical peels and laser therapy.</p>
              <p>STD clinic and infection control training.</p>
            </div>
          )}

          <button
            onClick={() => setShowActivities(!showActivities)}
            className="mt-4 text-[#b71a22] font-semibold hover:underline"
          >
            {showActivities ? "Read Less ↑" : "Read More →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dermatology;