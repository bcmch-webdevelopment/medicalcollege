import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import VirtualTour from './pages/VirtualTour';
// About Us Pages
import History from './pages/History';
import VisionMission from './pages/VisionMission';
import MetropolitanMessage from './pages/MetropolitanMessage';
import PrincipalMessage from './pages/PrincipalMessage';
import AdminTeam from './pages/AdminTeam';
import Affiliation from './pages/Affiliation';
import Infrastructure from './pages/Infrastructure';
import CitizenCharter from './pages/CitizenCharter';
import Contact from './pages/Contact';
import PreClinic from './pages/PreClinic';
import Anatomy from './pages/AnatomyProfile';
import Physiology from './pages/Physiology';
import Biochemistry from './pages/BioChemistry';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/virtual-tour" element={<VirtualTour />} />
        
        {/* About Us Subpages */}
        <Route path="/history" element={<History />} />
        <Route path="/vision-mission" element={<VisionMission />} />
        <Route path="/metropolitan" element={<MetropolitanMessage />} />
        <Route path="/principal" element={<PrincipalMessage />} />
        <Route path="/admin-team" element={<AdminTeam />} />
        <Route path="/affiliation" element={<Affiliation />} />
        <Route path="/infrastructure" element={<Infrastructure />} />
        <Route path="/citizen-charter" element={<CitizenCharter />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pre-clinic" element={<PreClinic />} />
        <Route path="/anatomy" element={<Anatomy />} />
        <Route path="/physiology" element={<Physiology />} />
        <Route path="biochemistry" element={<Biochemistry />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
