import React from "react";
import { useNavigate } from "react-router-dom";
import anatomyImg from "../img/anatomy.webp";
import physiologyImg from "../img/Physiology.webp";
import bioChemistryImg from "../img/biochemistry.jpg";

const subjects = [
  {
    id: 1,
    name: "Anatomy",
    description:
      "Study of the structure of the human body including organs, tissues, and systems.",
    image: anatomyImg,
    path: "/anatomy",
  },
  {
    id: 2,
    name: "Physiology",
    description:
      "Understanding how the human body functions and maintains internal balance.",
    image: physiologyImg,
    path: "/physiology",
  },
  {
    id: 3,
    name: "Biochemistry",
    description:
      "Explores the chemical processes and substances within living organisms.",
    image: bioChemistryImg,
    path: "/biochemistry",
  },
];

const PreClinic = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* -------- Heading -------- */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#b71a22] mb-4">
            Pre-Clinical Departments
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore the foundational medical sciences that build the base for clinical practice.
          </p>
        </div>

        {/* -------- Cards -------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition transform hover:-translate-y-2 group flex flex-col overflow-hidden"
            >

              {/*  Image Section */}
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={subject.image}
                  alt={subject.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#b71a22] transition">
                  {subject.name}
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-6 flex-grow">
                  {subject.description}
                </p>

                {/* Button */}
                <button
                  onClick={() => navigate(subject.path)}
                  className="mt-auto bg-[#b71a22] hover:bg-red-800 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                  View Details →
                </button>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default PreClinic;