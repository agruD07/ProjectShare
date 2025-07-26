import { Link } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3" to="/">
          <span style={{ color: '#e50914' }}>Project</span>Share
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/features">Features</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/projects">Projects</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact Us</Link></li>
          </ul>

          <ul className="navbar-nav">
            {/* Login Dropdown */}
            <li className="nav-item dropdown">
              <button className="btn btn-outline-light dropdown-toggle me-2" data-bs-toggle="dropdown">
                Login
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="dropdown-item" to="/login/admin">Admin</Link></li>
                <li><Link className="dropdown-item" to="/login/creator">Project Creator</Link></li>
                <li><Link className="dropdown-item" to="/login/collaborator">Collaborator</Link></li>
                <li><Link className="dropdown-item" to="/login/mentor">Mentor/Expert</Link></li>
              </ul>
            </li>

            {/* Register Dropdown */}
            <li className="nav-item dropdown">
              <button className="btn btn-outline-success dropdown-toggle" data-bs-toggle="dropdown">
                Register
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="dropdown-item" to="/register/creator">Project Creator</Link></li>
                <li><Link className="dropdown-item" to="/register/collaborator">Collaborator</Link></li>
                <li><Link className="dropdown-item" to="/register/mentor">Mentor/Expert</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
