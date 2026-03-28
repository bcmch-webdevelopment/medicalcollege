import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../img/bcmch-logo.png";

// Dropdown components
import AboutUs from "../components/Aboutus";
import Academics from "../components/Academics";
import Accrediation from "../components/Accrediation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // ✅ Common Nav Style (VERY IMPORTANT)
  const navItem =
    "px-3 py-2 uppercase text-sm font-semibold text-gray-700 hover:text-red-700 transition flex items-center";

  const aboutLinks = [
    { name: "History & Values", path: "/history" },
    { name: "Vision, Mission & Objective", path: "/vision-mission" },
    { name: "Metropolitan's Message", path: "/metropolitan" },
    { name: "Principal's Message", path: "/principal" },
    { name: "Administrative Team", path: "/admin-team" },
    { name: "Affiliation", path: "/affiliation" },
    { name: "Infrastructure & Facilities", path: "/infrastructure" },
    { name: "Citizen Charter", path: "/citizen-charter" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header className="w-full font-sans shadow-md">
      
      {/* Top Bar */}
      <div className="bg-red-700 text-white text-xs md:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-2 md:mb-0">
            <a href="#" className="hover:text-red-200">NMC Proforma BCMCH - 2025-2026</a>
            <span className="hidden md:inline">|</span>
            <a href="#" className="hover:text-red-200">Believers Medical Journal</a>
            <span className="hidden md:inline">|</span>
            <a href="#" className="hover:text-red-200">Gallery</a>
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
          
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-64 h-20 md:w-80 md:h-24 flex items-center">
              <img
                src={logo}
                alt="BCMCH Logo"
                className="h-full w-auto object-contain"
              />
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-semibold text-gray-700">

            <Link to="/" className={navItem}>Home</Link>

            {/* About */}
            <AboutUs />

            <Link to="/admission" className={navItem}>Admission</Link>

            {/* Academics */}
            <Academics />

            {/* Accreditation */}
            <Accrediation />

            <Link to="/nmc" className={navItem}>NMC</Link>
            <Link to="/library" className={navItem}>Library</Link>
            <Link to="/news" className={navItem}>News & Events</Link>
            <Link to="/committees" className={navItem}>Committees</Link>

          </nav>

          {/* Mobile Button */}
          <button
            className="lg:hidden text-red-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b">
          <nav className="flex flex-col px-4 pt-2 pb-4 space-y-2 text-sm font-semibold text-gray-700">

            <Link to="/" onClick={() => setIsMenuOpen(false)}>HOME</Link>

            {/* Mobile About */}
            <div>
              <button
                className="w-full flex justify-between py-2 uppercase"
                onClick={() => setIsAboutOpen(!isAboutOpen)}
              >
                ABOUT US
              </button>

              {isAboutOpen && (
                <ul className="pl-4 border-l mt-2">
                  {aboutLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2 text-gray-600"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link to="/admission" onClick={() => setIsMenuOpen(false)}>ADMISSION</Link>
            <Link to="/nmc" onClick={() => setIsMenuOpen(false)}>NMC</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>CONTACT</Link>

          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;