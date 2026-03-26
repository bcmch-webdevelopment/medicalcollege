import React, { useState } from "react";
import TeachingFaulty from "../components/TeachingFaulty";

// Replace with actual image if available
import dentistryImg from "../img/dentistry.jpg";

const dentistryFaculty = [
  {
    id: 1,
    name: "Dr. Alice Maria",
    role: "Professor & HOD",
    empId: "EMP1201",
    nmc: "NMC1201",
    qualification: "BDS, MDS (Orthodontics)",
    phone: "9876543210",
    email: "dentistry1@bcmch.edu.in",
    image: dentistryImg,
  },
  {
    id: 2,
    name: "Dr. Joseph Varghese",
    role: "Associate Professor",
    empId: "EMP1202",
    nmc: "NMC1202",
    qualification: "BDS, MDS",
    phone: "9876543211",
    email: "dentistry2@bcmch.edu.in",
    image: null,
  },
  {
    id: 3,
    name: "Dr. Anitha Paul",
    role: "Assistant Professor",
  },
  {
    id: 4,
    name: "Dr. Riya Thomas",
    role: "Assistant Professor",
  },
  {
    id: 5,
    name: "Dr. Kevin John",
    role: "Senior Resident",
  },
  {
    id: 6,
    name: "Dr. Meera S",
    role: "Tutor",
  },
  {
    id: 7,
    name: "Ms. Sneha K",
    role: "Dental Hygienist",
  },
  {
    id: 8,
    name: "Mr. Arun Das",
    role: "Dental Technician",
  },
];

const Dentistry = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [showActivities, setShowActivities] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#b71a22] to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            Dentistry
          </h1>
          <p className="text-lg opacity-90">
            Department of Oral & Dental Sciences
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
            The Department of Dentistry focuses on oral health, dental surgery,
            and preventive dental care.
          </p>

          {showIntro && (
            <p className="text-gray-700 leading-relaxed text-lg mt-4">
              It provides training in diagnosis and treatment of dental diseases,
              orthodontics, prosthodontics, and oral surgery procedures.
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
        <TeachingFaulty faculty={dentistryFaculty} />

        {/* DEPARTMENT ACTIVITIES */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-[#b71a22] mb-6">
            Department Activities
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Clinical Training & Dental Procedures
          </h3>

          <p className="text-gray-700 leading-relaxed text-lg">
            Students gain hands-on experience in dental clinics and oral surgery units.
          </p>

          {showActivities && (
            <div className="text-gray-700 leading-relaxed text-lg space-y-4 mt-4">
              <p>Tooth extraction and restorative procedures.</p>
              <p>Dental scaling, polishing, and preventive care.</p>
              <p>Orthodontic appliance training and fitting.</p>
              <p>Community dental health awareness programs.</p>
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

export default Dentistry;