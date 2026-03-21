import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Home from '../src/components/Home';
import About from '../src/components/About';
import Services from '../src/components/Service';
import Contact from '../src/components/Contact';
import logoImage from '../src/img/bcmch-logo.png';
import Cardiology from './components/Cardiology';
import Department from '../src/components/DepartmentPage'
import Admin from '../src/components/Admin'

function App() {
  return (
    <Router>
      {/* Navbar with logo instead of text */}
      <Navbar logo={logoImage} />

      <Routes>
        {/* Main pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        {/* Department pages (dynamic) */}
        <Route path="/department/:id" element={<Department />} />
        {/* Admin page */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;