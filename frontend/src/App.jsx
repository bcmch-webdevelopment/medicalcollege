import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

// Pages
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

// Pre-Clinic
import PreClinic from './pages/PreClinic';
import Anatomy from './pages/Anesthesia';
import Physiology from './pages/Physiology';
import Biochemistry from './pages/BioChemistry';

// Para-Clinic / Clinical Base
import ParaClinic from './pages/ParaClinic';
import Clinical from './pages/Clinic';
import Pathology from './pages/Pathology';
import Microbiology from './pages/Microbiology';
// import Pharmacology from './pages/Pharmacology.jsx'
import ForensicMedicine from './pages/ForensicMedicine';

// Clinical Departments
import GeneralMedicine from './pages/GeneralMedicine';
import GeneralSurgery from './pages/GeneralSurgery';
import ObstetricsGynaecology from './pages/ObstetricsGynecology';
import Orthopedics from './pages/Orthopedics';
import Anesthesia from './pages/Anesthesia';
import CommunityMedicine from './pages/CommunityMedicine';
import Dentistry from './pages/Dentistry';
import EmergencyMedicine from './pages/EmergencyMedicine';
import Ophthalmology from './pages/Ophthalmology';
import OtoRhinolaryngology from './pages/OtoRhinolaryngology';
import Dermatology from './pages/Dermatology';
import PMR from './pages/Pmr';
import Pediatrics from './pages/Pediatrics';

import Department from './pages/Departments';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/virtual-tour" element={<VirtualTour />} />

        {/* About */}
        <Route path="/history" element={<History />} />
        <Route path="/vision-mission" element={<VisionMission />} />
        <Route path="/metropolitan" element={<MetropolitanMessage />} />
        <Route path="/principal" element={<PrincipalMessage />} />
        <Route path="/admin-team" element={<AdminTeam />} />
        <Route path="/affiliation" element={<Affiliation />} />
        <Route path="/infrastructure" element={<Infrastructure />} />
        <Route path="/citizen-charter" element={<CitizenCharter />} />
        <Route path="/contact" element={<Contact />} />

        {/* Pre-Clinic */}
        <Route path="/pre-clinic" element={<PreClinic />} />
        <Route path="/anatomy" element={<Anatomy />} />
        <Route path="/physiology" element={<Physiology />} />
        <Route path="/biochemistry" element={<Biochemistry />} />

        {/* Para-Clinic */}
        <Route path="/para-clinic" element={<ParaClinic />} />
        <Route path="/pathology" element={<Pathology />} />
        <Route path="/microbiology" element={<Microbiology />} />
        {/* <Route path="/pharmacology" element={<Pharmacology />} /> */}
        <Route path="/forensic-medicine" element={<ForensicMedicine />} />

        {/* Clinical */}
        <Route path="/clinical" element={<Clinical />} />
        <Route path="/general-medicine" element={<GeneralMedicine />} />
        <Route path="/general-surgery" element={<GeneralSurgery />} />
        <Route path="/obstetrics-gynecology" element={<ObstetricsGynaecology />} />
        <Route path="/orthopedics" element={<Orthopedics />} />
        <Route path="/anaesthesiology" element={<Anesthesia />} />
        <Route path="/community-medicine" element={<CommunityMedicine />} />
        <Route path="/dentistry" element={<Dentistry />} />
        <Route path="/emergency-medicine" element={<EmergencyMedicine />} />
        <Route path="/ophthalmology" element={<Ophthalmology />} />
        <Route path="/oto-rhinolaryngology" element={<OtoRhinolaryngology />} />
        <Route path="/dermatology" element={<Dermatology />} />
        <Route path="/pmr" element={<PMR />} />
        <Route path="/pediatrics" element={<Pediatrics />} />

        {/* Departments */}
        <Route path="/departments" element={<Department />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;