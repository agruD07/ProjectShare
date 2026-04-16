import { useEffect, useState } from "react";
import API from "../../utils/apiClient";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

function TaskStatus() {

  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // const token = localStorage.getItem("TOKEN");

      const [proj, task] = await Promise.all([
        API.get(`/collaborator/projects/${id}`),
        API.get(`/collaborator/tasks/${id}`)
      ]);

      setProject(proj.data.project);
      setTasks(task.data.tasks);

    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 UPDATE STATUS
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await API.put(`/collaborator/task-status/${taskId}`,
        { status: newStatus },
        // {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("token")}`
        //   }
        // }
      );

      // update UI
      setTasks(tasks.map(t =>
        t._id === taskId ? { ...t, status: newStatus } : t
      ));

    } catch (err) {
      console.log(err);
    }
  };

 return (
  <>
    <Navbar />

    <div className="project-details-container">
      <Sidebar />

      <div className="project-details-content">

        <h2>{project?.title}</h2>

        {tasks.map(t => {

          // ✅ check if current user is assigned
          const currentUserId = JSON.parse(localStorage.getItem("user"))?._id;

          const isAssigned = t.assignedTo?.some(
            a => a._id === currentUserId
          );

          return (
            <div
              key={t._id}
              className={`task-card ${!isAssigned ? "task-disabled" : ""}`}
            >

              <h4>{t.title}</h4>
              <p>{t.description}</p>

              <p>
                Assigned: {t.assignedTo?.map(a => a.fullName).join(", ") || "None"}
              </p>

              <p>Status: {t.status}</p>

              {/* ✅ ONLY ENABLE IF ASSIGNED */}
              <select
                value={t.status}
                disabled={!isAssigned}
                onChange={(e) =>
                  handleStatusChange(t._id, e.target.value)
                }
              >
                <option>Open</option>
                <option>In Progress</option>
                <option>Completed</option>
                <option>Blocked</option>
              </select>

            </div>
          );
        })}

      </div>
    </div>

    <Footer />
  </>
);
}

export default TaskStatus;