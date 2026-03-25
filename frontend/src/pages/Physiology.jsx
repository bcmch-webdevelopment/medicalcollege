import React, { useState } from "react";
import TeachingFaculty from '../components/TeachingFaulty'

// Teaching faculty for Physiology
const physiologyFaculty = [
  { id: 1, name: "Dr. Ravi Kumar", role: "Professor" },
  { id: 2, name: "Dr. Anitha S", role: "Professor" },
  { id: 3, name: "Dr. Meera Nair", role: "Assistant Professor" },
  { id: 4, name: "Dr. Sunil Joseph", role: "Senior Resident" },
  { id: 5, name: "Ms. Reena Thomas", role: "Tutor" },
];

const Physiology = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [showActivities, setShowActivities] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">

      {/* -------- PAGE HEADER -------- */}
      <div className="bg-gradient-to-r from-[#b71a22] to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            Physiology
          </h1>
          <p className="text-lg opacity-90">
            Department of Physiology – Understanding How the Body Functions
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4">

        {/* -------- INTRODUCTION -------- */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-12">
          <h2 className="text-3xl font-bold text-[#b71a22] mb-4">
            Introduction
          </h2>

          <p className="text-gray-700 leading-relaxed text-lg">
            The Department of Physiology provides students with insights into the normal functioning of the human body and its regulatory mechanisms.
          </p>

          {showIntro && (
            <p className="text-gray-700 leading-relaxed text-lg mt-4">
              Through practical sessions and theoretical knowledge, students learn how organs and systems interact to maintain homeostasis and overall health.
            </p>
          )}

          <button
            onClick={() => setShowIntro(!showIntro)}
            className="mt-4 text-[#b71a22] font-semibold hover:underline"
          >
            {showIntro ? "Read Less ↑" : "Read More →"}
          </button>
        </div>

        {/* -------- TEACHING FACULTY -------- */}
        <TeachingFaculty faculty={physiologyFaculty} />

        {/* -------- DEPARTMENT ACTIVITIES -------- */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-[#b71a22] mb-6">
            Department Activities
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Physiology Lab Sessions & Workshops
          </h3>

          <p className="text-gray-700 leading-relaxed text-lg">
            The department conducts interactive lab sessions, workshops, and seminars to enhance understanding of human physiology.
          </p>

          {showActivities && (
            <div className="text-gray-700 leading-relaxed text-lg space-y-4 mt-4">
              <p>
                Hands-on experiments allow students to observe physiological processes in real-time.
              </p>
              <p>
                Regular workshops on cardiovascular, respiratory, and nervous system functions are conducted for enhanced learning.
              </p>
              <p>
                Guest lectures by experts in physiology provide insights into recent research and innovations in the field.
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

export default Physiology;