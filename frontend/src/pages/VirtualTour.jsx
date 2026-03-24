import React from 'react';

const VirtualTour = () => {
  return (
    <div className="flex-grow w-full h-[calc(100vh-80px)]">
      <iframe 
        src="https://www.bcmch.org/bcmc_360-view/360-view/" 
        title="BCMCH 360 Virtual Tour"
        className="w-full h-full border-0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VirtualTour;
