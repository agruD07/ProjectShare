import { useEffect, useState } from "react";
import API from "../../utils/apiClient";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import "../../assets/styles/userViewProfile.css";

function CViewCollaborator() {
  const [collaborators, setCollaborators] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCollaborators();
  }, []);

  const fetchCollaborators = async () => {
    try {
      const res = await API.get("/creator/collaborators"); // backend filter Activated=true
      setCollaborators(res.data.collaborators);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar />

        <div className="dashboard-content">
          <h2>Collaborators</h2>

          <div className="card-grid">
            {collaborators.map((user) => (
              <div className="collab-card" key={user._id}>

                <div className="card-header">
                  <img
                    src={
                      user.profilePic
                        ? `http://localhost:8080/uploads/${user.profilePic}`
                        : "https://via.placeholder.com/100"
                    }
                    alt="profile"
                  />
                  <h3>{user.fullName}</h3>
                </div>

                <p className="bio">{user.bio}</p>

                <div className="skills-box">
                  {user.skills?.map((s, i) => (
                    <span key={i} className="skill-chip">{s}</span>
                  ))}
                </div>

                <div className="card-buttons">
                  <button onClick={() => setSelectedUser(user)}>
                    View Profile
                  </button>

                  <button
                    onClick={() =>
                        navigate("/creator/chat", { state: user })
                    }
                  >
                    Chat
                </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔥 PROFILE POPUP */}
    {selectedUser && (
  <div className="modal-overlay">
    <div className="profile-modal left-align">

      <span className="close" onClick={() => setSelectedUser(null)}>×</span>

      <img
        src={`http://localhost:8080/uploads/${selectedUser.profilePic}`}
        alt=""
        className="modal-img"
      />

      <h2>{selectedUser.fullName}</h2>

      <p><strong>Email:</strong> {selectedUser.email}</p>

      {/* SKILLS */}
      <div>
        <strong>Skills:</strong>
        <div className="skills-box">
          {selectedUser.skills?.map((s, i) => (
            <span key={i} className="skill-chip">{s}</span>
          ))}
        </div>
      </div>

      {/* BIO */}
      <p><strong>Bio:</strong> {selectedUser.bio}</p>

      {/* PORTFOLIO */}
      <div>
        <strong>Portfolio:</strong>
        <div className="portfolio-links">
          {selectedUser.portfolio?.map((link, i) => (
            <a
              key={i}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-link"
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      <div className="modal-actions">
        <button
            onClick={() =>
                navigate("/creator/chat", { state: selectedUser })
            }
        >
            Chat
        </button>
        <button onClick={() => setSelectedUser(null)}>Close</button>
      </div>

    </div>
  </div>
    )}

      <Footer />
    </>
  );
}

export default CViewCollaborator;