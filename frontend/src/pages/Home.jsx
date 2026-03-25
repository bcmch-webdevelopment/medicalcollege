import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import college from '../img/college.jpg';
import college1 from '../img/college1.jpg';
import principal from '../img/principal.jpg';
import naacLogo from '../img/national-assessment-and-accreditation-council-01.jpg';
import kuhsLogo from '../img/kuhs.jfif';
import nirfLogo from '../img/download.png';
import PreClinical from '../pages/PreClinic';
import { useNavigate } from "react-router-dom";

// Automatically import all images in the img folder
const imgModules = import.meta.glob('../img/*.{jpg,png,jpeg,svg,jfif}', { eager: true });

const facilitiesData = [
  {
    title: "The Central Library",
    description: "Spread over two floors with a seating capacity of 420. Includes 10,000+ books, E-journals (Delnet), and comprehensive digital resources.",
    imagePaths: ["../img/library.jpg"]
  },
  {
    title: "World Class Museums",
    description: "Unique museums displaying medical facts, oddities, 150+ dissected specimens, and over 100 carefully preserved medical models.",
    imagePaths: ["../img/muceum.jpg"]
  },
  {
    title: "Hi-Tech Laboratories",
    description: "Modern laboratories equipped with state-of-the-art technology to conduct advanced medical experiments and clinical case studies.",
    imagePaths: ["../img/hitech-lab.jpg"]
  },
  {
    title: "Bedside Teaching",
    description: "Direct patient interaction at outpatient departments. Enhances clinical judgment, communication skills, and effective medical management.",
    imagePaths: ["../img/teaching.jpg"]
  },
  {
    title: "Community Outreach",
    description: "Empowering students to understand broader health factors by interacting, blending, and caring for people in the surrounding community.",
    imagePaths: ["../img/community-1.jpg"]
  },
  {
    title: "Recreational Facilities",
    description: "Includes Badminton, Football, Basketball courts, a modern gymnasium, swimming pool, and dedicated indoor entertainment rooms.",
    imagePaths: ["../img/recreation_fac_01.jpg", "../img/recreation_fac_02.jpg", "../img/recreation_fac_03.jpg", "../img/recreation_fac_07.jpg", "../img/recreation_fac_12.jpg", "../img/recreation_fac_13.jpg"]
  },
  {
    title: "Lecture Hall",
    description: "Spacious, air-conditioned lecture theaters equipped with modern audio-visual aids and smart boards for an interactive learning experience.",
    imagePaths: ["../img/affiliation.jpg"]
  },
  {
    title: "Skills Lab",
    description: "State-of-the-art simulation centre where students practice and master clinical procedures before real patient interactions.",
    imagePaths: ["../img/skill (1).jpg", "../img/skill (2).jpg", "../img/skill (3).jpg", "../img/skill (4).jpg", "../img/skill (5).jpg", "../img/skill (6).jpg", "../img/skill (7).jpg"]
  },
  {
    title: "Dissection Hall, Dept of Anatomy",
    description: "Well-ventilated and spacious cadaveric dissection hall facilitating intensive hands-on anatomical learning.",
    imagePaths: ["../img/dissectionhall.jpg"]
  },
  {
    title: "Remote Digital Evaluation Centre",
    description: "A highly secure digital evaluation hub operating under the Kerala University of Health Sciences for seamless exam processing.",
    imagePaths: ["../img/remotecenter.jpg", "../img/remotecenter2.jpg", "../img/remotecenter3.jpg"]
  },
  {
    title: "Medical Education Unit",
    description: "A well-equipped MEU established for conducting continuous faculty development programs under NMC approved nodal centres.",
    imagePaths: ["../img/affiliation.jpg"]
  }
];

