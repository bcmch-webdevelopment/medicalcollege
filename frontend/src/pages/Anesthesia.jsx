import React, { useState } from "react";
import TeachingFaulty from "../components/TeachingFaulty";

// Replace with actual images if available
import anesthesiaImg from "../img/anesthesia.jpeg";

const anesthesiaFaculty = [
  {
    id: 1,
    name: "Dr. Anitha R",
    role: "Professor & HOD",
    empId: "EMP1001",
    nmc: "NMC1001",
    qualification: "MBBS, MD (Anaesthesiology)",
    phone: "9876543210",
    email: "anesthesia1@bcmch.edu.in",
    image: anesthesiaImg,
  },
  {
    id: 2,
    name: "Dr. Rakesh Kumar",
    role: "Associate Professor",
    empId: "EMP1002",
    nmc: "NMC1002",
    qualification: "MBBS, MD",
    phone: "9876543211",
    email: "anesthesia2@bcmch.edu.in",
    image: null,
  },
  {
    id: 3,
    name: "Dr. Meera Nair",
    role: "Assistant Professor",
  },
  {
    id: 4,
    name: "Dr. Ajay Thomas",
    role: "Senior Resident",
  },
  {
    id: 5,
    name: "Dr. Shilpa S",
    role: "Senior Resident",
  },
  {
    id: 6,
    name: "Dr. Arun Babu",
    role: "Tutor",
  },
];

const Anesthesia = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [showActivities, setShowActivities] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#b71a22] to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            Anesthesiology
          </h1>
          <p className="text-lg opacity-90">
            Department of Anesthesia & Critical Care
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
            The Department of Anesthesiology focuses on perioperative care,
            pain management, and critical care medicine.
          </p>

          {showIntro && (
            <p className="text-gray-700 leading-relaxed text-lg mt-4">
              It plays a key role in ensuring patient safety during surgical
              procedures by administering anesthesia and monitoring vital
              functions.
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
        <TeachingFaulty faculty={anesthesiaFaculty} />

        {/* DEPARTMENT ACTIVITIES */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-[#b71a22] mb-6">
            Department Activities
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Clinical Training & Perioperative Care
          </h3>

          <p className="text-gray-700 leading-relaxed text-lg">
            Students gain exposure to anesthesia techniques, ICU care, and pain management protocols.
          </p>

          {showActivities && (
            <div className="text-gray-700 leading-relaxed text-lg space-y-4 mt-4">
              <p>
                Training in general and regional anesthesia techniques.
              </p>
              <p>
                Critical care monitoring and emergency airway management.
              </p>
              <p>
                Pain management clinics and postoperative care practices.
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

export default Anesthesia;