import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/apiClient";

import Sidebar from "../../components/Sidebar";
import "../../assets/styles/dashboard.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function CreatorDashboard() {

  const [projects, setProjects] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchProjects();
    fetchApplications();
  }, []);

  //  refetch when page regains focus
useEffect(() => {
  const handleFocus = () => fetchApplications();
  window.addEventListener("focus", handleFocus);

  return () => window.removeEventListener("focus", handleFocus);
}, []);

useEffect(() => {
  const flag = localStorage.getItem("appsUpdated");

  if (flag) {
    fetchApplications();
    localStorage.removeItem("appsUpdated");
  }
}, []);


  const fetchProjects = async () => {
    try {
      const res = await API.get("/creator/projects");
      setProjects(res.data.projects || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await API.get("/creator/applications");
      setApplications(res.data.applications || []);
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- PROJECT STATS ----------------
  const totalProjects = projects.length;

  const activeProjects = projects.filter(
    p => p.status === "In Progress"
  ).length;

  const completedProjects = projects.filter(
    p => p.status === "Completed"
  ).length;

  // ---------------- APPLICATION STATS ----------------
  
  const approvedApps = applications.filter(a => a.status === "Approved").length;
  const rejectedApps = applications.filter(a => a.status === "Rejected").length;
  const newApps = applications.filter(a => !a.isViewed).length;
  const pendingApps = applications.filter(a => a.isViewed && a.status === "Pending").length; 
console.log(applications);
  // ---------------- PROJECT BAR GRAPH ----------------
  const statusMap = {
    "Planning": 1,
    "In Progress": 2,
    "Completed": 3,
    "On Hold": 4
  };

  const colors = ["#ec4899", "#facc15", "#3b82f6", "#a855f7", "#22c55e"];

  const projectChartData = {
    labels: projects.map(p => p.title),
    datasets: [
      {
        data: projects.map(p => statusMap[p.status] || 0),
        backgroundColor: projects.map((_, i) => colors[i % colors.length]),
        barThickness: 15, // ✅ thinner bars
      },
    ],
  };

  const projectChartOptions = {
    responsive: true,
    maintainAspectRatio: false, // ✅ IMPORTANT (allows fixed height)
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        min: 0,
        max: 4, // ✅ FIXED RANGE
        ticks: {
          stepSize: 1,
          callback: function(value) {
            return ["", "Planning", "In Progress", "Completed", "On Hold"][value];
          }
        },
      },
    },
  };

  // ---------------- DONUT ----------------
  const donutData = {
    labels: ["Approved", "New", "Rejected", "Pending"],
    datasets: [
      {
        data: [approvedApps, newApps, rejectedApps, pendingApps],
        backgroundColor: [
          "#22c55e",
          "#3b82f6",
          "#ef4444",
          "#facc15",
        ],
      },
    ],
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false, // ✅ IMPORTANT
    plugins: {
      legend: {
        position: "right",
      },
    },
  };

  // ---------------- RECENT PROJECTS ----------------
  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      <Navbar/>

      <div className="dashboard-container">
        <Sidebar />

        <div className="dashboard-content">

          {/* 🔹 TOP */}
          <div className="grid-top">

            <div className="card overview">
              <h3>Project Overview</h3>

              <div className="stats">
                <div>
                  <p>Total Projects :</p>
                  <h4>{totalProjects}</h4>
                </div>

                <div>
                  <p>Active Projects :</p>
                  <h4>{activeProjects}</h4>
                </div>

                <div>
                  <p>Completed Projects:</p>
                  <h4>{completedProjects}</h4>
                </div>
              </div>
            </div>

            {/* ✅ SMALL FIXED BAR GRAPH */}
            <div className="card progress small-card">
              <h3>Project Progress</h3>

              <div className="chart-box"> {/* ✅ wrapper */}
                <Bar data={projectChartData} options={projectChartOptions} />
              </div>
            </div>

          </div>

          {/* 🔹 BOTTOM */}
          <div className="grid-bottom">

            {/* ✅ SMALL DONUT */}
            <div className="card applications small-card">
              <h3>Application Statistics</h3>

                <div className="app-stats-wrapper"> {/* ✅ NEW */}

                {/* LEFT SIDE */}
                <div className="app-total">
                  <p>Total Applications</p>
                  <h2>{applications.length}</h2>
                </div>

                {/* RIGHT SIDE CHART */}

                <div className="chart-box"> {/* ✅ wrapper */}
                  <Doughnut data={donutData} options={donutOptions} />
                </div>
               </div>
              </div>

            {/* ✅ SCROLLABLE */}
            <div className="card recent">
              <h3>Recent Projects</h3>

              <ul className="scroll-list"> {/* ✅ NEW */}
                {recentProjects.map((p) => (
                  <li key={p._id}>{p.title}</li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </div>

      <Footer/>
    </>
  );
}

export default CreatorDashboard;