const FacilityCard = ({ title, description, imagePaths }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Resolve imports using the Vite glob map
  const resolvedImages = imagePaths.map(path => imgModules[path]?.default || imgModules[path]).filter(Boolean);

  useEffect(() => {
    if (resolvedImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % resolvedImages.length);
    }, 3000 + Math.random() * 1000); // Random stagger so sliders don't sync up boringly
    return () => clearInterval(timer);
  }, [resolvedImages.length]);
  
  
  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(183,26,34,0.15)] transition duration-500 overflow-hidden flex flex-col group">
      <div className="relative w-full h-56 overflow-hidden bg-gray-200">
        {resolvedImages.length > 0 ? resolvedImages.map((imgSrc, idx) => (
          <img
            key={idx}
            src={imgSrc}
            alt={title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentIndex ? 'opacity-100 relative' : 'opacity-0 absolute'
              } group-hover:scale-110 transform ease-in-out`}
          />
        )) : (
          <div className="flex items-center justify-center h-full text-gray-400 bg-gray-100">Image Missing</div>
        )}
        {resolvedImages.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2 z-10 drop-shadow-md">
            {resolvedImages.map((_, idx) => (
              <span key={idx} className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 shadow-md ${idx === currentIndex ? 'bg-[#b71a22]' : 'bg-white/70'}`}></span>
            ))}
          </div>
        )}
      </div>
      <div className="p-6 flex-grow flex flex-col border-t-4 border-transparent group-hover:border-[#b71a22] transition-colors">
        <h3 className="text-xl font-bold text-gray-800 mb-3 uppercase tracking-wide group-hover:text-[#b71a22] transition-colors">{title}</h3>
        <p className="text-gray-600 leading-relaxed text-sm flex-grow">{description}</p>
      </div>
    </div>
  );
};

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
   const navigate = useNavigate();   

    const handleClick = () => {       
    navigate("/pre-clinic");
  };
  // Auto-cycle through the hero images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex-grow bg-[#f8f9fa] font-sans text-gray-800">

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="bg-red-50 pt-10 pb-16 px-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto text-center">

          <h1 className="text-3xl md:text-5xl font-extrabold text-[#b71a22] mb-6 tracking-wide">
            Welcome to Believers Church Medical College
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
            Devoted to excellence in teaching, learning, and healing. We are committed to creating a world-class learning experience for our students.
          </p>

          <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden rounded-xl shadow-[0_10px_30px_rgba(183,26,34,0.15)] border-4 border-white mb-8 mt-4 mx-auto max-w-6xl">
            <img
              src={college}
              alt="Campus View"
              className={`absolute inset-0 w-full h-full object-cover origin-center transition-all duration-1000 ease-in-out ${currentImage === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                }`}
            />
            <img
              src={college1}
              alt="Medical College"
              className={`absolute inset-0 w-full h-full object-cover origin-center transition-all duration-1000 ease-in-out ${currentImage === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                }`}
            />
          </div>

          <div className="flex justify-center flex-wrap gap-4 mt-8">
            <button className="bg-[#b71a22] hover:bg-red-800 text-white font-bold py-3 px-8 rounded shadow-md transition transform hover:-translate-y-1">
              Admissions
            </button>
            <Link
              to="/virtual-tour"
              className="bg-white hover:bg-gray-100 text-[#b71a22] font-bold py-3 px-8 rounded shadow-md border border-red-200 transition transform hover:-translate-y-1 inline-block text-center"
            >
              Virtual Tour
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- ABOUT BCMCH SECTION ---------------- */}
      <section className="py-20 px-4 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">

          <div className="w-full lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-gray-50 group">
              <img src={college} alt="About BCMCH" className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute bottom-0 left-0 bg-[#b71a22] text-white px-6 py-3 rounded-tr-2xl font-bold tracking-wide shadow-lg">
                Top Ranked Medical College
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold text-[#b71a22] border-l-4 border-[#b71a22] pl-4 uppercase tracking-wider">
              About BCMCH
            </h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight">
              A Legacy of Healing & Excellence
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Believers Church Medical College Hospital is a premier medical institution devoted to excellence in teaching, learning, and healing. Set in a pristine and peaceful campus, we offer a world-class learning experience.
            </p>

            <div className="grid grid-cols-3 gap-2 py-6 border-y border-gray-100 my-6">
              <div className="flex flex-col items-center text-center p-2">
                <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-[#b71a22] mb-3 shadow-sm transition transform hover:scale-110">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                </div>
                <h4 className="text-3xl md:text-4xl font-extrabold text-gray-800">470+</h4>
                <p className="text-xs md:text-sm font-bold text-[#b71a22] uppercase tracking-wider mt-1">Beds</p>
              </div>

              <div className="flex flex-col items-center text-center p-2 border-l border-gray-100">
                <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-[#b71a22] mb-3 shadow-sm transition transform hover:scale-110">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
                <h4 className="text-3xl md:text-4xl font-extrabold text-gray-800">240+</h4>
                <p className="text-xs md:text-sm font-bold text-[#b71a22] uppercase tracking-wider mt-1">Doctors</p>
              </div>

              <div className="flex flex-col items-center text-center p-2 border-l border-gray-100">
                <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-[#b71a22] mb-3 shadow-sm transition transform hover:scale-110">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
                </div>
                <h4 className="text-3xl md:text-4xl font-extrabold text-gray-800">500+</h4>
                <p className="text-xs md:text-sm font-bold text-[#b71a22] uppercase tracking-wider mt-1">Students</p>
              </div>
            </div>

            <div className="pt-2">
              <Link to="/history" className="inline-block bg-[#b71a22] hover:bg-red-800 text-white font-bold py-3 px-8 rounded shadow-md transition transform hover:-translate-y-1">
                Read More
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ---------------- OUR DEPARTMENTS SECTION ---------------- */}
      <section className="py-20 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[#b71a22] border-l-4 border-[#b71a22] pl-4 uppercase tracking-wider mb-4">
                Our Departments
              </h2>
              <p className="text-gray-600 max-w-2xl text-lg">
                Discover our comprehensive range of specialized medical departments, staffed by expert faculty dedicated to nurturing the next generation of healthcare professionals.
              </p>
            </div>
            <Link to="#" className="hidden md:inline-block text-[#b71a22] font-bold hover:underline mb-2">View All Departments &rarr;</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
              <div
                onClick={handleClick}
                className="cursor-pointer bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition transform hover:-translate-y-1 group"
              >
              <div className="w-14 h-14 bg-red-50 text-[#b71a22] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#b71a22] group-hover:text-white transition-colors duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Pre-Clinical</h3>
              <ul className="space-y-2 text-gray-600 font-medium">
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-[#b71a22] rounded-full mr-2"></span> Anatomy</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-[#b71a22] rounded-full mr-2"></span> Physiology</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-[#b71a22] rounded-full mr-2"></span> Biochemistry</li>
                
              </ul>
            </div>
              
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition transform hover:-translate-y-1 group">
              <div className="w-14 h-14 bg-red-50 text-[#b71a22] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#b71a22] group-hover:text-white transition-colors duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Para-Clinical</h3>
              <ul className="space-y-2 text-gray-600 font-medium">
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-[#b71a22] rounded-full mr-2"></span> Pathology</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-[#b71a22] rounded-full mr-2"></span> Microbiology</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-[#b71a22] rounded-full mr-2"></span> Pharmacology</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-[#b71a22] rounded-full mr-2"></span> Forensic Medicine</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition transform hover:-translate-y-1 group">
              <div className="w-14 h-14 bg-red-50 text-[#b71a22] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#b71a22] group-hover:text-white transition-colors duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Clinical</h3>
              <ul className="space-y-2 text-gray-600 font-medium">
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-[#b71a22] rounded-full mr-2"></span> General Medicine</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-[#b71a22] rounded-full mr-2"></span> General Surgery</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-[#b71a22] rounded-full mr-2"></span> Pediatrics & Orthopedics</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-[#b71a22] rounded-full mr-2"></span> Obstetrics & Gynecology</li>
              </ul>
            </div>

          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="#" className="text-[#b71a22] font-bold hover:underline">View All Departments &rarr;</Link>
          </div>

        </div>
      </section>

      {/* ---------------- PRINCIPAL'S MESSAGE SECTION ---------------- */}
      <section className="py-20 px-4 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12">

          <div className="w-full md:w-1/3 flex-shrink-0 flex justify-center md:justify-start">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-gray-50 w-full max-w-[300px]">
              <img src={principal} alt="Prof. Dr. Elizabeth Joseph" className="w-full h-auto object-cover" />
              <div className="absolute bottom-0 left-0 bg-[#b71a22] text-white w-full text-center py-3 text-sm md:text-base font-bold tracking-wide">
                Prof. Dr. Elizabeth Joseph
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/3 space-y-6">
            <h2 className="text-3xl font-bold text-[#b71a22] border-l-4 border-[#b71a22] pl-4 uppercase tracking-wider">
              Principal's Message
            </h2>
            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800 leading-tight">
              Empowering Future Healers
            </h3>
            <div className="text-gray-600 leading-relaxed text-lg space-y-4">
              <p>
                Believers Church Medical College Hospital was started with a great vision of bringing hope and healing with the love of Christ. The ultimate goal of the medical profession is to serve humanity. This ethos of service drives everything we do at Believers Medical College, from admissions, to teaching, to training and mentoring.
              </p>
              <p>
                Our endeavour is to impart to our students the necessary skills, knowledge and mindset that will enable them to become leading practitioners in the medical field. To this end, we engage with them more as facilitators in their growth and development, and less as instructors.
              </p>
              <p className="italic font-medium border-l-4 border-gray-300 pl-4 py-2 my-4">
                William Osler famously quoted: "The practice of medicine is an art, based on science."
              </p>
              <p>
                We invite you to join us, as we continue on this exciting journey of student-centered medical education of today for patient-centered health care of tomorrow. The future is bright for the medical profession, and we invite you to explore your future with us at Believers.
              </p>
              <p className="font-bold text-[#b71a22] pt-2">Believe and strive.</p>
            </div>

            <div className="pt-4">
              <Link to="/principal" className="inline-block bg-[#b71a22] hover:bg-red-800 text-white font-bold py-3 px-8 rounded shadow-md transition transform hover:-translate-y-1">
                Read Full Message
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ---------------- FACILITIES SECTION ---------------- */}
      <section className="py-20 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#b71a22] uppercase tracking-wider mb-4">
              World-Class Facilities
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              Our campus is equipped with state-of-the-art infrastructure designed to provide
              an optimal environment for learning, healing, and personal growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilitiesData.map((facility, index) => (
              <FacilityCard
                key={index}
                title={facility.title}
                description={facility.description}
                imagePaths={facility.imagePaths}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/facilities" className="inline-block bg-white text-[#b71a22] border-2 border-[#b71a22] hover:bg-[#b71a22] hover:text-white font-bold py-3 px-8 rounded shadow transition transform hover:-translate-y-1">
              Explore All Facilities
            </Link>
          </div>

        </div>
      </section>

      {/* ---------------- NEWS & EVENTS SECTION ---------------- */}
      <section className="py-20 px-4 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[#b71a22] border-l-4 border-[#b71a22] pl-4 uppercase tracking-wider mb-4">
                News & Events
              </h2>
              <p className="text-gray-600 max-w-2xl text-lg">
                Stay updated with the latest happenings, academic announcements, and upcoming events at Believers Church Medical College.
              </p>
            </div>
            <Link to="#" className="hidden md:inline-block text-[#b71a22] font-bold hover:underline mb-2">View All &rarr;</Link>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
             
             {/* Latest News Card (Left) */}
             <div className="w-full lg:w-7/12">
                <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-[0_8px_30px_rgba(183,26,34,0.15)] transition duration-500">
                   <div className="relative h-64 md:h-80 overflow-hidden">
                      <img src={college1} alt="News Highlight" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute top-4 left-4 bg-[#b71a22] text-white text-xs font-bold uppercase tracking-widest py-1 px-3 rounded shadow-md">
                        Latest News
                      </div>
                   </div>
                   <div className="p-8">
                      <div className="text-sm text-gray-500 font-semibold mb-3 flex items-center">
                         <svg className="w-4 h-4 mr-2 text-[#b71a22]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                         March 15, 2026
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-[#b71a22] transition-colors leading-tight">
                        BCMCH Awarded Top Medical College for Clinical Excellence
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        Believers Church Medical College Hospital has been recognized nationally for its outstanding contribution to clinical excellence, research, and holistic patient care methodologies introduced this year.
                      </p>
                      <Link to="#" className="text-[#b71a22] font-bold hover:underline">Read Full Story &rarr;</Link>
                   </div>
                </div>
             </div>
             
             {/* Upcoming Events List (Right) */}
             <div className="w-full lg:w-5/12 flex flex-col space-y-4">
                
                {/* Event 1 */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition duration-300 flex items-start group cursor-pointer">
                   <div className="flex-shrink-0 bg-red-50 text-[#b71a22] rounded-xl text-center p-3 w-16 border border-red-100 group-hover:bg-[#b71a22] group-hover:text-white transition-colors">
                      <span className="block text-xs font-bold uppercase tracking-wider">APR</span>
                      <span className="block text-2xl font-extrabold leading-none mt-1">05</span>
                   </div>
                   <div className="ml-5">
                      <h4 className="text-lg font-bold text-gray-800 group-hover:text-[#b71a22] transition-colors mb-1">Annual Medical Symposium</h4>
                      <p className="text-gray-500 text-sm mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        09:00 AM - 04:00 PM
                      </p>
                      <p className="text-gray-600 text-sm line-clamp-2">Join leading healthcare professionals for a day of intensive clinical discussions and research presentations.</p>
                   </div>
                </div>

                {/* Event 2 */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition duration-300 flex items-start group cursor-pointer">
                   <div className="flex-shrink-0 bg-red-50 text-[#b71a22] rounded-xl text-center p-3 w-16 border border-red-100 group-hover:bg-[#b71a22] group-hover:text-white transition-colors">
                      <span className="block text-xs font-bold uppercase tracking-wider">APR</span>
                      <span className="block text-2xl font-extrabold leading-none mt-1">12</span>
                   </div>
                   <div className="ml-5">
                      <h4 className="text-lg font-bold text-gray-800 group-hover:text-[#b71a22] transition-colors mb-1">Blood Donation Drive</h4>
                      <p className="text-gray-500 text-sm mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        10:00 AM - 02:00 PM
                      </p>
                      <p className="text-gray-600 text-sm line-clamp-2">Contribute to the community health initiative coordinated by students and faculty at the main campus.</p>
                   </div>
                </div>

                {/* Event 3 */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition duration-300 flex items-start group cursor-pointer">
                   <div className="flex-shrink-0 bg-red-50 text-[#b71a22] rounded-xl text-center p-3 w-16 border border-red-100 group-hover:bg-[#b71a22] group-hover:text-white transition-colors">
                      <span className="block text-xs font-bold uppercase tracking-wider">MAY</span>
                      <span className="block text-2xl font-extrabold leading-none mt-1">02</span>
                   </div>
                   <div className="ml-5">
                      <h4 className="text-lg font-bold text-gray-800 group-hover:text-[#b71a22] transition-colors mb-1">Alumni Meet & Greet</h4>
                      <p className="text-gray-500 text-sm mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        06:00 PM - 09:00 PM
                      </p>
                      <p className="text-gray-600 text-sm line-clamp-2">A wonderful evening catching up with former graduates and celebrating collective milestones and journeys.</p>
                   </div>
                </div>
                
                <Link to="#" className="mt-4 text-center bg-gray-50 text-[#b71a22] border border-gray-200 hover:bg-[#b71a22] hover:text-white font-bold py-3 px-6 rounded-xl transition duration-300 w-full">
                   All Upcoming Events
                </Link>

             </div>

          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="#" className="text-[#b71a22] font-bold hover:underline">View All News &rarr;</Link>
          </div>

        </div>
      </section>

      {/* ---------------- ACCREDITATIONS & AFFILIATIONS SECTION ---------------- */}
      <section className="py-16 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#b71a22] uppercase tracking-wider mb-4">
              Accreditations & Affiliations
            </h2>
            <div className="w-24 h-1 bg-[#b71a22] mx-auto rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* NAAC Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition duration-300 flex flex-col items-center text-center group">
               <div className="w-24 h-24 mb-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <img src={naacLogo} alt="NAAC Logo" className="object-contain w-full h-full" />
               </div>
               <h3 className="text-2xl font-extrabold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors">NAAC</h3>
               <p className="text-gray-500 font-medium">National Assessment and Accreditation Council</p>
            </div>

            {/* KUHS QAS Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition duration-300 flex flex-col items-center text-center group">
               <div className="w-24 h-24 mb-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <img src={kuhsLogo} alt="KUHS Logo" className="object-contain w-full h-full" />
               </div>
               <h3 className="text-2xl font-extrabold text-gray-800 mb-2 group-hover:text-green-700 transition-colors">KUHS QAS A+</h3>
               <p className="text-gray-500 font-medium">Quality Assurance System Assessment</p>
            </div>

            {/* NIRF Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition duration-300 flex flex-col items-center text-center group">
               <div className="flex-grow w-32 h-24 mb-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <img src={nirfLogo} alt="NIRF Logo" className="object-contain w-full h-full mx-auto" />
               </div>
               <h3 className="text-2xl font-extrabold text-gray-800 mb-4 group-hover:text-purple-700 transition-colors">NIRF Ranking</h3>
               <div className="flex flex-col w-full space-y-3 mt-auto">
                 <Link to="/nirf-2024" className="w-full bg-gray-50 hover:bg-purple-600 hover:text-white text-gray-700 font-semibold py-2 px-4 rounded transition-colors border border-gray-200 shadow-sm">
                   NIRF 2024
                 </Link>
                 <Link to="/nirf-2025" className="w-full bg-gray-50 hover:bg-purple-600 hover:text-white text-gray-700 font-semibold py-2 px-4 rounded transition-colors border border-gray-200 shadow-sm">
                   NIRF 2025
                 </Link>
               </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;
