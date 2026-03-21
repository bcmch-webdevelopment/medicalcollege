import React from 'react';

const Services = () => {
  // Image for the services page
  const serviceImage = 'https://www.bcmch.org/asset/uploads/common/880576991685bced34f30f.jpg';

  // List of main departments
  const departments = [
    'Cardiology',
    'Orthopaedics & Traumatology',
    'Paediatrics & Neonatology',
    'Gastroenterology & Hepatology',
    'Neurology & Neurosurgery',
    'Obstetrics & Gynaecology',
    'Ophthalmology',
    'ENT (Ear, Nose & Throat)',
    'Dermatology',
    'Emergency & Critical Care'
  ];

  return (
    <div className="container mt-5">
      <h1>Our Services</h1>

      {/* Why Believers Hospital */}
      <section className="mt-4">
        <h3>Why Believers’ Hospital?</h3>
        <p>
          Believers’ Hospital is a leading healthcare institution committed to providing compassionate and high-quality medical care.
          Our approach integrates modern technology, experienced medical professionals, and patient-centered care to ensure the best outcomes.
          With a focus on wellness, preventive care, and emergency readiness, we aim to serve patients with dignity, comfort, and safety.
        </p>
      </section>

      {/* All Departments */}
      <section className="mt-4">
        <h3>All Departments</h3>
        <ul>
          {departments.map((dept, index) => (
            <li key={index}>{dept}</li>
          ))}
        </ul>
      </section>

      {/* Additional Information */}
      <section className="mt-4">
        <h3>Additional Information</h3>
        <p>
          Believers’ Hospital is equipped with state-of-the-art diagnostic and treatment facilities to handle both routine and complex medical cases.
          We emphasize community health programs, health education, and preventive care initiatives to promote overall wellness.
          Our emergency and critical care units are operational 24/7 to provide timely medical attention whenever needed.
          With ethical practices, patient safety protocols, and a compassionate staff, we ensure a holistic healthcare experience.
        </p>
      </section>

      {/* Image */}
      <div className="my-4 text-center">
        <img
          src={serviceImage}
          alt="Services"
          className="img-fluid p-3 rounded-4 shadow"
          style={{ maxHeight: '300px' }}
        />
      </div>
    </div>
  );
};

export default Services;
