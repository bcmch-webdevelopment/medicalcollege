import React from "react";

const CitizenCharter = () => {
  const rights = [
    "Be treated with dignity, respect, and privacy",
    "Be protected from physical abuse or neglect",
    "Refuse treatment",
    "Confidentiality of medical records",
    "Participate in treatment decisions and give consent",
    "Be informed about treatment costs",
    "Access medical records and discharge summary",
    "Raise complaints through Patient Advocacy Cell",
    "Family member can represent patient when needed",
  ];

  const responsibilities = [
    "Provide accurate and complete health information",
    "Follow the treatment plan advised by doctors",
    "Take responsibility if refusing treatment",
    "Maintain and produce medical records",
    "Take care of personal belongings",
    "Follow hospital rules (No-tobacco policy)",
    "Respect other patients and hospital staff",
    "Maintain cleanliness and discipline",
    "Respect hospital property",
    "Pay bills on time when agreed",
    "Provide feedback on services",
    "Follow national and local laws",
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-10 border border-gray-200">

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-red-800 mb-6">
          Citizen Charter
        </h1>

        <div className="w-20 h-1 bg-red-700 mx-auto mb-10 rounded"></div>

        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-10 text-gray-700">
          <p>
            The Citizen Charter outlines the rights and responsibilities of 
            patients to ensure quality healthcare services and mutual respect 
            within the hospital environment.
          </p>
        </div>

        {/* Rights Section */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-red-700 mb-6">
            Rights of Patients
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {rights.map((item, index) => (
              <div
                key={index}
                className="bg-red-50 border border-red-100 p-4 rounded-lg flex gap-3"
              >
                <span className="text-red-600 font-bold">✔</span>
                <p className="text-gray-700 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Responsibilities Section */}
        <div>
          <h2 className="text-xl font-semibold text-red-700 mb-6">
            Responsibilities of Patients
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {responsibilities.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 p-4 rounded-lg flex gap-3"
              >
                <span className="text-red-600 font-bold">•</span>
                <p className="text-gray-700 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-10 bg-red-50 border-l-4 border-red-600 p-4 rounded">
          <p className="text-gray-700 text-sm">
            Patients are encouraged to actively participate in their healthcare 
            journey while respecting hospital policies and healthcare providers.
          </p>
        </div>

      </div>
    </div>
  );
};

export default CitizenCharter;