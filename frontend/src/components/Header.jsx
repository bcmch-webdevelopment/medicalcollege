import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../img/bcmch-logo.png";

// Dropdown components
import AboutUs from "../components/Aboutus";
import Academics from "../components/Academics";
import Accrediation from "../components/Accrediation";
import NMCMenu from "./NMCMenu";
import NewsMenu from "./News&Events";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      className={`sticky top-0 z-50 w-full bg-white font-sans transition-all duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      {/* 🔴 Top Bar */}
      <div className="bg-red-700 text-white text-xs md:text-sm py-2">
        <div className="max-w-[1200px] mx-auto px-3 flex flex-col md:flex-row justify-between items-center gap-2">

          <div className="flex flex-wrap gap-2">
            <a href="#" className="hover:text-red-200">NMC Proforma BCMCH - 2025-2026</a>
            <span className="hidden md:inline">|</span>
            <a href="#" className="hover:text-red-200">Believers Medical Journal</a>
            <span className="hidden md:inline">|</span>
            <a href="#" className="hover:text-red-200">Gallery</a>
          </div>

          <div className="flex flex-wrap gap-2">
            <span>Toll Free: 1800 425 3010</span>
            <span className="hidden md:inline">|</span>
            <span>Anti-Ragging: 1800-180-5522</span>
          </div>

        </div>
      </div>

      {/* ⚪ Main Navigation */}
      <div className="border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto pl-1 pr-3 py-3 flex items-center justify-between">

          {/* ✅ Logo (shifted left) */}
          <div className="flex items-center flex-shrink-0 -ml-2">
            <img
              src={logo}
              alt="BCMCH Logo"
              className={`w-auto object-contain transition-all duration-300 ${
                isScrolled ? "h-10" : "h-14 md:h-16"
              }`}
            />
          </div>

          {/* ✅ Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-semibold text-gray-700">

            <Link to="/" className="hover:text-red-700">HOME</Link>

            <AboutUs />
            <Link to="/admission" className="hover:text-red-700">ADMISSION</Link>
            <Academics />
            <Accrediation />
            <NMCMenu />
            <Link to="/library" className="hover:text-red-700">LIBRARY</Link>
            <NewsMenu />
            <Link to="/committees" className="hover:text-red-700">COMMITTEES</Link>

          </nav>

          {/* 📱 Mobile Menu Button */}
          <button
            className="lg:hidden text-red-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* 📱 Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b">
          <nav className="flex flex-col px-4 py-3 space-y-2 text-sm font-semibold text-gray-700">

            <Link to="/" onClick={() => setIsMenuOpen(false)}>HOME</Link>

            {/* About Dropdown */}
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