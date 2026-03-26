import React, { useState } from "react";
import TeachingFaulty from "../components/TeachingFaulty";

// Replace with actual image 
import sumathomasImg from "../img/sumathomas.jpg";


const ophthalmologyFaculty = [
  {
    id: 1,
    name: "Dr. Elizabeth John",
    role: "Professor & HOD",
    empId: "EMP1401",
    nmc: "NMC1401",
    qualification: "MBBS, MS (Ophthalmology)",
    phone: "9876543210",
    email: "ophthal1@bcmch.edu.in",
    image: sumathomasImg,
  },
  {
    id: 2,
    name: "Dr. Samuel Thomas",
    role: "Associate Professor",
    empId: "EMP1402",
    nmc: "NMC1402",
    qualification: "MBBS, MS",
    phone: "9876543211",
    email: "ophthal2@bcmch.edu.in",
    image: null,
  },
  {
    id: 3,
    name: "Dr. Anju Mathew",
    role: "Assistant Professor",
  },
  {
    id: 4,
    name: "Dr. Riya George",
    role: "Assistant Professor",
  },
  {
    id: 5,
    name: "Dr. Kevin Paul",
    role: "Senior Resident",
  },
  {
    id: 6,
    name: "Dr. Sona Joseph",
    role: "Tutor",
  },
  {
    id: 7,
    name: "Ms. Neethu Raj",
    role: "Optometrist",
  },
  {
    id: 8,
    name: "Mr. Arun Sebastian",
    role: "Ophthalmic Technician",
  },
];

const Ophthalmology = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [showActivities, setShowActivities] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#b71a22] to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            Ophthalmology
          </h1>
          <p className="text-lg opacity-90">
            Department of Eye Care & Vision Sciences
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
            The Department of Ophthalmology focuses on the diagnosis and treatment
            of eye disorders and vision-related problems.
          </p>

          {showIntro && (
            <p className="text-gray-700 leading-relaxed text-lg mt-4">
              It provides advanced care in cataract surgery, glaucoma management,
              retinal diseases, and refractive error correction.
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
        <TeachingFaulty faculty={ophthalmologyFaculty} />

        {/* DEPARTMENT ACTIVITIES */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-[#b71a22] mb-6">
            Department Activities
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Clinical Eye Care Training
          </h3>

          <p className="text-gray-700 leading-relaxed text-lg">
            Students gain hands-on experience in diagnosing and treating eye conditions.
          </p>

          {showActivities && (
            <div className="text-gray-700 leading-relaxed text-lg space-y-4 mt-4">
              <p>Cataract screening and surgical assistance.</p>
              <p>Vision testing and refraction procedures.</p>
              <p>Glaucoma and retinal disease management.</p>
              <p>Community eye camps and awareness programs.</p>
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

export default Ophthalmology;