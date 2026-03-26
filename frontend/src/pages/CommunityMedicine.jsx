import React, { useState } from "react";
import TeachingFaulty from "../components/TeachingFaulty";

// Replace with actual images if available
import communityImg from "../img/communitymedicine.jpg";

const communityFaculty = [
  {
    id: 1,
    name: "Dr. Reena George",
    role: "Professor & HOD",
    empId: "EMP1101",
    nmc: "NMC1101",
    qualification: "MBBS, MD (Community Medicine)",
    phone: "9876543210",
    email: "community1@bcmch.edu.in",
    image: communityImg,
  },
  {
    id: 2,
    name: "Dr. Thomas Mathew",
    role: "Associate Professor",
    empId: "EMP1102",
    nmc: "NMC1102",
    qualification: "MBBS, MD",
    phone: "9876543211",
    email: "community2@bcmch.edu.in",
    image: null,
  },
  {
    id: 3,
    name: "Dr. Anu Paul",
    role: "Assistant Professor",
  },
  {
    id: 4,
    name: "Dr. Nisha Varghese",
    role: "Assistant Professor",
  },
  {
    id: 5,
    name: "Dr. Sajan K",
    role: "Senior Resident",
  },
  {
    id: 6,
    name: "Dr. Leya John",
    role: "Tutor",
  },
  {
    id: 7,
    name: "Mr. Rahul Das",
    role: "Statistician",
  },
  {
    id: 8,
    name: "Ms. Sini Thomas",
    role: "Health Inspector",
  },
];

const CommunityMedicine = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [showActivities, setShowActivities] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#b71a22] to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            Community Medicine
          </h1>
          <p className="text-lg opacity-90">
            Department of Preventive & Social Medicine
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
            The Department of Community Medicine focuses on public health,
            disease prevention, and health promotion in the community.
          </p>

          {showIntro && (
            <p className="text-gray-700 leading-relaxed text-lg mt-4">
              It trains students in epidemiology, biostatistics, environmental health,
              and primary healthcare services to improve population health outcomes.
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
        <TeachingFaulty faculty={communityFaculty} />

        {/* DEPARTMENT ACTIVITIES */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-[#b71a22] mb-6">
            Department Activities
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Field Visits & Public Health Programs
          </h3>

          <p className="text-gray-700 leading-relaxed text-lg">
            Students actively participate in community outreach and public health initiatives.
          </p>

          {showActivities && (
            <div className="text-gray-700 leading-relaxed text-lg space-y-4 mt-4">
              <p>
                Rural health training camps and field surveys.
              </p>
              <p>
                Immunization and health awareness programs.
              </p>
              <p>
                Data collection and epidemiological studies.
              </p>
              <p>
                Health education sessions in schools and communities.
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

export default CommunityMedicine;