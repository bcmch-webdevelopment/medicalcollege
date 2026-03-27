import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

// Pages
import Home from './src/pages/Home.jsx';
import VirtualTour from './src/pages/VirtualTour.jsx';

// About Us Pages
import History from './src/pages/History.jsx';
import VisionMission from './src/pages/VisionMission.jsx';
import MetropolitanMessage from './src/pages/MetropolitanMessage.jsx';
import PrincipalMessage from './src/pages/PrincipalMessage.jsx';
import AdminTeam from './src/pages/AdminTeam.jsx';
import Affiliation from './src/pages/Affiliation.jsx';
import Infrastructure from './src/pages/Infrastructure.jsx';
import CitizenCharter from './src/pages/CitizenCharter.jsx';
import Contact from './src/pages/Contact.jsx';

// Pre-Clinic
import PreClinic from './src/pages/PreClinic.jsx';
import Anatomy from './src/pages/AnatomyProfile.jsx';
import Physiology from './src/pages/Physiology.jsx';
import Biochemistry from './src/pages/BioChemistry.jsx';

// Para-Clinic / Clinical Base
import ParaClinic from './pages/ParaClinic.jsx';
import Clinical from './pages/Clinic.jsx';
import Pathology from './pages/Pathology.jsx';
import Microbiology from './pages/Microbiology.jsx';
import Pharmacology from './pages/Pharmacology.jsx'
import ForensicMedicine from './pages/Forensicmedicine.jsx';

// Clinical Departments
import GeneralMedicine from './src/pages/GeneralMedicine.jsx';
import GeneralSurgery from './src/pages/GeneralSurgery.jsx';
import ObstetricsGynaecology from './src/pages/ObstetricsGynecology.jsx';
import Orthopedics from './src/pages/Orthopedics.jsx';
import Anesthesia from './src/pages/Anesthesia.jsx';
import CommunityMedicine from './src/pages/CommunityMedicine.jsx';
import Dentistry from './src/pages/Dentistry.jsx';
import EmergencyMedicine from './src/pages/EmergencyMedicine.jsx';
import Ophthalmology from './src/pages/Ophthalmology.jsx';
import OtoRhinolaryngology from './src/pages/OtoRhinolaryngology.jsx';
import Dermatology from './src/pages/Dermatology.jsx';
import PMR from './src/pages/Pmr.jsx';
import Pediatrics from './src/pages/Pediatrics.jsx';

import Department from './src/pages/Departments.jsx';

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