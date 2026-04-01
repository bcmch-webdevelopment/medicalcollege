import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Library from "./pages/Library"; 
import Committes from "./components/Committees"
// Pages
import Home from './pages/Home';
import VirtualTour from './pages/VirtualTour';

// About Us Pages
import History from './pages/History';
import VisionMission from './pages/VisionMission';
import MetropolitanMessage from './pages/MetropolitanMessage';
import PrincipalMessage from './pages/PrincipalMessage';
import Administration from './pages/Administration'

import Affiliation from './pages/Affiliation';
import LettersOfPermission from './pages/LettersOfPermission';
import LettersOfAffiliation from './pages/LettersOfAffiliation';
import Infrastructure from './pages/Infrastructure';
import CitizenCharter from './pages/CitizenCharter';
import Contact from './pages/ContactUs';



// Academics page
import Academics from './components/Academics'
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
import Pharmacology from './pages/Pharmacology';
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

// Admin Components
import AdminLayout from './pages/Admin/AdminLayout';
import AdminLogin from './pages/Admin/Login';
import AdminRegister from './pages/Admin/Register';
import Dashboard from './pages/Admin/Dashboard';
import ManageFacilities from './pages/Admin/ManageFacilities';
import ManageAboutUs from './pages/Admin/ManageAboutUs';

import DynamicAboutUs from './pages/DynamicAboutUs';

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {!isAdmin && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/virtual-tour" element={<VirtualTour />} />

        {/* About */}
        <Route path="/about/:slug" element={<DynamicAboutUs />} />
        
        {/* Legacy About Pages - You can remove these later if fully migrating */}
        <Route path="/history" element={<History />} />
        <Route path="/vision-mission" element={<VisionMission />} />
        <Route path="/metropolitan" element={<MetropolitanMessage />} />
        <Route path="/principal-message" element={<PrincipalMessage />} />
        <Route path="/admin-team" element={<Administration />} />
        <Route path="/affiliation" element={<Affiliation />} />
        <Route path="/letter-of-permission" element={<LettersOfPermission />} />
        <Route path="/letter-of-affiliation" element={<LettersOfAffiliation />} />
        <Route path="/infrastructure" element={<Infrastructure />} />
        <Route path="/citizen-charter" element={<CitizenCharter />} />
        <Route path="/contact-us" element={<Contact />} />

        
        

        {/* Academics*/}
           <Route path="/academics" element={<Academics />} />
           <Route path="/library" element={<Library />} />
           <Route path="/committees" element={<Committes />} />
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

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="facilities" element={<ManageFacilities />} />
          <Route path="about-us" element={<ManageAboutUs />} />
          <Route path="banners" element={<div className="p-4 text-center">Banner Management Coming Soon...</div>} />
        </Route>
      </Routes>

      {!isAdmin && <Footer />}
    </div>
  );
}

export default App;