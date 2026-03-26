import React from "react";
import { useNavigate } from "react-router-dom";
import anesthesiaImg from "../img/anesthesia.jpeg"
import dentistryImg from "../img/dentistry.jpg"
import emergencymedicineImg from "../img/emergencymedicine.webp"
import ophthalmologyImg from "../img/ophtalmology.jpg"
import entImg from "../img/ent.jpg"
import generalMedicineImg from "../img/generalmedicine.jfif";
import generalSurgeryImg from "../img/generalsurgery.jpg";
import pediatricsImg from "../img/pediatrics.jpg";
import dermatologistImg from "../img/dermatologist.jpeg"
import obrImg from "../img/obr.jpg"
import obgImg from "../img/gynacology.avif";
import pmrImg from "../img/pmr.webp"

const subjects = [
  {
    id: 1,
    name: "Anaesthesiology",
    description:
      "Specialized branch focusing on pain control, anesthesia administration, and patient monitoring during surgical procedures.",
    image: anesthesiaImg,
    path: "/anaesthesiology",
  },
  {
    id: 2,
    name: "Dentistry",
    description:
      "Diagnosis, prevention, and treatment of conditions related to teeth, gums, and oral health.",
    image: dentistryImg,
    path: "/dentistry",
  },
  {
    id: 3,
    name: "Emergency Medicine",
    description:
      "Provides immediate medical care for acute illnesses, trauma, and life-threatening conditions.",
    image: emergencymedicineImg,
    path: "/emergency-medicine",
  },
  {
    id: 4,
    name: "Ophthalmology",
    description:
      "Medical and surgical care for eye disorders and vision-related problems.",
    image: ophthalmologyImg,
    path: "/ophthalmology",
  },
  {
    id: 5,
    name: "Oto Rhinolaryngology",
    description:
      "Deals with diagnosis and treatment of ear, nose, and throat (ENT) disorders.",
    image: entImg,
    path: "/oto-rhinolaryngology",
  },
  {
    id: 6,
    name: "Pediatrics",
    description:
      "Specialized care focusing on the health and medical treatment of infants, children, and adolescents.",
    image: pediatricsImg,
    path: "/pediatrics",
  },
  {
    id: 7,
    name: "Dermatology",
    description:
      "Medical specialty dealing with skin, hair, and nail disorders, including cosmetic treatments.",
    image: dermatologistImg,
    path: "/dermatology",
  },
  {
    id: 8,
    name: "Orthopedics",
    description:
      "Focuses on diagnosis and treatment of bones, joints, ligaments, and musculoskeletal system disorders.",
    image: obrImg,
    path: "/orthopedics",
  },
  {
    id: 9,
    name: "Obstetrics & Gynecology",
    description:
      "Specialized care for women’s reproductive health, pregnancy, childbirth, and related disorders.",
    image: obgImg,
    path: "/obstetrics-gynecology",
  },
  {
    id: 10,
    name: "General Medicine",
    description:
      "Diagnosis and non-surgical treatment of adult diseases and chronic medical conditions.",
    image: generalMedicineImg,
    path: "/general-medicine",
  },
  {
    id: 11,
    name: "General Surgery",
    description:
      "Surgical management of abdominal organs, trauma, and a wide range of operative conditions.",
    image: generalSurgeryImg,
    path: "/general-surgery",
  },
  {
    id: 12,
    name: "PMR",
    description:
      "Physical Medicine and Rehabilitation focusing on recovery of function after injury or illness.",
    image: pmrImg,
    path: "/pmr",
  },
];

const Clinical = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#b71a22] mb-4">
            Clinical Departments
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore advanced clinical disciplines focused on patient care, diagnosis, and treatment in real-world medical practice.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition transform hover:-translate-y-2 group flex flex-col overflow-hidden"
            >

              {/* Image */}
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={subject.image}
                  alt={subject.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">

                <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#b71a22] transition">
                  {subject.name}
                </h2>

                <p className="text-gray-600 text-sm mb-6 flex-grow">
                  {subject.description}
                </p>

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

export default Clinical;