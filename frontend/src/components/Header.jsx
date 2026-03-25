import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/bcmch-logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false); // For mobile About Us dropdown

  const aboutLinks = [
    { name: 'History & Values', path: '/history' },
    { name: 'Vision, Mission & Objective', path: '/vision-mission' },
    { name: "Metropolitan's Message", path: '/metropolitan' },
    { name: "Principal's Message", path: '/principal' },
    { name: 'Administrative Team', path: '/admin-team' },
    { name: 'Affiliation', path: '/affiliation' },
    { name: 'Infrastructure & Facilities', path: '/infrastructure' },
    { name: 'Citizen Charter', path: '/citizen-charter' },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <header className="w-full font-sans shadow-md">
      {/* Top Bar */}
      <div className="bg-red-700 text-white text-xs md:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-2 md:mb-0">
            <a href="#" className="hover:text-red-200 transition">NMC Proforma BCMCH - 2025-2026</a>
            <span className="hidden md:inline">|</span>
            <a href="#" className="hover:text-red-200 transition">Believers Medical Journal</a>
            <span className="hidden md:inline">|</span>
            <a href="#" className="hover:text-red-200 transition">Gallery</a>
          </div>
          <div className="flex space-x-4 items-center">
            <span>Toll Free: 1800 425 3010</span>
            <span className="hidden md:inline">|</span>
            <span>Anti-Ragging: 1800-180-5522</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <div className="w-64 h-20 md:w-80 md:h-24 flex items-center justify-start py-2">
              <img
                src={logo}
                alt="BCMCH Logo"
                className="h-full w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="hidden">
                <h1 className="text-lg md:text-xl font-bold text-gray-800 leading-tight">
                  Believers Church<br />Medical College Hospital
                </h1>
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-6 text-sm font-semibold text-gray-700 items-center">
            <Link to="/" className="hover:text-red-700 transition uppercase">Home</Link>

            <div className="group relative py-2">
              <button className="hover:text-red-700 transition uppercase flex items-center focus:outline-none">
                About Us
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              {/* About Us Hover Dropdown */}
              <div className="absolute left-0 top-full hidden group-hover:block w-72 bg-white shadow-xl border-t-2 border-red-700 rounded-b-md z-50">
                <ul className="py-2">
                  {aboutLinks.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path} className="block px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-700 transition">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link to="#" className="hover:text-red-700 transition uppercase">Admission</Link>
            <Link to="#" className="hover:text-red-700 transition uppercase">Academics</Link>
            <Link to="#" className="hover:text-red-700 transition uppercase">Accreditation</Link>
            <Link to="#" className="hover:text-red-700 transition uppercase">NMC</Link>
            <Link to="#" className="hover:text-red-700 transition uppercase">Library</Link>
            <Link to="#" className="hover:text-red-700 transition uppercase">News & Events</Link>
            <Link to="#" className="hover:text-red-700 transition uppercase">Committees</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-red-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200">
          <nav className="flex flex-col px-4 pt-2 pb-4 space-y-2 text-sm font-semibold text-gray-700">
            <Link to="/" className="block py-2 hover:text-red-700" onClick={() => setIsMenuOpen(false)}>HOME</Link>

            <div>
              <button
                className="w-full text-left flex justify-between items-center py-2 hover:text-red-700 uppercase focus:outline-none"
                onClick={() => setIsAboutOpen(!isAboutOpen)}
              >
                ABOUT US
                <svg className={`w-4 h-4 transform transition-transform ${isAboutOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              {isAboutOpen && (
                <ul className="pl-4 py-2 space-y-2 border-l-2 border-red-100 ml-2">
                  {aboutLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className="block py-2 text-gray-600 hover:text-red-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link to="#" className="block py-2 hover:text-red-700 uppercase" onClick={() => setIsMenuOpen(false)}>AFFILIATION</Link>
            <Link to="#" className="block py-2 hover:text-red-700 uppercase" onClick={() => setIsMenuOpen(false)}>FACILITIES</Link>
            <Link to="#" className="block py-2 hover:text-red-700 uppercase" onClick={() => setIsMenuOpen(false)}>ADMISSION</Link>
            <Link to="#" className="block py-2 hover:text-red-700 uppercase" onClick={() => setIsMenuOpen(false)}>NMC</Link>
            <Link to="#" className="block py-2 hover:text-red-700 uppercase" onClick={() => setIsMenuOpen(false)}>CONTACT US</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;