import { useEffect, useState } from "react";
import api from "../../utils/apiClient";
import "../../assets/styles/homeProject.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function HomeProject() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const [reportData, setReportData] = useState({
    type: "",
    description: "",
  });

  // 🔥 fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects"); // backend route
        setProjects(res.data.projects);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProjects();
  }, []);

  // 🔥 open modal
  const handleReportClick = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  // 🔥 submit report
  const handleSubmitReport = async () => {
    try {
      await api.post("/reports/create", {
        projectTitle: selectedProject.title,
        creatorName: selectedProject.creatorName,
        reportType: reportData.type,
        description: reportData.description,
      });

      alert("Report submitted ✅");
      setShowModal(false);
      setReportData({ type: "", description: "" });

    } catch (err) {
      console.log(err);
      alert("Failed to submit report ❌");
    }
  };

  return (
    <>
      <Navbar />

      <div className="home-project-container">

        <h2>Available Projects</h2>

        {/* 🔥 NO PROJECT */}
        {projects.length === 0 ? (
          <p className="no-project">No projects available yet 🚫</p>
        ) : (
          <div className="project-grid">

            {projects.map((proj, index) => (
              <div className="project-card" key={index}>
                <h3>{proj.title}</h3>
                <p>{proj.description}</p>

                <button
                  className="report-btn"
                  onClick={() => handleReportClick(proj)}
                >
                  🚩 Report
                </button>
              </div>
            ))}

          </div>
        )}

      </div>

      {/* 🔥 REPORT MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">

            <h3>Report Project</h3>

            <select
              value={reportData.type}
              onChange={(e) =>
                setReportData({ ...reportData, type: e.target.value })
              }
            >
              <option value="">Select Reason</option>
              <option value="Spam">Spam</option>
              <option value="Duplicate">Duplicate</option>
              <option value="Copyright">Copyright</option>
              <option value="Harassment">Harassment</option>
            </select>

            <textarea
              placeholder="Describe the issue..."
              value={reportData.description}
              onChange={(e) =>
                setReportData({ ...reportData, description: e.target.value })
              }
            ></textarea>

            <div className="modal-actions">
              <button onClick={handleSubmitReport}>Submit</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default HomeProject;