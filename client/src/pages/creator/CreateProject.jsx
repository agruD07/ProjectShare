import { useState, useEffect } from "react";
import API from "../../utils/apiClient";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import "../../assets/styles/createProject.css";

function CreateProject() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showCollab, setShowCollab] = useState(null); // popup control

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    techStack: "",
    status: "Planning",
  });

  // FETCH PROJECTS FROM BACKEND
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/creator/projects");
      setProjects(res.data.projects || []);
    } catch (err) {
      console.error(err);
    }
  };

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SAVE PROJECT
  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        techStack: form.techStack.split(",").map((t) => t.trim()),
      };

      const res = await API.post("/creator/projects", payload);
      setProjects([...projects, res.data.project]);

      setShowModal(false);

      setForm({
        title: "",
        description: "",
        category: "",
        techStack: "",
        status: "Planning",
      });
    } catch (err) {
      console.error(err);
    }
  };

  // STATUS COLOR + TEXT COLOR
  const getStatusStyle = (status) => {
    switch (status) {
      case "Planning":
        return { background: "#3b82f6", color: "white" };
      case "In Progress":
        return { background: "#facc15", color: "black" };
      case "Completed":
        return { background: "#22c55e", color: "white" };
      case "On Hold":
        return { background: "#f97316", color: "white" };
      default:
        return { background: "#ccc", color: "black" };
    }
  };

  const handleViewProfile = (id) => {
    console.log("Go to profile of:", id);
    // later → navigate(`/profile/${id}`)
  };

  const handleChat = (id) => {
    console.log("Start chat with:", id);
    // later → open chat system
  };

  return (
    <>
      <Navbar />

      <div className="project-dashboard-container">
        <Sidebar />

        <div className="project-dashboard-content">

          {/* HEADER */}
          <div className="project-header">
            <h2>My Projects</h2>
            <button className="create-btn" onClick={() => setShowModal(true)}>
              + Create Project
            </button>
          </div>

          {/*TABLE */}
          <div className="table-wrapper">
            <table className="project-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Category</th>
                  <th>Tech Stack</th>
                  <th>Collaborators</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan="7">No projects found</td>
                  </tr>
                ) : (
                  projects.map((p, i) => (
                    <tr key={i}>
                      <td>{p.title}</td>
                      <td>{p.description}</td>

                      {/* STATUS */}
                      <td>
                        <span
                          className="status-badge"
                          style={getStatusStyle(p.status)}
                        >
                          {p.status}
                        </span>
                      </td>

                      <td>{p.category}</td>

                      <td>{p.techStack?.join(", ")}</td>

                      {/* COLLABORATORS */}
                      <td>
                        <span
                          className="collab-count"
                          onClick={() => setShowCollab(showCollab === i ? null : i)}
                        >
                          {p.collaborators?.length || 0}
                        </span>

                        {/* POPUP */}
                        {showCollab === i && (
                          <div className="collab-popup">
                            {p.collaborators?.length > 0 ? (
                              p.collaborators.map((c) => (
                                <div key={c._id} className="collab-item">
    
                                  <span>{c.fullName}</span>

                                  <div className="collab-actions">
                                    <button onClick={() => handleViewProfile(c._id)}>
                                      View Profile
                                    </button>

                                    <button onClick={() => handleChat(c._id)}>
                                      Chat
                                    </button>
                                  </div>

                                </div>
                              ))
                            ) : (
                              <p>No collaborators</p>
                            )}
                            <button onClick={() => setShowCollab(null)}>
                              Close
                            </button>
                          </div>
                        )}
                      </td>

                      {/* ACTIONS */}
                      <td className="actions">
                        <span>✏️</span>
                        <span>🗑️</span>
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

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">

            <h3>Create Project</h3>

            <input
              name="title"
              placeholder="Project Title"
              value={form.title}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Project Description"
              value={form.description}
              onChange={handleChange}
            />

            <select name="category" value={form.category} onChange={handleChange}>
              <option value="">Select Category</option>
              <option>Web Development</option>
              <option>Mobile Development</option>
              <option>UI/UX Design</option>
              <option>Data Science</option>
              <option>Machine Learning</option>
              <option>Cloud Computing</option>
              <option>CyberSecurity</option>
              <option>DevOps</option>
              <option>Project Management</option>
              <option>Marketing</option>
              <option>Content Creation</option>
              <option>Business Strategy</option>
            </select>

            <input
              name="techStack"
              placeholder="React, Node.js, MongoDB, Express"
              value={form.techStack}
              onChange={handleChange}
            />

            <select name="status" value={form.status} onChange={handleChange}>
              <option>Planning</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>On Hold</option>
            </select>

            <div className="modal-actions">
              <button className="save-btn" onClick={handleSubmit}>
                Save Project
              </button>

              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default CreateProject;