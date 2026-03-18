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






function App(){
  return(
    <>
    
    <Routes>
      
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/register/creator" element={<CreatorRegister/>} />
      <Route path="/register/collaborator" element={<CollaboratorRegister/>} />
      <Route path="/register/mentor" element={<MentorRegister/>} />
      <Route path="/login/creator" element={<CreatorLogin/>} />
      <Route path="/login/collaborator" element={<CollaboratorLogin/>} />
      <Route path="/login/mentor" element={<MentorLogin/>} />
      <Route path="/login/admin" element={<AdminLogin/>} />

      
    </Routes>
    
    </>
  )
}

export default App 