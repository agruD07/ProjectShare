import { useEffect, useState } from "react";
import API from "../../utils/apiClient";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

function AppliedProjects() {

  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/collaborator/applied-projects", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const filtered = (res.data.projects || []).filter(
        p => p.applicationStatus !== "Approved"
    );

    setProjects(filtered);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />

        <div className="dashboard-content">
          <h2>Applied Projects</h2>

          <div className="project-grid">
            {projects.length === 0 && <p>No applied projects</p>}

            {projects.map(p => (
              <div key={p._id} className="project-card">

                <h3>{p.title}</h3>

                <p><b>Creator:</b> {p.creator?.fullName}</p>
                <p><b>Description:</b> {p.description}</p>
                <p><b>Tech Stack:</b> {p.techStack?.join(", ")}</p>
                <p><b>Category:</b> {p.category}</p>
                <p><b>Status:</b> {p.applicationStatus}</p>

                <button
                  onClick={() => navigate(`/collaborator/project/${p._id}`)}
                >
                  View Details
                </button>

              </div>
            ))}
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default AppliedProjects;