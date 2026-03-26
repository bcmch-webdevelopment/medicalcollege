import React from "react";
import { useNavigate } from "react-router-dom";
import pathologyImg from "../img/pathology.jfif";
import microbiologyImg from "../img/microbiology.jpg";
import pharmacologyImg from "../img/pharmacology.avif";
import forensicImg from "../img/forensicmedicine.jpg";
import communityImg from "../img/communitymedicine.jpg";

const subjects = [
  {
    id: 1,
    name: "Pathology",
    description:
      "Study of diseases, their causes, mechanisms, and effects on the human body.",
    image: pathologyImg,
    path: "/pathology",
  },
  {
    id: 2,
    name: "Microbiology",
    description:
      "Explores microorganisms such as bacteria, viruses, fungi, and their impact on health.",
    image: microbiologyImg,
    path: "/microbiology",
  },
  {
    id: 3,
    name: "Pharmacology",
    description:
      "Study of drugs, their effects, mechanisms, and therapeutic uses in medicine.",
    image: pharmacologyImg,
    path: "/pharmacology",
  },
  {
    id: 4,
    name: "Forensic Medicine",
    description:
      "Application of medical knowledge to legal investigations and understanding causes of death.",
    image: forensicImg,
    path: "/forensic-medicine",
  },
  {
    id: 5,
    name: "Community Medicine",
    description:
      "Application of medical knowledge to legal investigations and understanding causes of death.",
    image: communityImg,
    path: "/community-medicine",
  },
];

const ParaClinic = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* -------- Heading -------- */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#b71a22] mb-4">
            Para-Clinical Departments
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore the medical sciences that support clinical practice and patient care.
          </p>
        </div>

        {/* -------- Cards -------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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

export default ParaClinic;