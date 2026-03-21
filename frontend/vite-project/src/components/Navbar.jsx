import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ siteName, logo }) => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">
          {logo ? (
            <img src={logo} alt={siteName || 'Logo'} style={{ maxHeight: '50px' }} />
          ) : (
            <span className="text-dark">{siteName}</span>
          )}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`} to="/services">Services</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;