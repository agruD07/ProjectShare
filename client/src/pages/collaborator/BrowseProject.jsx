import { useEffect, useState } from "react";
// import axios from "axios";
import API from "../../utils/apiClient";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import "../../assets/styles/browseProject.css";
import { useNavigate } from "react-router-dom";

function BrowseProject() {

  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

 // const [remainingDays, setRemainingDays] = useState(0);




  // Fetch all projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get("/collaborator/projects", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        console.log("API RESPONSE:", res.data);

        // setProjects(res.data.projects);//undefined?
        setProjects(res.data.projects || []);

      } catch (err) {
        console.log(err);
        setProjects([]); // safety fallback
      }finally {
        setLoading(false); 
      }
    };

    fetchProjects();
  }, []);

 
//   const filteredProjects = projects.filter(p => {
    const filteredProjects = (projects || []).filter(p => {
      if (!p) return false;

      const matchSearch = p.title?.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category ? p.category === category : true;
      
      return matchSearch && matchCategory;
    });

  //  HELPER FUNCTION FOR BUTTON TEXT
  const getButtonText = (status) => {
    if (status === "Pending") return "Already Applied";
    if (status === "Approved") return "Accepted";
    if (status?.includes("Rejected")) return "Rejected";
    return "Apply";
  };

  // HELPER FUNCTION FOR BUTTON CLASS (COLORS)
  const getButtonClass = (status) => {
    if (status === "Pending") return "btn pending";
    if (status === "Approved") return "btn approved";
    if (status?.includes("Rejected")) return "btn rejected";
    return "btn active";
  };    




  if (loading) {
    return (
      <>
        <Navbar />
        <div className="dashboard-container">
          <Sidebar />
          <div className="dashboard-content">
            <h2>Browse All Projects</h2>
            <p>Loading projects...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }


  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar />

        <div className="dashboard-content">

          <h2>Browse All Projects</h2>

          {/* SEARCH + FILTER */}
          <div className="top-bar">
            <input
              type="text"
              placeholder="Search project..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select onChange={(e) => setCategory(e.target.value)}>
              <option value="">All Categories</option>
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

          {/* PROJECT GRID */}
          <div className="project-grid">

            {filteredProjects.length === 0 && (
              <p>No projects found</p>
            )}

            {filteredProjects.map(p => (
              <div key={p._id} className="project-card">

                {/* HEADER */}
                <div className="card-header">
                  <h3>{p.title}</h3>

                  {/*  NEW BUTTON (RIGHT SIDE) */}
                  <button
                    className={getButtonClass(p.applicationStatus)}
                    disabled={p.applicationStatus === "Pending" || p.applicationStatus === "Approved" || p.applicationStatus?.includes("Rejected")}
                  >
                    {p.applicationStatus === "Rejected"
                      ? `Rejected (${p.remainingDays}d)`
                      : getButtonText(p.applicationStatus)}
                  </button>
                </div>

                  <p><b>Creator:</b> {p.creator?.fullName}</p>
                  <p><b>Description:</b> {p.description}</p>
                  <p><b>Tech Stack:</b> {p.techStack?.join(", ")}</p>
                  <p><b>Category:</b> {p.category}</p>

                
                  {/* VIEW DETAILS */}
                  <button
                    onClick={() =>navigate(`/collaborator/project/${p._id}`)}
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


export default BrowseProject;