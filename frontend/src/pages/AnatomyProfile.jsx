import React, { useState } from "react";
import TeachingFaulty from '../components/TeachingFaulty'

const anatomyFaculty = [
  {
    id: 1,
    name: "Dr. Suma Thomas",
    role: "Professor",
    empId: "EMP001",
    nmc: "NMC001",
    qualification: "MBBS, MD",
    phone: "9876543210",
    email: "suma@bcmch.edu.in",
    image: null,
  },
  {
    id: 2,
    name: "Dr. Vijayamma K N",
    role: "Professor",
    empId: "EMP002",
    nmc: "NMC002",
    qualification: "MBBS, MD",
    phone: "9876543211",
    email: "vijayamma@bcmch.edu.in",
    image: null,
  },
  { id: 3, name: "Dr. Meril Ann Soman", role: "Professor" },
  { id: 4, name: "Dr. Shana Baby", role: "Assistant Professor" },
  { id: 5, name: "Dr Arya K", role: "Senior Resident" },
  { id: 6, name: "Dr. Ann Mary Jose", role: "Senior Resident" },
  { id: 7, name: "Ms. Sindhu Thomas", role: "Demonstrator / Tutor" },
  { id: 8, name: "Dr John G Aiyankovil", role: "Tutor" },
  { id: 9, name: "Dr Soniya Johnson", role: "Tutor" },
  { id: 10, name: "Dr Anjusha P", role: "Tutor" },
];

const Anatomy = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [showActivities, setShowActivities] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#b71a22] to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Anatomy</h1>
          <p className="text-lg opacity-90">Department of Anatomy – Foundation of Medical Education</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4">
        {/* INTRODUCTION */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-12">
          <h2 className="text-3xl font-bold text-[#b71a22] mb-4">Introduction</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            The Department of Anatomy serves as the foundational pillar of medical education,
            providing students with a comprehensive understanding of the structure and organization
            of the human body.
          </p>
          {showIntro && (
            <p className="text-gray-700 leading-relaxed text-lg mt-4">
              The department is committed to academic excellence and plays a crucial role in shaping
              the knowledge base of future healthcare professionals.
            </p>
          )}
          <button
            onClick={() => setShowIntro(!showIntro)}
            className="mt-4 text-[#b71a22] font-semibold hover:underline"
          >
            {showIntro ? "Read Less ↑" : "Read More →"}
          </button>
        </div>

        {/* TEACHING FACULTY (Reusable Component) */}
        <TeachingFaulty faculty={anatomyFaculty} />

        {/* DEPARTMENT ACTIVITIES */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-[#b71a22] mb-6">Department Activities</h2>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            ONÓIR – Cadaveric Oath Taking Ceremony (MBBS 2024)
          </h3>
          <p className="text-gray-700 leading-relaxed text-lg">
            ONÓIR, meaning "to honour", marks the transition of students into practical medical learning.
          </p>
          {showActivities && (
            <div className="text-gray-700 leading-relaxed text-lg space-y-4 mt-4">
              <p>
                The cadavers were once living individuals who selflessly donated their bodies for the advancement of medical education.
              </p>
              <p>
                These donors must be treated with dignity and respect, as they serve as both the students’ first patients and their silent teachers.
              </p>
              <p>
                This experience instills ethical values, responsibility, and respect in future doctors.
              </p>
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

export default Anatomy;