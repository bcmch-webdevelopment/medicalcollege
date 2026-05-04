import React from 'react';
import AdmissionList from '../../components/Admissions/AdmissionList';

const AdmissionsLanding = () => {
  return (
    <main className="flex-grow bg-[#f8f9fa] font-sans text-gray-800">
      <section className="bg-red-50 py-16 px-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#b71a22] tracking-wide mb-4 uppercase">
            Admissions
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Welcome to the admissions portal of Believers Church Medical College. We offer comprehensive medical education programs designed to foster excellence in healthcare.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-[#b71a22] uppercase tracking-wider mb-4">
              Our Admission Programs
            </h2>
            <div className="w-24 h-1 bg-[#b71a22] mx-auto rounded mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              Explore our range of undergraduate, postgraduate, and super specialty medical programs. Click on any program below to view detailed admission guidelines, eligibility, and procedures.
            </p>
          </div>

          <AdmissionList />
        </div>
      </section>
    </main>
  );
};

export default AdmissionsLanding;
