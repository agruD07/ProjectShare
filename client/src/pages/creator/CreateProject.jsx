import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/apiClient";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import "../../assets/styles/createProject.css";

function CreateProject() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCollabs, setSelectedCollabs] = useState(null); // popup control
  const [editingId, setEditingId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

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

      if (editingId) {
        //  UPDATE
        const res = await API.put(`/creator/projects/${editingId}`, payload);

        setProjects(projects.map(p =>
          p._id === editingId ? res.data.project : p
        ));

      } else {
        // ✅ CREATE
        const res = await API.post("/creator/projects", payload);
        setProjects([...projects, res.data.project]);
      }

      closeModal();

    } catch (err) {
      console.error(err);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await API.delete(`/creator/projects/${id}`);
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // EDIT
  const handleEdit = (p) => {
    setEditingId(p._id);

    setForm({
      title: p.title,
      description: p.description,
      category: p.category,
      techStack: p.techStack.join(", "),
      status: p.status,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
      

      setForm({
        title: "",
        description: "",
        category: "",
        techStack: "",
        status: "Planning",
      });

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
            <button
              className="create-btn"
              onClick={() => {
                setEditingId(null);
                setShowModal(true);
              }}
            >
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
                  projects.map((p,i) => (
                  <tr key={p._id}>
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
                          onClick={() => {
                            if (p.collaborators?.length > 0) {
                              setSelectedCollabs(p.collaborators);
                            }
                          }}
                        >
                          {p.collaborators?.length || 0}
                        </span>

                        
                      </td>

                      {/* ACTIONS */}
                      <td className="actions">
                        <span onClick={() => handleEdit(p)}>✏️</span>
                      <span onClick={() => handleDelete(p._id)}>🗑️</span>
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


      {/* MODAL for Create / Edit Project*/}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">

            <h3>{editingId ? "Edit Project" : "Create Project"}</h3>

           <div className="form-row">
            <label>Title</label>
            <input
              name="title"
              placeholder="Project Title"
              value={form.title}
              onChange={handleChange}
            />
           </div>

           <div className="form-row">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Project Description"
              value={form.description}
              onChange={handleChange}
            />
           </div>

           <div className="form-row">
            <label>Category</label>
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
           </div>

           <div className="form-row">
            <label>Tech Stack</label>
            <input
              name="techStack"
              placeholder="React, Node.js, MongoDB, Express"
              value={form.techStack}
              onChange={handleChange}
            />
           </div>

           <div className="form-row">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option>Planning</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>On Hold</option>
            </select>
           </div>

            <div className="modal-actions">
              <button className="save-btn" onClick={handleSubmit}>
                Save Project
              </button>

              <button className="cancel-btn" onClick={closeModal}>{/* FIX: reset form */}
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL for collaboratore view */}
      {selectedCollabs && (
  <div className="modal-overlay">
    <div className="collab-modal">

      <span className="close" onClick={() => setSelectedCollabs(null)}>×</span>

      <h2>Collaborators</h2>

      <div className="collab-modal-grid">

        {selectedCollabs.length > 0 ? (
          selectedCollabs.map((user) => (
            <div className="collab-card" key={user._id}>

              <div className="card-header">
                <img
                  src={
                    user.profilePic
                      ? `http://localhost:8080/uploads/${user.profilePic}`
                      : "https://via.placeholder.com/100"
                  }
                  alt=""
                />
                <h3>{user.fullName}</h3>
              </div>

              {/* <p className="bio">{user.bio}</p>

              <div className="skills-box">
                {user.skills?.map((s, i) => (
                  <span key={i} className="skill-chip">{s}</span>
                ))}
              </div> */}

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
          ))
        ) : (
          <p>No collaborators</p>
        )}

      </div>

    </div>
  </div>
  )}


  {/* modal view single collaborator profile */}
  {selectedUser && (
  <div className="modal-overlay">
    <div className="profile-modal-app left-align">

      <span className="close" onClick={() => setSelectedUser(null)}>×</span>

      <img
        src={`http://localhost:8080/uploads/${selectedUser.profilePic}`}
        alt=""
        className="modal-img"
      />

      <h2>{selectedUser.fullName}</h2>
      <p><strong>Email:</strong> {selectedUser.email}</p>

      <div>
        <strong>Skills:</strong>
        <div className="skills-box">
          {selectedUser.skills?.map((s, i) => (
            <span key={i} className="skill-chip">{s}</span>
          ))}
        </div>
      </div>

      <p><strong>Bio:</strong> {selectedUser.bio}</p>

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

export default CreateProject;