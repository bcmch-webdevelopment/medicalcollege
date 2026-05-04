import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Library from "./pages/Library"; 
import Committes from "./components/Committees"
// Pages
import Home from './pages/Home';
import VirtualTour from './pages/VirtualTour';

// Admissions Pages
import AdmissionsLanding from './pages/Admissions/AdmissionsLanding';
import DynamicAdmissionPage from './pages/Admissions/DynamicAdmissionPage';

// News & Events Pages
import NewsEventsListing from './pages/NewsEvents/NewsEventsListing';
import NewsEventDetails from './pages/NewsEvents/NewsEventDetails';

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



import PreClinic from './pages/PreClinic';
import ParaClinic from './pages/ParaClinic';
import Clinical from './pages/Clinic';

import Department from './pages/Departments';
import DynamicDepartmentProfile from './pages/DynamicDepartmentProfile';

// Admin Components
import AdminLayout from './pages/Admin/AdminLayout';
import AdminLogin from './pages/Admin/Login';
import AdminRegister from './pages/Admin/Register';
import Dashboard from './pages/Admin/Dashboard';
import ManagePages from './pages/Admin/ManagePages';
import ManageAdmissions from './pages/Admin/ManageAdmissions';
import ManageStudentListUploads from './pages/Admin/ManageStudentListUploads';
import ManageNewsEvents from './pages/Admin/ManageNewsEvents';
import ManageDepartments from './pages/Admin/ManageDepartments';

import DynamicPage from './pages/DynamicPage';

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {!isAdmin && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/virtual-tour" element={<VirtualTour />} />

        {/* Admission Routes */}
        <Route path="/admissions" element={<AdmissionsLanding />} />
        <Route path="/admissions/:slug" element={<DynamicAdmissionPage />} />

        {/* News & Events Routes */}
        <Route path="/news-and-events" element={<NewsEventsListing />} />
        <Route path="/news-and-events/:slug" element={<NewsEventDetails />} />

        {/* Unified Dynamic Pages Route */}
        <Route path="/:section/:slug" element={<DynamicPage />} />
        
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
           <Route path="/library" element={<Library />} />
           <Route path="/committees" element={<Committes />} />

        {/* Pre-Clinic */}
        <Route path="/pre-clinic" element={<PreClinic />} />

        {/* Para-Clinic */}
        <Route path="/para-clinic" element={<ParaClinic />} />

        {/* Clinical */}
        <Route path="/clinical" element={<Clinical />} />

        {/* Dynamic Department Profile */}
        <Route path="/department/:slug" element={<DynamicDepartmentProfile />} />

        {/* Departments */}
        <Route path="/departments" element={<Department />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="pages/:section" element={<ManagePages />} />
          <Route path="admissions" element={<ManageAdmissions />} />
          <Route path="admissions/uploads" element={<ManageStudentListUploads />} />
          <Route path="news-events" element={<ManageNewsEvents />} />
          <Route path="departments" element={<ManageDepartments />} />
          <Route path="banners" element={<div className="p-4 text-center">Banner Management Coming Soon...</div>} />
        </Route>
      </Routes>

      {!isAdmin && <Footer />}
    </div>
  );
}

export default App;