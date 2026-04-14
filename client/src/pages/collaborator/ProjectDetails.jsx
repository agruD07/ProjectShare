import { useEffect, useState } from "react";
// import axios from "axios";
import API from "../../utils/apiClient";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import "../../assets/styles/projectDetails.css";

function ProjectDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [application, setApplication] = useState(null);
  const [appStatus, setAppStatus] = useState("Active");
  const [remainingDays, setRemainingDays] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const [proj, task, app] = await Promise.all([
        API.get(`/collaborator/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        API.get(`/collaborator/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        API.get(`/collaborator/my-application/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setProject(proj.data.project);
      setTasks(task.data.tasks.reverse());

      setAppStatus(app.data.status || "Active");
      setRemainingDays(app.data.remainingDays || 0);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  


  const applyProject = async () => {
    try {
      await API.post("/collaborator/apply",
        { projectId: id, message },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      );
      setAppStatus("Pending");
      setRemainingDays(0);
      
      alert("Applied successfully");
      setShowModal(false);

    } catch (err) {
      console.log(err);
    }
  };


  if (loading) {
  return (
    <>
      <Navbar />
      <div className="project-details-container">
        <Sidebar />
        <div className="project-details-content">
          <p>Loading project details...</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

  return (
    <>
      <Navbar />

      <div className="project-details-container">
        <Sidebar />

        <div className="project-details-content">

          <button className="project-details-back" onClick={() => navigate(-1)}>← Back</button>

          <h2 className="project-details-header">
            {project.title} 👥 {project.collaborators?.length || 0}
          </h2>

          {/* PROJECT INFO */}
          <div className="project-details-card">
            <h3>Project Information</h3>
            <p><b>Creator:</b> {project.creator?.fullName || "Unknown"}</p>
            <p><b>Tech Stack:</b> {project.techStack?.join(", ") || "N/A"}</p>
            <p><b>Category:</b> {project.category}</p>
            <p><b>Description:</b> {project.description}</p>
          </div>

          {/* TASKS */}
          <div className="project-details-card">
            <h3>Project Tasks</h3>

            {tasks.length === 0 ? (
              <p>No tasks available</p>
            ) : (
            tasks.map(t => (
              <div key={t._id} className="project-details-task-card">
                <h4>{t.title}</h4>
                <p>{t.description}</p>
                <p>Status: {t.status}</p>
                <p>
                  Assigned: {t.assignedTo?.map(a => a.fullName).join(", ") || "Not assigned"}
                </p>
                <p>
                  Due: {new Date(t.dueDate).toLocaleDateString()}
                </p>
              </div>
              )) 
            )}
          </div>

          {/* APPLY BUTTON */}
          <button
            className="project-details-apply-btn"
            disabled={appStatus === "Pending" || appStatus === "Approved"}
            onClick={() => setShowModal(true)}
          >
            {appStatus === "Pending" && "Already Applied"}
            {appStatus === "Approved" && "Accepted"}
            {appStatus === "Rejected" && `Rejected (${remainingDays} days left)`}
            {appStatus === "Active" && "Apply for this Project"}
          </button>
          

          {/* MODAL */}
          {showModal && (
            <div className="project-details-modal-overlay">
                <div className="project-details-modal-box">

                    <h3>Your Application Message</h3>

                    <textarea
                        placeholder="Tell the creator why you're a good fit..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <div className="project-details-modal-actions">
                        <button onClick={applyProject}>Submit</button>
                        <button onClick={() => setShowModal(false)}>Cancel</button>
                    </div>

                </div>
            </div>
         )}

        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProjectDetails;