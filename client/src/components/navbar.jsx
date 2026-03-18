import { Link } from "react-router-dom";
import "../assets/styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-gradient">
      <div className="container">
        <Link className="navbar-brand fs-3" to="/">
          <span className="brand-project">Project</span>
          <span className="brand-share">Share</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/features">Features</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact Us</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/projects">Projects</Link></li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item dropdown me-2">
              <button className="btn btn-auth dropdown-toggle" data-bs-toggle="dropdown">
                Login
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="dropdown-item" to="/login/admin">Admin</Link></li>
                <li><Link className="dropdown-item" to="/login/creator">Project Creator</Link></li>
                <li><Link className="dropdown-item" to="/login/collaborator">Collaborator</Link></li>
                <li><Link className="dropdown-item" to="/login/mentor">Mentor/Experts</Link></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <button className="btn btn-auth dropdown-toggle" data-bs-toggle="dropdown">
                Register
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="dropdown-item" to="/register/creator">Project Creator</Link></li>
                <li><Link className="dropdown-item" to="/register/collaborator">Collaborator</Link></li>
                <li><Link className="dropdown-item" to="/register/mentor">Mentor/Experts</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
