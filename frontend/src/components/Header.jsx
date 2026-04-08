import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../img/bcmch-logo.png";

// Dropdown components
import NavDropdown from "./NavDropdown";
import Accrediation from "../components/Accrediation";
import NMCMenu from "./NMCMenu";
import NewsMenu from "./News&Events";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Mobile menu sub-dropdown state
  const [openMobileSection, setOpenMobileSection] = useState(null);
  const [mobileLinks, setMobileLinks] = useState({ 'about-us': [], 'academics': [], 'facilities': [] });

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Fetch data for mobile menu
    const fetchMobileData = async (section) => {
      try {
        const res = await fetch(`http://localhost:5000/api/pages/${section}`);
        if (res.ok) {
          const data = await res.json();
          setMobileLinks(prev => ({ ...prev, [section]: Array.isArray(data) ? data : [] }));
        }
      } catch (err) {
        console.error(`Failed to fetch ${section} menu`, err);
      }
    };
    
    fetchMobileData('about-us');
    fetchMobileData('academics');
    fetchMobileData('facilities');
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileSection = (section) => {
     setOpenMobileSection(openMobileSection === section ? null : section);
  };

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

            <NavDropdown title="About Us" section="about-us" />
            <Link to="/admission" className="hover:text-red-700">ADMISSION</Link>
            <NavDropdown title="Academics" section="academics" />
            <NavDropdown title="Facilities" section="facilities" />
            <Accrediation />
            <NMCMenu />
            <Link to="/library" className="hover:text-red-700">LIBRARY</Link>
            <NewsMenu />
            <Link to="/committees" className="hover:text-red-700">COMMITTEES</Link>

          </nav>

          {/* 📱 Mobile Menu Button */}
          <button
            className="lg:hidden text-red-700 p-2 focus:outline-none"
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
        <div className="lg:hidden bg-white border-b absolute w-full left-0 top-[100%] shadow-lg">
          <nav className="flex flex-col px-4 py-3 space-y-2 text-sm font-semibold text-gray-700">

            <Link to="/" onClick={() => setIsMenuOpen(false)} className="py-2">HOME</Link>

            {/* Dynamic Dropdowns */}
            {['about-us', 'academics', 'facilities'].map((section) => {
              const links = mobileLinks[section] || [];
              const rootLinks = links.filter(link => !link.parentId);
              const isOpen = openMobileSection === section;
              
              const titles = {
                'about-us': 'ABOUT US',
                'academics': 'ACADEMICS',
                'facilities': 'FACILITIES'
              };

              return (
                <div key={section}>
                  <button
                    className="w-full flex justify-between items-center py-2 uppercase text-left"
                    onClick={() => toggleMobileSection(section)}
                  >
                    {titles[section]}
                    <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>

                  {isOpen && (
                    <ul className="pl-4 border-l-2 border-gray-100 mt-1 mb-2 space-y-1">
                      {rootLinks.length > 0 ? rootLinks.map((link) => (
                        <li key={link._id}>
                          <Link
                            to={`/${section}/${link.slug}`}
                            onClick={() => setIsMenuOpen(false)}
                            className="block py-2 text-gray-600 font-medium"
                          >
                            {link.title}
                          </Link>
                          
                          {/* Nested Children for Mobile View */}
                          <ul className="pl-4 space-y-1">
                            {links.filter(child => child.parentId === link._id).map((child) => (
                              <li key={child._id}>
                                <Link
                                  to={`/${section}/${child.slug}`}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="block py-1.5 text-gray-500 text-sm"
                                >
                                  - {child.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      )) : <li className="py-2 text-gray-400 text-xs italic">No items</li>}
                    </ul>
                  )}
                </div>
              );
            })}

            <Link to="/admission" className="py-2" onClick={() => setIsMenuOpen(false)}>ADMISSION</Link>
            <Link to="/accreditation" className="py-2" onClick={() => setIsMenuOpen(false)}>ACCREDITATION</Link>
            <Link to="/nmc" className="py-2" onClick={() => setIsMenuOpen(false)}>NMC</Link>
            <Link to="/library" className="py-2" onClick={() => setIsMenuOpen(false)}>LIBRARY</Link>

          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;