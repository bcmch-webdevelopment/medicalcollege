import React from 'react';

const SectionBlock = ({ title, children }) => {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-[#b71a22] border-l-4 border-[#b71a22] pl-4 uppercase tracking-wider mb-6">
        {title}
      </h3>
      <div className="text-gray-700 leading-relaxed text-lg space-y-4">
        {children}
      </div>
    </div>
  );
};

export default SectionBlock;
