import React from 'react';

const Contact = () => {
  // Image for the contact page
  const contactImage = 'https://www.bcmch.org/asset/uploads/common/880576991685bced34f30f.jpg';

  // Contact details
  const contactDetails = {
    phone: '+91 469 260 2222',
    email: 'info@bcmch.org',
    address: 'Believers Church Medical College Hospital, Thiruvalla, Kerala, India',
    visitingHours: 'Monday to Saturday: 8:00 AM - 6:00 PM',
    emergency: 'Emergency services available 24/7'
  };

  return (
    <div className="container mt-5">
      <h1>Contact Us</h1>

      {/* Contact Details */}
      <section className="mt-4">
        <h3>Our Contact Information</h3>
        <p><strong>Phone:</strong> {contactDetails.phone}</p>
        <p><strong>Email:</strong> {contactDetails.email}</p>
        <p><strong>Address:</strong> {contactDetails.address}</p>
        <p><strong>Visiting Hours:</strong> {contactDetails.visitingHours}</p>
        <p><strong>Emergency:</strong> {contactDetails.emergency}</p>
      </section>

      {/* Additional Information */}
      <section className="mt-4">
        <h3>Additional Information</h3>
        <p>
          For general inquiries, appointments, or medical consultations, please contact us via phone or email.
          Our hospital staff are ready to assist patients and families with guidance on departments, services, 
          and admission procedures. Emergency care is available at all times.
        </p>
      </section>

      {/* Image */}
      <div className="my-4 text-center">
        <img
          src={contactImage}
          alt="Contact"
          className="img-fluid p-3 rounded-4 shadow"
          style={{ maxHeight: '300px' }}
        />
      </div>
    </div>
  );
};

export default Contact;
