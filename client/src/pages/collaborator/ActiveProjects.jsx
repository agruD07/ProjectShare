import { useEffect, useState } from "react";
import API from "../../utils/apiClient";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

function ActiveProjects() {

  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/collaborator/active-projects");

      const filtered = (res.data.projects || []).filter(
        p => p && p.status !== "Completed" // optional if you want only active ongoing
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
          <h2>Active Projects</h2>

          <div className="project-grid">
            {projects.length === 0 && <p>No active projects</p>}

            {projects.map(p => (
              <div key={p._id} className="project-card">

                <h3>{p.title}</h3>

                <p><b>Creator:</b> {p.creator?.fullName}</p>
                <p><b>Description:</b> {p.description}</p>
                <p><b>Tech Stack:</b> {p.techStack?.join(", ")}</p>
                <p><b>Category:</b> {p.category}</p>

                <button
                  onClick={() => navigate(`/collaborator/task-status/${p._id}`)}
                >
                  View Tasks
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

export default ActiveProjects;