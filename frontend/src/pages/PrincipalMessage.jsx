import React from 'react';

const PrincipalMessage = () => {
  return (
    <div className="flex-grow bg-[#f8f9fa] py-20 px-4">
      <div className="max-w-5xl mx-auto bg-white p-12 rounded-xl shadow-sm border-t-4 border-red-700">
        <h1 className="text-4xl font-bold text-red-900 mb-8 uppercase tracking-wide border-b border-gray-100 pb-4">Principal's Message</h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          Welcome to Believers Church Medical College. It is my immense pleasure to... (Content coming soon)
        </p>
      </div>
    </div>
  );
};

export default PrincipalMessage;
