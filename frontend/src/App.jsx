import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

// Pages
import Home from './pages/Home.jsx';
import VirtualTour from './pages/VirtualTour.jsx';

// About Us Pages
import History from './pages/History.jsx';
import VisionMission from './pages/VisionMission.jsx';
import MetropolitanMessage from './pages/MetropolitanMessage.jsx';
import PrincipalMessage from './pages/PrincipalMessage.jsx';
import AdminTeam from './pages/AdminTeam.jsx';
import Affiliation from './pages/Affiliation.jsx';
import Infrastructure from './pages/Infrastructure.jsx';
import CitizenCharter from './pages/CitizenCharter.jsx';
import Contact from './pages/Contact.jsx';

// Pre-Clinic
import PreClinic from './pages/PreClinic.jsx';
import Anatomy from './pages/AnatomyProfile.jsx';
import Physiology from './pages/Physiology.jsx';
import Biochemistry from './pages/BioChemistry.jsx';

// Para-Clinic / Clinical Base
import ParaClinic from './pages/ParaClinic.jsx';
import Clinical from './pages/Clinic.jsx';
import Pathology from './pages/Pathology.jsx';
import Microbiology from './pages/Microbiology.jsx';
import Pharmacology from './pages/Pharmacology.jsx'
import ForensicMedicine from './pages/Forensicmedicine.jsx';

// Clinical Departments
import GeneralMedicine from './pages/GeneralMedicine.jsx';
import GeneralSurgery from './pages/GeneralSurgery.jsx';
import ObstetricsGynaecology from './pages/ObstetricsGynecology.jsx';
import Orthopedics from './pages/Orthopedics.jsx';
import Anesthesia from './pages/Anesthesia.jsx';
import CommunityMedicine from './pages/CommunityMedicine.jsx';
import Dentistry from './pages/Dentistry.jsx';
import EmergencyMedicine from './pages/EmergencyMedicine.jsx';
import Ophthalmology from './pages/Ophthalmology.jsx';
import OtoRhinolaryngology from './pages/OtoRhinolaryngology.jsx';
import Dermatology from './pages/Dermatology.jsx';
import PMR from './pages/Pmr.jsx';
import Pediatrics from './pages/Pediatrics.jsx';

import Department from './pages/Departments.jsx';

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
        <Route path="/pharmacology" element={<Pharmacology />} />
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