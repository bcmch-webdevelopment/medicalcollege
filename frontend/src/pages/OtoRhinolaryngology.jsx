import React, { useState } from "react";
import TeachingFaulty from "../components/TeachingFaulty";

// Replace with actual image if available
import entImg from "../img/ent.jpg";

const entFaculty = [
  {
    id: 1,
    name: "Dr. George Mathew",
    role: "Professor & HOD",
    empId: "EMP1501",
    nmc: "NMC1501",
    qualification: "MBBS, MS (ENT)",
    phone: "9876543210",
    email: "ent1@bcmch.edu.in",
    image: entImg,
  },
  {
    id: 2,
    name: "Dr. Anita Joseph",
    role: "Associate Professor",
    empId: "EMP1502",
    nmc: "NMC1502",
    qualification: "MBBS, MS",
    phone: "9876543211",
    email: "ent2@bcmch.edu.in",
    image: null,
  },
  {
    id: 3,
    name: "Dr. Binu Thomas",
    role: "Assistant Professor",
  },
  {
    id: 4,
    name: "Dr. Leya Varghese",
    role: "Assistant Professor",
  },
  {
    id: 5,
    name: "Dr. Kevin George",
    role: "Senior Resident",
  },
  {
    id: 6,
    name: "Dr. Nisha S",
    role: "Tutor",
  },
  {
    id: 7,
    name: "Mr. Rahul Das",
    role: "Audiologist",
  },
  {
    id: 8,
    name: "Ms. Sini Mathew",
    role: "Speech Therapist",
  },
];

const OtoRhinolaryngology = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [showActivities, setShowActivities] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#b71a22] to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            Oto-Rhino-Laryngology (ENT)
          </h1>
          <p className="text-lg opacity-90">
            Department of Ear, Nose & Throat Care
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
            The Department of ENT focuses on disorders related to the ear, nose,
            throat, and head & neck region.
          </p>

          {showIntro && (
            <p className="text-gray-700 leading-relaxed text-lg mt-4">
              It provides advanced care in hearing disorders, sinus diseases,
              voice problems, and head & neck surgeries.
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
        <TeachingFaulty faculty={entFaculty} />

        {/* DEPARTMENT ACTIVITIES */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-[#b71a22] mb-6">
            Department Activities
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Clinical ENT Training & Procedures
          </h3>

          <p className="text-gray-700 leading-relaxed text-lg">
            Students are trained in diagnosing and managing ENT-related conditions.
          </p>

          {showActivities && (
            <div className="text-gray-700 leading-relaxed text-lg space-y-4 mt-4">
              <p>Ear examination and hearing assessment techniques.</p>
              <p>Nasal endoscopy and sinus disease management.</p>
              <p>Throat examination and voice disorder evaluation.</p>
              <p>Minor ENT surgical procedures and emergency care.</p>
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

export default OtoRhinolaryngology;