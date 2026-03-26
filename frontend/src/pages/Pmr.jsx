import React, { useState } from "react";
import TeachingFaulty from "../components/TeachingFaulty";

// Replace with actual image if available
import pmrImg from "../img/pmr.webp";

const pmrFaculty = [
  {
    id: 1,
    name: "Dr. Stephen George",
    role: "Professor & HOD",
    empId: "EMP1701",
    nmc: "NMC1701",
    qualification: "MBBS, MD (PMR)",
    phone: "9876543210",
    email: "pmr1@bcmch.edu.in",
    image: pmrImg,
  },
  {
    id: 2,
    name: "Dr. Anitha Raj",
    role: "Associate Professor",
    empId: "EMP1702",
    nmc: "NMC1702",
    qualification: "MBBS, MD",
    phone: "9876543211",
    email: "pmr2@bcmch.edu.in",
    image: null,
  },
  {
    id: 3,
    name: "Dr. Kevin Thomas",
    role: "Assistant Professor",
  },
  {
    id: 4,
    name: "Dr. Nisha Joseph",
    role: "Assistant Professor",
  },
  {
    id: 5,
    name: "Dr. Riya Mathew",
    role: "Senior Resident",
  },
  {
    id: 6,
    name: "Dr. Arun Paul",
    role: "Tutor",
  },
  {
    id: 7,
    name: "Ms. Sini Thomas",
    role: "Physiotherapist",
  },
  {
    id: 8,
    name: "Mr. Rahul Das",
    role: "Occupational Therapist",
  },
];

const PMR = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [showActivities, setShowActivities] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#b71a22] to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            PMR (Physical Medicine & Rehabilitation)
          </h1>
          <p className="text-lg opacity-90">
            Department of Rehabilitation & Functional Recovery
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
            The Department of PMR focuses on restoring functional ability and improving
            quality of life in patients with physical disabilities.
          </p>

          {showIntro && (
            <p className="text-gray-700 leading-relaxed text-lg mt-4">
              It provides rehabilitation services for stroke patients, spinal injuries,
              musculoskeletal disorders, and chronic pain conditions.
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
        <TeachingFaulty faculty={pmrFaculty} />

        {/* DEPARTMENT ACTIVITIES */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-[#b71a22] mb-6">
            Department Activities
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Rehabilitation & Therapy Training
          </h3>

          <p className="text-gray-700 leading-relaxed text-lg">
            Students are trained in rehabilitation techniques and patient recovery programs.
          </p>

          {showActivities && (
            <div className="text-gray-700 leading-relaxed text-lg space-y-4 mt-4">
              <p>Physiotherapy and occupational therapy sessions.</p>
              <p>Stroke and spinal injury rehabilitation programs.</p>
              <p>Prosthetics and orthotics training exposure.</p>
              <p>Pain management and disability assessment clinics.</p>
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

export default PMR;
