import React from 'react';

const About = () => {
  // Image URL stored in a variable
  const aboutImage = "https://www.bcmch.org/asset/uploads/common/880576991685bced34f30f.jpg";

  return (
    <div className="container mt-5">
      <h1>About Us</h1>
      <p>
        Believers’ Hospital is a renowned healthcare institution committed to providing compassionate and high-quality medical services to its patients. Established with the vision of combining modern medical technology with holistic patient care, the hospital has grown into a center of excellence in both general and specialized healthcare services. It offers a wide range of medical departments, including internal medicine, surgery, pediatrics, obstetrics and gynecology, cardiology, and emergency care, staffed by experienced and dedicated professionals. Beyond its clinical services, Believers’ Hospital emphasizes community health, preventive care, and health education, organizing regular outreach programs, vaccination drives, and awareness campaigns to promote wellness and early detection of diseases. Equipped with state-of-the-art diagnostic tools and advanced treatment facilities, the hospital ensures that patients receive timely and accurate medical attention. Its patient-centered approach focuses on dignity, comfort, and respect, creating a welcoming environment for individuals and families alike. Over the years, Believers’ Hospital has earned a reputation not only for its medical expertise but also for its ethical practices, reliability, and commitment to improving healthcare standards in the region, making it a trusted choice for thousands of patients seeking both routine and specialized care.
      </p>

      {/* Image */}
      <div className="my-4 text-center">
        <img
          src={aboutImage}
          alt="About"
          className="img-fluid p-3 page-image rounded-4 left-shadow page-image"
          style={{ maxHeight: '300px' }}
        />
      </div>

      {/* Download button */}
      <div className="text-center">
        <a
          href={aboutImage}
          download="AboutImage.jpg"
          className="btn btn-primary"
        >
          Download Brochure
        </a>
      </div>
    </div>
  );
};

export default About;
