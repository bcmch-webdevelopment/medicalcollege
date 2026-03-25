import React, { useState } from "react";
import TeachingFaulty from '../components/TeachingFaulty'

// Teaching faculty for Biochemistry
const biochemistryFaculty = [
  { id: 1, name: "Dr. Rekha Nair", role: "Professor" },
  { id: 2, name: "Dr. Thomas George", role: "Professor" },
  { id: 3, name: "Dr. Anjali Menon", role: "Assistant Professor" },
  { id: 4, name: "Dr. Suresh Kumar", role: "Senior Resident" },
  { id: 5, name: "Ms. Priya Joseph", role: "Tutor" },
];

const Biochemistry = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [showActivities, setShowActivities] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">

      {/* -------- PAGE HEADER -------- */}
      <div className="bg-gradient-to-r from-[#b71a22] to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            Biochemistry
          </h1>
          <p className="text-lg opacity-90">
            Department of Biochemistry – Understanding Chemical Processes in Life
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
            The Department of Biochemistry explores the chemical processes and molecular mechanisms that sustain life.
          </p>

          {showIntro && (
            <p className="text-gray-700 leading-relaxed text-lg mt-4">
              Students gain knowledge about enzymes, metabolism, and the molecular basis of diseases. The department emphasizes research, experimentation, and practical learning to equip future healthcare professionals.
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
        <TeachingFaulty faculty={biochemistryFaculty} />

        {/* -------- DEPARTMENT ACTIVITIES -------- */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-[#b71a22] mb-6">
            Department Activities
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Laboratory Experiments & Research Projects
          </h3>

          <p className="text-gray-700 leading-relaxed text-lg">
            The department organizes hands-on laboratory experiments, research projects, and seminars to deepen understanding of biochemical processes.
          </p>

          {showActivities && (
            <div className="text-gray-700 leading-relaxed text-lg space-y-4 mt-4">
              <p>
                Students conduct experiments to study enzymes, metabolic pathways, and molecular interactions.
              </p>
              <p>
                Research workshops and journal clubs are held regularly to encourage critical thinking and research skills.
              </p>
              <p>
                Collaboration with other departments enhances interdisciplinary learning and application in medical sciences.
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

export default Biochemistry;