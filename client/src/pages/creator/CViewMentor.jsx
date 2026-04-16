import { useEffect, useState } from "react";
import API from "../../utils/apiClient";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import "../../assets/styles/userViewProfile.css";

function CViewMentor() {
  const [mentors, setMentors] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const res = await API.get("/creator/mentors"); // create this API
      setMentors(res.data.mentors);
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
          <h2>Mentors</h2>

          <div className="card-grid">
            {mentors.map((user) => (
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

                {/* ✅ EXPERTISE instead of skills */}
                <div className="skills-box">
                  {user.expertise?.map((e, i) => (
                    <span key={i} className="skill-chip">{e}</span>
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

      {/* 🔥 PROFILE MODAL */}
      {selectedUser && (
        <div className="modal-overlay">
          <div className="profile-modal left-align">

            <span
              className="close"
              onClick={() => setSelectedUser(null)}
            >
              ×
            </span>

            <img
              src={`http://localhost:8080/uploads/${selectedUser.profilePic}`}
              alt=""
              className="modal-img"
            />

            <h2>{selectedUser.fullName}</h2>

            <p><strong>Email:</strong> {selectedUser.email}</p>

            {/* BIO */}
            <p><strong>Bio:</strong> {selectedUser.bio}</p>

            {/* EXPERTISE */}
            <div>
              <strong>Expertise:</strong>
              <div className="skills-box">
                {selectedUser.expertise?.map((e, i) => (
                  <span key={i} className="skill-chip">{e}</span>
                ))}
              </div>
            </div>

            {/* EXPERIENCE */}
            <p><strong>Experience:</strong> {selectedUser.experience} years</p>

            <div className="modal-actions">
              <button
                onClick={() =>
                  navigate("/creator/chat", { state: selectedUser })
                }
              >
                Chat
              </button>

              <button onClick={() => setSelectedUser(null)}>
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default CViewMentor;