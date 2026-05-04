import React from 'react';
import { Link } from 'react-router-dom';

const AdmissionCard = ({ title, description, linkTo }) => {
  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(183,26,34,0.15)] transition duration-500 overflow-hidden flex flex-col p-8 group">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-[#b71a22] transition-colors uppercase tracking-wide">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
        {description}
      </p>
      <div className="mt-auto">
        <Link 
          to={linkTo} 
          className="inline-block bg-white text-[#b71a22] border-2 border-[#b71a22] hover:bg-[#b71a22] hover:text-white font-bold py-2 px-6 rounded shadow transition transform hover:-translate-y-1"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default AdmissionCard;
