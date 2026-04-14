import { Route, Routes } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLogin from "./pages/login/AdminLogin";
import LandingPage from "./pages/common/LandingPage";
import CreatorRegister from "./pages/register/CreatorRegister";
import CollaboratorRegister from "./pages/register/CollaboratorRegister";
import MentorRegister from "./pages/register/MentorRegister";
import CreatorLogin from "./pages/login/CreatorLogin";
import CollaboratorLogin from "./pages/login/CollaboratorLogin";
import MentorLogin from "./pages/login/MentorLogin";
import CreatorDashboard from "./pages/creator/CreatorDashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MentorDashboard from "./pages/mentor/MentorDashboard";
import CollaboratorDashboard from "./pages/collaborator/CollaboratorDashboard";
import About from "./pages/common/About";
import Features from "./pages/common/Features";
import ContactUs from "./pages/common/ContactUs";
import HomeProject from "./pages/common/HomeProject";
import CreateProject from "./pages/creator/CreateProject";
import Task from "./pages/creator/Task";
import CApplication from "./pages/creator/CApplication";
import BrowseProject from "./pages/collaborator/BrowseProject";
import ProjectDetails from "./pages/collaborator/ProjectDetails";
import TaskStatus from "./pages/collaborator/TaskStatus";
import ActiveProjects from "./pages/collaborator/ActiveProjects";
import AppliedProjects from "./pages/collaborator/AppliedProjects";







function App(){
  return(
    <>
    
    <Routes>
      
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/features" element={<Features/>}/>
      <Route path="/contact" element={<ContactUs/>}/>
      <Route path="/homeproject" element={<HomeProject/>}/>

      <Route path="/register/creator" element={<CreatorRegister/>} />
      <Route path="/register/collaborator" element={<CollaboratorRegister/>} />
      <Route path="/register/mentor" element={<MentorRegister/>} />

      <Route path="/login/creator" element={<CreatorLogin/>} />
      <Route path="/login/collaborator" element={<CollaboratorLogin/>} />
      <Route path="/login/mentor" element={<MentorLogin/>} />
      <Route path="/login/admin" element={<AdminLogin/>} />

      <Route path="/creator/dashboard"
        element={
          <ProtectedRoute allowedRoles={["creator"]}>
            <CreatorDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/creator/projects" element={<CreateProject/>} />
      <Route path="/creator/tasks" element={<Task/>} />
      <Route path="/creator/applications" element={<CApplication/>} />

      <Route path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />


      <Route path="/collaborator/dashboard"
        element={
          <ProtectedRoute allowedRoles={["collaborator"]}>
            <CollaboratorDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/collaborator/projects" element={<BrowseProject/>} />
      <Route path="/collaborator/project/:id" element={<ProjectDetails />} />
      <Route path="/collaborator/applied-projects" element={<AppliedProjects />} />
<Route path="/collaborator/active-projects" element={<ActiveProjects />} />
<Route path="/collaborator/task-status/:id" element={<TaskStatus />} />

      <Route path="/mentor/dashboard"
        element={
          <ProtectedRoute allowedRoles={["mentor"]}>
            <MentorDashboard />
          </ProtectedRoute>
        }
      />

      
      
      

      
    </Routes>
    
    </>
  )
}

export default App 