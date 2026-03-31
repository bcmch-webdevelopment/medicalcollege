import React from "react";

const PrincipalMessage = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 md:px-10">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-10 border border-gray-200">

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-red-800 mb-6">
          Principal's Message
        </h1>

        {/* Divider */}
        <div className="w-20 h-1 bg-red-700 mx-auto mb-6 rounded"></div>

        {/* Image */}
        <div className="flex justify-center mb-6">
          <img
            src="./src/img/principal.jpg"
            alt="Principal"
            className="rounded-xl shadow-md w-60 md:w-72 border-4 border-red-100"
          />
        </div>

        {/* Message Content */}
        <div className="space-y-5 text-gray-700 leading-relaxed text-justify">

          <p>
            Believers Church Medical College Hospital was started with a great vision 
            of bringing hope and healing with the love of Christ. The ultimate goal 
            of the medical profession is to serve humanity.
          </p>

          <p>
            Our endeavour is to impart to our students the necessary skills, knowledge 
            and mindset that will enable them to become leading practitioners in the 
            medical field. We engage with students as facilitators in their growth and 
            development.
          </p>

          <p>
            Our faculty is devoted to developing physicians who bring hope and relief 
            to those suffering from disease and ill-health, cultivating intellectual 
            curiosity and compassion.
          </p>

          <p className="italic text-center text-red-600 font-medium">
            “The practice of medicine is an art, based on science.”
          </p>

          <p>
            We integrate advanced technology in healthcare and education while 
            maintaining the balance between science and compassionate human care. 
            Medicine remains a blend of scientific research and personal interaction.
          </p>

          <p>
            Through personalized mentoring and innovative programs like the Foster 
            Parenting System and Clinical Foundation Program, we nurture students 
            to become confident, compassionate, and lifelong learners.
          </p>

          <p>
            As we grow into a mature institution, we invite you to join us in shaping 
            the future of patient-centered healthcare and medical education.
          </p>

          <p className="font-semibold text-red-700 text-center">
            Believe and strive.
          </p>

        </div>

        {/* Highlights Section */}
        <div className="mt-10 bg-red-50 p-6 rounded-xl border border-red-100">
          <h2 className="text-xl font-semibold text-red-800 mb-4">
            Our Focus
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
            {[
              "Student-centered medical education",
              "Patient-centered healthcare",
              "Compassion-driven service",
              "Innovation in teaching and training",
              "Holistic development of students",
              "Technology-integrated learning",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Signature */}
        <div className="mt-8 text-right border-t pt-6">
          <p className="font-semibold text-gray-800">
            Prof. Dr. Elizabeth Joseph
          </p>
          <p className="text-red-700 font-medium">
            Principal
          </p>
        </div>

      </div>
    </div>
  );
};

export default PrincipalMessage;