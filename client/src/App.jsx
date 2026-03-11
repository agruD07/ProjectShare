import { Route, Routes } from "react-router-dom";
import Landingpage from "./components/pages/landingpage";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import CreatorLogin from "./components/pages/login/creator";
import CollaboratorLogin from "./components/pages/login/collaborator";
import MentorLogin from "./components/pages/login/mentor";
import AdminLogin from "./components/pages/login/admin";
import CreatorRegister from "./components/pages/register/creator";
import CollaboratorRegister from "./components/pages/register/collaborator";
import MentorRegister from "./components/pages/register/mentor";



function App(){
  return(
    <>
    
    <Routes>
      
      <Route path="/" element={<Landingpage/>}/>
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