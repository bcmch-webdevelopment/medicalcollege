import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../img/bcmch-logo.png";

// Dropdown components
import AboutUs from "../components/Aboutus";
import Academics from "../components/Academics";
import Accrediation from "../components/Accrediation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItem =
    "px-2 py-2 uppercase text-sm font-semibold text-gray-800 hover:text-red-700 transition whitespace-nowrap tracking-wide";

  return (
    <header className="w-full font-sans shadow-sm overflow-x-hidden">

      {/* Top Bar */}
      <div className="bg-red-700 text-white text-xs md:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-2">

          <div className="flex gap-4 flex-wrap">
            <a href="#" className="hover:text-red-200">
              NMC Proforma BCMCH - 2025-2026
            </a>
            <a href="#" className="hover:text-red-200 hidden md:block">
              Believers Medical Journal
            </a>
            <a href="#" className="hover:text-red-200 hidden md:block">
              Gallery
            </a>
          </div>

          <div className="flex gap-4 flex-wrap justify-end">
            <span>Toll Free: 1800 425 3010</span>
            <span className="hidden md:block">
              Anti-Ragging: 1800-180-5522
            </span>
          </div>

        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

          {/* Logo */}
         {/* Logo */}
<div className="flex items-center flex-shrink-0 mr-8">
  <img
    src={logo}
    alt="BCMCH Logo"
    className="h-14 md:h-16 lg:h-18 w-auto object-contain"
  />
</div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 flex-1 min-w-0 overflow-hidden text-sm font-semibold text-gray-700">

            <Link to="/" className={navItem}>
              HOME
            </Link>

            <AboutUs />

            <Link to="/admission" className={navItem}>
              ADMISSION
            </Link>

            <Academics />

            <Accrediation />

            <Link to="/nmc" className={navItem}>
              NMC
            </Link>

            <Link to="/library" className={navItem}>
              LIBRARY
            </Link>

            <Link to="/news" className={navItem}>
              NEWS & EVENTS
            </Link>

            <Link to="/committees" className={navItem}>
              COMMITTEES
            </Link>

          </nav>

          {/* Mobile Button */}
          <button
            className="lg:hidden text-red-700 flex-shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b">
          <nav className="flex flex-col px-4 py-4 space-y-3 text-sm font-semibold text-gray-700">

            <Link to="/" onClick={() => setIsMenuOpen(false)}>HOME</Link>
            <Link to="/admission" onClick={() => setIsMenuOpen(false)}>ADMISSION</Link>
            <Link to="/nmc" onClick={() => setIsMenuOpen(false)}>NMC</Link>
            <Link to="/library" onClick={() => setIsMenuOpen(false)}>LIBRARY</Link>
            <Link to="/news" onClick={() => setIsMenuOpen(false)}>NEWS & EVENTS</Link>
            <Link to="/committees" onClick={() => setIsMenuOpen(false)}>COMMITTEES</Link>

          </nav>
        </div>
      )}

    </header>
  );
};

export default Header;