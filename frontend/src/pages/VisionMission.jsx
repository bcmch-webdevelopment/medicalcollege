import React from 'react';
import missionImg from '../img/mission.jpg'; 
import visionImg from '../img/vision.jpg';
import objectiveImg from '../img/objective.jpg';
const VisionMission = () => {
  return (
    <div className="flex-grow bg-[#f8f9fa] py-20 px-4">
      <div className="max-w-5xl mx-auto bg-white p-12 rounded-xl shadow-sm border-t-4 border-red-700">
        <h1 className="text-4xl font-bold text-red-900 mb-8 uppercase tracking-wide border-b border-gray-100 pb-4">
          Vision, Mission & Objective
        </h1>

        {/* Vision */}
        <h2 className="text-2xl font-semibold text-red-900 mb-4">Our Vision</h2>
           <img src={visionImg} alt="Our Mission" className="w-48 rounded-lg shadow-md flex-shrink-0" />
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Bringing Hope and Healing with the Love of Christ
        </p>

        {/* Mission */}
        <h2 className="text-2xl font-semibold text-red-900 mb-4">Our Mission</h2>
        <div className="flex flex-col md:flex-row mb-6 items-start gap-6">
          <img src={missionImg} alt="Our Mission" className="w-48 rounded-lg shadow-md flex-shrink-0" />
          <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed space-y-2">
            <li>To be a world class center of scholarship in the art and science of healing – exhibiting professionalism, excellence, compassion and a holistic Christ-centered understanding of healing.</li>
            <li>Partnering with other like-minded healthcare providers in supporting and extending the medical mission.</li>
            <li>To make a larger impact on health and healthcare through policy advocacy.</li>
          </ul>
        </div>

        {/* Objective */}
        <h2 className="text-2xl font-semibold text-red-900 mb-4">Objective</h2>
           <img src={objectiveImg} alt="Our Mission" className="w-48 rounded-lg shadow-md flex-shrink-0" />
        <p className="text-gray-700 text-lg leading-relaxed">
          Creating professionally competent medical graduates with high standards of skills, ethics and aptitude for research along with values of compassion, love, and sacrifice to lead a meaningful life as a healer to the society.
        </p>
      </div>
    </div>
  );
};

export default VisionMission;