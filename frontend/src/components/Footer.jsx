import React from 'react';
import { Link } from 'react-router-dom';
import believersLogo from '../img/believers-church-logo.png';
import aytvLogo from '../img/aytv-logo.png';
import bridgeHopeLogo from '../img/bridge-hope-logo.png';

const Footer = () => {
  return (
    <footer className="bg-red-900 text-white font-sans mt-auto">
      {/* Upper Footer: Links and Info */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Quick Links 1 */}
        <div>
          <h2 className="text-xl font-bold mb-4 uppercase text-red-200">Quick Links</h2>
          <ul className="space-y-2 text-sm text-gray-200">
            <li><Link to="/affiliation" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Affiliation</Link></li>
            <li><Link to="/approvals" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Approvals</Link></li>
            <li><Link to="/admissions" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Admissions</Link></li>
            <li><Link to="/infrastructure" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Infrastructure</Link></li>
            <li><Link to="/facilities" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Facilities</Link></li>
            <li><Link to="/publications" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Publications</Link></li>
          </ul>
        </div>

        {/* Quick Links 2 */}
        <div>
          <h2 className="text-xl font-bold mb-4 uppercase text-red-200">Student Info</h2>
          <ul className="space-y-2 text-sm text-gray-200">
            <li><Link to="/student-manual" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Student manual</Link></li>
            <li><Link to="/anti-ragging" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Anti Ragging</Link></li>
            <li><Link to="/exam-notifications" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Exam notifications</Link></li>
            <li><Link to="/exam-time-table" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Exam time table</Link></li>
            <li><Link to="/exam-results" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Exam results</Link></li>
            <li><Link to="/student-support" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Student support</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-bold mb-4 uppercase text-red-200">Get in Touch</h2>
          <ul className="space-y-3 text-sm text-gray-200">
            <li className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-red-300 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span>St.Thomas Nagar, PO Box-31,<br />Kuttapuzha, Thiruvalla,<br />Kerala, India</span>
            </li>
            <li className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <span>+91-469-2742800</span>
            </li>
            <li className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <span>Toll Free No - 1800 425 3010</span>
            </li>
            <li className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span>info@bcmch.org</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer: Copyright and Affiliated Logos */}
      <div className="bg-red-950 py-6 border-t border-red-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-xs text-red-200">
          <p className="mb-6 md:mb-0 text-center md:text-left">BCMC © 2018 All Rights Reserved.</p>

          <div className="flex flex-wrap justify-center items-center gap-6">
            <Link to="https://www.bec.org/" target="_blank" rel="noreferrer" className="hover:opacity-80 transition transform hover:scale-105">
              <img src={believersLogo} alt="Believers Eastern Church" className="h-10 md:h-12 w-auto object-contain bg-white rounded p-1" />
            </Link>
            <Link to="http://www.ay.tv/" target="_blank" rel="noreferrer" className="hover:opacity-80 transition transform hover:scale-105">
              <img src={aytvLogo} alt="Aathmeeyayatra" className="h-10 md:h-12 w-auto object-contain bg-white rounded p-1" />
            </Link>
            <Link to="#" target="_blank" rel="noreferrer" className="hover:opacity-80 transition transform hover:scale-105">
              <img src={bridgeHopeLogo} alt="Bridge of Hope" className="h-10 md:h-12 w-auto object-contain bg-white rounded p-1" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
