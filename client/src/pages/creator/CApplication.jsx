import { useState, useEffect } from "react";
import API from "../../utils/apiClient";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function CApplication() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await API.get("/creator/applications");
      setApplications(res.data.applications || []);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ ACCEPT / REJECT
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
                        <button className="view-btn">
                          View Profile
                        </button>
                      </td>

                      <td>
                        <button
                          onClick={() => handleStatusChange(app._id, "Approved")}
                          disabled={app.status === "Approved"}
                        >
                          Accept
                        </button>

                        <button
                          onClick={() => handleStatusChange(app._id, "Rejected")}
                          disabled={app.status === "Rejected"}
                        >
                          Reject
                        </button>
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
    </>
  );
}

export default CApplication;