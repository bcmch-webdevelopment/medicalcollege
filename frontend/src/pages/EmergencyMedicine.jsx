import React, { useState } from "react";
import TeachingFaulty from "../components/TeachingFaulty";

// Replace with actual image if available
import emergencyImg from "../img/emergencymedicine.webp";

const emergencyFaculty = [
  {
    id: 1,
    name: "Dr. Santhosh Kumar",
    role: "Professor & HOD",
    empId: "EMP1301",
    nmc: "NMC1301",
    qualification: "MBBS, MD (Emergency Medicine)",
    phone: "9876543210",
    email: "emergency1@bcmch.edu.in",
    image: emergencyImg,
  },
  {
    id: 2,
    name: "Dr. Reena Mathew",
    role: "Associate Professor",
    empId: "EMP1302",
    nmc: "NMC1302",
    qualification: "MBBS, MD",
    phone: "9876543211",
    email: "emergency2@bcmch.edu.in",
    image: null,
  },
  {
    id: 3,
    name: "Dr. Arun Joseph",
    role: "Assistant Professor",
  },
  {
    id: 4,
    name: "Dr. Nisha Paul",
    role: "Assistant Professor",
  },
  {
    id: 5,
    name: "Dr. Kevin Thomas",
    role: "Senior Resident",
  },
  {
    id: 6,
    name: "Dr. Alina George",
    role: "Senior Resident",
  },
  {
    id: 7,
    name: "Dr. Rony K",
    role: "Tutor",
  },
  {
    id: 8,
    name: "Dr. Sona Mathew",
    role: "Tutor",
  },
];

const EmergencyMedicine = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [showActivities, setShowActivities] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#b71a22] to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            Emergency Medicine
          </h1>
          <p className="text-lg opacity-90">
            Department of Acute & Critical Care Services
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
            The Department of Emergency Medicine provides immediate medical care
            for critically ill and injured patients.
          </p>

          {showIntro && (
            <p className="text-gray-700 leading-relaxed text-lg mt-4">
              It handles trauma cases, cardiac emergencies, stroke management,
              and life-threatening conditions with rapid response systems.
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
        <TeachingFaulty faculty={emergencyFaculty} />

        {/* DEPARTMENT ACTIVITIES */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-[#b71a22] mb-6">
            Department Activities
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Trauma & Critical Care Training
          </h3>

          <p className="text-gray-700 leading-relaxed text-lg">
            Students are trained in emergency response protocols and critical care management.
          </p>

          {showActivities && (
            <div className="text-gray-700 leading-relaxed text-lg space-y-4 mt-4">
              <p>Basic and advanced life support (BLS & ACLS) training.</p>
              <p>Trauma management and emergency surgical procedures.</p>
              <p>Rapid triage and patient stabilization techniques.</p>
              <p>Disaster management and mass casualty handling drills.</p>
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

export default EmergencyMedicine;