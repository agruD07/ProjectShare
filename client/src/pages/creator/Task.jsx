import { useState, useEffect } from "react";
import API from "../../utils/apiClient";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import "../../assets/styles/task.css";

function Task() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const [open, setOpen] = useState(false);
  const selected = projects.find(p => p._id === selectedProject);

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    assignedModel: "",
    status: "Open",
    priority: "Medium",
    dueDate: "",
  });

  

  // LOAD PROJECTS FIRST
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

  // LOAD TASKS + USERS WHEN PROJECT SELECTED
  useEffect(() => {
    if (selectedProject) {
      fetchTasks();
      fetchUsers();
    }
  }, [selectedProject]);

  const fetchTasks = async () => {
    try {
      const res = await API.get(`/creator/tasks/${selectedProject}`);
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get(`/creator/project-users/${selectedProject}`);
      setUsers(res.data.users || []);
    } catch (err) {
      console.error(err);
    }
  };

  // SUBMIT TASK
  const handleSubmit = async () => {
    try {
      if (!selectedProject) return alert("Select project first");

      const payload = {
        title: form.title,
        description: form.description,
        project: selectedProject,
        assignedTo: form.assignedTo ? [form.assignedTo] : [],
        assignedModel: form.assignedTo ? form.assignedModel : undefined,
        status: form.status,
        priority: form.priority,
        dueDate: form.dueDate,
      };

      // const res = await API.post("/creator/tasks", payload);
      // setTasks([...tasks, res.data.task]);//unpopulated task--old code used before fetchTasks() but had to change since task wasn't loading the assigned to value but only after refreshing data can be seen in OP
      //--Replacing the above 2 line with editing task included + create task
      if (editingTaskId) {
        //  EDIT TASK
        const res = await API.put(`/creator/tasks/${editingTaskId}`, payload);

        setTasks(tasks.map(t =>
          t._id === editingTaskId ? res.data.task : t
        ));

      } else {
        // CREATE TASK
        await API.post("/creator/tasks", payload);
        fetchTasks(); // to get populated data
      }

      // await API.post("/creator/tasks", payload);
      // fetchTasks();//get fresh populated tasks//here it is 2API being called SO IN THE above 2 codes instead use only 1 AI but the backend we populated the assignedto 

      setShowModal(false);

      // reset form
      setForm({
        title: "",
        description: "",
        assignedTo: "",
        assignedModel: "",
        status: "Open",
        priority: "Medium",
        dueDate: "",
      });
      setEditingTaskId(null);

    } catch (err) {
      console.error(err);
      alert("Error creating task");
    }
  };

  // STATUS STYLE
  const getStatusStyle = (status) => {
    switch (status) {
      case "Open":
        return { background: "#3b82f6", color: "white" };
      case "In Progress":
        return { background: "#facc15", color: "black" };
      case "Completed":
        return { background: "#22c55e", color: "white" };
      case "Blocked":
        return { background: "#ef4444", color: "white" };
      default:
        return {};
    }
  };

  // PRIORITY STYLE
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "High":
        return { background: "red", color: "white" };
      case "Medium":
        return { background: "orange", color: "black" };
      case "Low":
        return { background: "yellow", color: "black" };
      default:
        return {};
    }
  };

  const handleDelete = async (id) => {
      try {
        await API.delete(`/creator/tasks/${id}`);

        // remove from UI
        setTasks(tasks.filter(t => t._id !== id));

      } catch (err) {
        console.error(err);
        alert("Error deleting task");
      }
  };

  const handleEdit = (t) => {
    setError("");
    setEditingTaskId(t._id);

    setForm({
      title: t.title,
      description: t.description,
      assignedTo: t.assignedTo[0]?._id || "",
      assignedModel: t.assignedModel,
      status: t.status,
      priority: t.priority,
      dueDate: t.dueDate.split("T")[0],
    });

    setShowModal(true);
  };


  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      assignedTo: "",
      assignedModel: "",
      status: "Open",
      priority: "Medium",
      dueDate: "",
    });

    setEditingTaskId(null);
  };



  return (
    <>
      <Navbar />

      <div className="project-dashboard-container">
        <Sidebar />

        <div className="project-dashboard-content">

          {/* SELECT PROJECT */}
          <div className="custom-select">
            <div className="select-box" onClick={() => setOpen(!open)}>
              {selected ? selected.title : "Select Project "}

              <span className={`arrow ${open ? "rotate" : ""}`}>
                ▼
              </span>
            </div>

            {open && (
              <div className="select-dropdown">
                {projects.map((p) => (
                  <div
                    key={p._id}
                    className="select-option"
                    onClick={() => {
                      setSelectedProject(p._id);
                      setOpen(false);
                      setError(""); 
                    }}
                  >
                    {p.title}
                  </div>
                ))}
              </div>
            )}
          </div>
          {error && (
  <div className="error-msg">
    {error}
  </div>
)}

          {/* HEADER */}
          <div className="project-header">
            <h2>Tasks</h2>
            <button
              className="create-btn"
              onClick={() => {
                if (!selectedProject) {
                  setError("Please select a project first");
                  return;
                }
                setError("");  

                resetForm();
                setShowModal(true);
              }}
              // disabled={!selectedProject}
            >
              + Create Task
            </button>
          </div>

          {/* TABLE */}
          <div className="table-wrapper">
            <table className="project-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Due Date</th>
                  <th>Assigned</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {tasks.length === 0 ? (
                  <tr>
                    <td colSpan="7">No tasks</td>
                  </tr>
                ) : (
                  tasks.map((t, i) => (
                    <tr key={i}>
                      <td>{t.title}</td>
                      <td>{t.description}</td>

                      <td>
                        <span className="status-badge" style={getStatusStyle(t.status)}>
                          {t.status}
                        </span>
                      </td>

                      <td>
                        <span className="status-badge" style={getPriorityStyle(t.priority)}>
                          {t.priority}
                        </span>
                      </td>

                      <td>{new Date(t.dueDate).toLocaleDateString()}</td>

                      <td>
                        {t.assignedTo?.length > 0
                          ? t.assignedTo.map(a => a.fullName).join(", ")
                          : "Unassigned"}
                      </td>

                      <td className="actions">
                        <span onClick={() => handleEdit(t)}>✏️</span>
                        <span onClick={() => handleDelete(t._id)}>🗑️</span>
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

            <h3>{editingTaskId ? "Edit Task" : "Create Task"}</h3>

           <div className="form-row">
            <label>Title</label>
            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
           </div>

           <div className="form-row">
            <label>Description</label>
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
           </div>
           <div className="form-row">
            <label>Assign To</label>
            {/* ASSIGN */}
            <select
              value={form.assignedTo}
              onChange={(e) => {
                const selected = users.find(u => u._id === e.target.value);

                setForm({
                  ...form,
                  assignedTo: selected?._id || "",
                  assignedModel: selected?.role || "",
                });
              }}
            >
              <option value="">Unassigned</option>

              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.role}){/**getProjectUsers- taskController.jsx*/}
                </option>
              ))}
            </select>
           </div>

           <div className="form-row">
            <label>Status</label> 
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Blocked</option>
            </select>
            </div>

           <div className="form-row">
            <label>Priority</label>
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
           </div>

           <div className="form-row">
            <label>Date</label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            />
           </div>

            <div className="modal-actions">
              <button className="save-btn" onClick={handleSubmit}>
                Save Task
              </button>

              <button 
                className="cancel-btn" 
                onClick={() => {
                  resetForm();
                  setShowModal(false);
                  setError(""); 
                }}
              >
                Cancel
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default Task;