import Sidebar from "../../components/Sidebar";
import "../../assets/styles/dashboard.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function AdminDashboard() {
  return (
    <>
    <Navbar/>
    <div className="dashboard-container">

      <Sidebar />

      <div className="dashboard-content">

        {/* 🔹 TOP SECTION */}
        <div className="grid-top">

          {/* ✅ 1. PROJECT OVERVIEW */}
          <div className="card overview">
            <h3>Project Overview</h3>

            <div className="stats">
              <div>
                <p>Total Projects :</p>
                <h4>8</h4>
              </div>

              <div>
                <p>Active Projects :</p>
                <h4>4</h4>
              </div>

              <div>
                <p>Completed Projects:</p>
                <h4>4</h4>
              </div>
            </div>
          </div>

          {/* ✅ 2. PROJECT PROGRESS */}
          <div className="card progress">
            <h3>Project Progress</h3>

            <div className="project-list">

              <div className="project-card">
                <div className="project-header">
                  <h4>AI Chat App</h4>
                  <span>👥 3</span>
                </div>

                <div className="donut"></div>

                <p className="status">In Progress</p>
              </div>

              <div className="project-card">
                <div className="project-header">
                  <h4>Portfolio Website</h4>
                  <span>👥 1</span>
                </div>

                <div className="donut complete"></div>

                <p className="status done">Completed</p>
              </div>

              <div className="project-card">
                <div className="project-header">
                  <h4>Task Manager</h4>
                  <span>👥 2</span>
                </div>

                <div className="donut"></div>

                <p className="status">Open</p>
              </div>              

            </div>
          </div>

        </div>

        {/* 🔹 BOTTOM SECTION */}
        <div className="grid-bottom">

          {/* ✅ 3. APPLICATION STATS */}
          <div className="card applications">
            <h3>Application Statistics</h3>

            <div className="bar-container">
              <div className="bar">
                <span>New</span>
                <div className="bar-fill" style={{ height: "80%" }}></div>
              </div>

              <div className="bar">
                <span>Reviewed</span>
                <div className="bar-fill" style={{ height: "50%" }}></div>
              </div>

              <div className="bar">
                <span>Accepted</span>
                <div className="bar-fill success" style={{ height: "60%" }}></div>
              </div>

              <div className="bar">
                <span>Rejected</span>
                <div className="bar-fill danger" style={{ height: "30%" }}></div>
              </div>
            </div>
          </div>

          {/* ✅ 4. RECENT PROJECTS */}
          <div className="card recent">
            <h3>Recent Projects</h3>

            <ul>
              <li>AI Chat App</li>
              <li>Portfolio Website</li>
              <li>Task Manager</li>
              <li>E-learning Platform</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
    <Footer/>
    </>
  );
}

export default AdminDashboard;