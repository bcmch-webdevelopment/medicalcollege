import React, { useState } from "react";
import TeachingFaulty from "../components/TeachingFaulty";

// Replace with actual microbiology images if available
import microbiologyImg from "../img/sumathomas.jpg";

const microbiologyFaculty = [
  {
    id: 1,
    name: "Dr. Suma Thomas",
    role: "Professor",
    empId: "EMP201",
    nmc: "NMC201",
    qualification: "MBBS, MD (Microbiology)",
    phone: "9876543210",
    email: "micro1@bcmch.edu.in",
    image: microbiologyImg,
  },
  {
    id: 2,
    name: "Dr. Vijayamma K N",
    role: "Professor",
    empId: "EMP202",
    nmc: "NMC202",
    qualification: "MBBS, MD",
    phone: "9876543211",
    email: "micro2@bcmch.edu.in",
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

const Microbiology = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [showActivities, setShowActivities] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#b71a22] to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            Microbiology
          </h1>
          <p className="text-lg opacity-90">
            Department of Microbiology – Study of Microorganisms & Infections
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
            The Department of Microbiology deals with the study of microorganisms
            such as bacteria, viruses, fungi, and parasites that affect human health.
          </p>

          {showIntro && (
            <p className="text-gray-700 leading-relaxed text-lg mt-4">
              It plays a vital role in diagnosing infectious diseases, understanding
              antimicrobial resistance, and developing preventive strategies.
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
        <TeachingFaulty faculty={microbiologyFaculty} />

        {/* DEPARTMENT ACTIVITIES */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-[#b71a22] mb-6">
            Department Activities
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Laboratory Training & Infection Control Programs
          </h3>

          <p className="text-gray-700 leading-relaxed text-lg">
            The department conducts practical training in microbiological techniques
            and infection prevention practices.
          </p>

          {showActivities && (
            <div className="text-gray-700 leading-relaxed text-lg space-y-4 mt-4">
              <p>
                Students gain hands-on experience in culture techniques and staining methods.
              </p>
              <p>
                Regular workshops are conducted on hospital infection control.
              </p>
              <p>
                The department also focuses on antimicrobial resistance awareness programs.
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

export default Microbiology;