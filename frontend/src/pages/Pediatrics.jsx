import React, { useState } from "react";
import TeachingFaulty from "../components/TeachingFaulty";

// Replace with actual image if available
import pediatricsImg from "../img/pediatrics.jpg";

const pediatricsFaculty = [
  {
    id: 1,
    name: "Dr. Anu Thomas",
    role: "Professor & HOD",
    empId: "EMP1801",
    nmc: "NMC1801",
    qualification: "MBBS, MD (Pediatrics)",
    phone: "9876543210",
    email: "pediatrics1@bcmch.edu.in",
    image: pediatricsImg,
  },
  {
    id: 2,
    name: "Dr. Reena Mathew",
    role: "Associate Professor",
    empId: "EMP1802",
    nmc: "NMC1802",
    qualification: "MBBS, MD",
    phone: "9876543211",
    email: "pediatrics2@bcmch.edu.in",
    image: null,
  },
  {
    id: 3,
    name: "Dr. Nisha Paul",
    role: "Assistant Professor",
  },
  {
    id: 4,
    name: "Dr. Kevin Thomas",
    role: "Assistant Professor",
  },
  {
    id: 5,
    name: "Dr. Riya Joseph",
    role: "Senior Resident",
  },
  {
    id: 6,
    name: "Dr. Arun George",
    role: "Tutor",
  },
  {
    id: 7,
    name: "Ms. Sini Mathew",
    role: "Pediatric Nurse",
  },
  {
    id: 8,
    name: "Mr. Rahul Das",
    role: "Child Health Worker",
  },
];

const Pediatrics = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [showActivities, setShowActivities] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#b71a22] to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            Pediatrics
          </h1>
          <p className="text-lg opacity-90">
            Department of Child Health & Development
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
            The Department of Pediatrics focuses on the health and well-being of infants,
            children, and adolescents.
          </p>

          {showIntro && (
            <p className="text-gray-700 leading-relaxed text-lg mt-4">
              It provides preventive, diagnostic, and therapeutic services while ensuring
              proper growth, development, and immunization of children.
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
        <TeachingFaulty faculty={pediatricsFaculty} />

        {/* DEPARTMENT ACTIVITIES */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-[#b71a22] mb-6">
            Department Activities
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Pediatric Care & Training Programs
          </h3>

          <p className="text-gray-700 leading-relaxed text-lg">
            Students gain hands-on experience in child healthcare and pediatric clinical practices.
          </p>

          {showActivities && (
            <div className="text-gray-700 leading-relaxed text-lg space-y-4 mt-4">
              <p>Growth monitoring and developmental assessments.</p>
              <p>Immunization programs and preventive healthcare services.</p>
              <p>Management of pediatric illnesses and neonatal care.</p>
              <p>Health awareness programs for parents and communities.</p>
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

export default Pediatrics;