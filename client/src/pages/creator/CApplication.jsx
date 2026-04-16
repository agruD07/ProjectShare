import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../utils/apiClient";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function CApplication() {
  const [applications, setApplications] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    markAndFetch();
  }, []);

  const markAndFetch = async () => {
  try {
    console.log("Marking as viewed...");

    const markRes = await API.put("/creator/applications/mark-viewed");
    localStorage.setItem("appsUpdated", "true");
    console.log("Mark result:", markRes.data);

    const res = await API.get("/creator/applications");
    console.log("Fetched apps:", res.data);

    setApplications(res.data.applications || []);

  } catch (err) {
    console.error("ERROR:", err);
  }
  };

  // const fetchApplications = async () => {
  //   try {
  //     const res = await API.get("/creator/applications");
  //     setApplications(res.data.applications || []);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const markAsViewed = async () => {
  //   try {
  //     await API.put("/creator/applications/mark-viewed");
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  //  ACCEPT / REJECT
  const handleStatusChange = async (id, status) => {
    try {
      const res = await API.put(`/creator/applications/${id}`, { status });

      setApplications(applications.map(app =>
        app._id === id ? res.data.application : app
      ));

    } catch (err) {
      console.error(err);
      alert("Error updating status");
    }
  };

  return (
    <>
      <Navbar />

      <div className="project-dashboard-container">
        <Sidebar />

        <div className="project-dashboard-content">

          <h2>Applications</h2>
          <p>View and manage applications for your projects</p>

          <div className="table-wrapper">
            <table className="project-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Applicant</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Profile</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan="6">No applications</td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app._id}>

                      <td>{app.projectId?.title}</td>

                      <td>{app.applicantId?.fullName}</td>

                      <td>{app.message}</td>

                      <td>
                        <span className={`status ${app.status}`}>
                          {app.status}
                        </span>
                      </td>

                      <td>
                        <button className="view-btn" onClick={() => setSelectedUser(app.applicantId)}>
                          View Profile
                        </button>
                      </td>

                      <td>
                        <div className="action-buttons">
                        <button className={`accept-btn ${app.status === "Approved" ? "disabled-btn" : ""}`}
                          onClick={() => handleStatusChange(app._id, "Approved")}
                          disabled={app.status === "Approved"}
                        >
                          Accept
                        </button>

                        <button className={`reject-btn ${app.status === "Rejected" ? "disabled-btn" : ""}`}
                          onClick={() => handleStatusChange(app._id, "Rejected")}
                          disabled={app.status === "Rejected"}
                        >
                          Reject
                        </button>
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>

        </div>
      </div>

      <Footer />
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

    </>
  );
}

export default CApplication;