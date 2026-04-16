import { Link } from "react-router-dom";

import "../assets/styles/navbar.css";
import { getUser } from "../utils/getUser";

function Navbar() {
  const user = getUser();
  const role = user?.role;

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
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/features">
                Features
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/homeproject">
                Projects
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav align-items-center">
            {!user ? (
              <>
                {/* LOGIN + REGISTER */}
                <li className="nav-item dropdown me-2">
                  <button
                    className="btn btn-auth dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Login
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="/login/admin">
                        Admin
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/login/creator">
                        Project Creator
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/login/collaborator">
                        Collaborator
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/login/mentor">
                        Mentor
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <button
                    className="btn btn-auth dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Register
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="/register/creator">
                        Project Creator
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/register/collaborator"
                      >
                        Collaborator
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/register/mentor">
                        Mentor
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                {/* 🔔 NOTIFICATION */}
                <li className="nav-item me-3 position-relative">
                  <button className="btn btn-auth position-relative">
                    🔔
                    <span className="notification-badge">3</span>
                  </button>
                </li>

                {/* 🏠 DASHBOARD */}
                <li className="nav-item me-2">
                  <Link className="btn btn-auth" to={`/${role}/dashboard`}>
                    Dashboard
                  </Link>
                </li>

                {/* ⏻ LOGOUT */}
                <li className="nav-item">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      localStorage.removeItem("TOKEN");
                      window.location.href = "/";
                    }}
                  >
                    ⏻
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
