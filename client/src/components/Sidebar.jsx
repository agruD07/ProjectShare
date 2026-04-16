import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

import "../assets/styles/sidebar.css";
import { getUser } from "../utils/getUser";


function Sidebar() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  //Get role from token
  // const token = localStorage.getItem("TOKEN");
  // const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;
  // const role = payload?.role; 
  const user = getUser();
  const role = user?.role;

// ✅ Role-based menu
  const menuItems = {
    creator: [
      { name: "Dashboard", path: "/creator/dashboard" },
      { name: "Projects", path: "/creator/projects" },
      { name: "Tasks", path: "/creator/tasks" },
      { name: "Applications", path: "/creator/applications" },
      { name: "Collaborators", path: "/creator/collaborators" },
      { name: "Mentors", path: "/creator/mentors" },
      { name: "Chat", path: "/creator/chat" },
      { name: "My Profile", path: "/creator/profile" },
    ],

    mentor: [
      { name: "Dashboard", path: "/mentor/dashboard" },
      { name: "Mentorship Requests", path: "/mentor/requests" },
      { name: "Active Mentorships", path: "/mentor/active" },
      { name: "Browse Projects", path: "/mentor/projects" },
      { name: "Chat", path: "/mentor/chat" },
      { name: "Create Article", path: "/mentor/create-article" },
      { name: "View Articles", path: "/mentor/articles" },
      { name: "My Profile", path: "/mentor/profile" },
    ],

    collaborator: [
      { name: "Dashboard", path: "/collaborator/dashboard" },
      { name: "Browse Projects", path: "/collaborator/projects" },
      {
        name: "Projects",
        children: [
          { name: "Applied Projects", path: "/collaborator/applied-projects" },
          {  name: "Active Projects", path: "/collaborator/active-projects" },
          { name: "Completed Projects", path: "/collaborator/projects/completed" },
        ],
      },
      { name: "Portfolio", path: "/collaborator/portfolio" },
      { name: "Chat", path: "/collaborator/chat" },
      { name: "Mentors", path: "/collaborator/mentors" },
      { name: "Mentorship status", path: "/collaborator/mentors-status" },
      { name: "My Profile", path: "/collaborator/profile" },
    ],

    admin: [
      { name: "Dashboard", path: "/admin/dashboard" },
      { name: "Users", path: "/admin/users" },
      { name: "Applications", path: "/admin/applications" },
      { name: "Mentor Requests", path: "/admin/mentor-requests" },
      { name: "Projects", path: "/admin/projects" },
      { name: "Content Moderation", path: "/admin/moderation" },
      { name: "Analytics", path: "/admin/analytics" },
      { name: "Contact Submissions", path: "/admin/contact" },
      { name: "My Profile", path: "/admin/profile" },
    ]
  };

  

  //Logout modal handlers
  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    const user = getUser(); // get role first then remove the token- bez role come from token
    localStorage.removeItem("TOKEN");
    setShowModal(false); // close modal

    if (user?.role === "creator") navigate("/login/creator");
    else if (user?.role === "mentor") navigate("/login/mentor");
    else if (user?.role === "collaborator") navigate("/login/collaborator");
    else if (user?.role === "admin") navigate("/login/admin");
    else navigate("/");
  };

  const cancelLogout = () => {
    setShowModal(false);
  };
 

  return (
    <>
      <div className="sidebar">

        {/*MENU */}
        <div className="menu">
         {menuItems[role]?.map((item, index) => (
         <div key={index}>
           <p className="menu-item"
             onClick={() => {
             if (item.children) {
               setOpenMenu(openMenu === index ? null : index);
             } else {
              navigate(item.path);
             }
             }}
             style={{ fontWeight: "bold", cursor: "pointer" ,display: "flex", justifyContent: "space-between", alignItems: "center" }} 
            >
             {item.name}

             {item.children && (
                <FaChevronDown
                  style={{
                      fontSize: "12px",
                      marginLeft: "8px",
                    transform: openMenu === index ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "0.3s"
                  }}
                />
              )}
            </p>

            {item.children && openMenu === index && (
            <div style={{ paddingLeft: "15px" }}>
              {item.children.map((sub, i) => (
              <p key={i} onClick={() => navigate(sub.path)}>
                {sub.name}
              </p>
              ))}
            </div>
            )}

          </div>
          ))}

        </div>
        {/*LOGOUT */}
        <div className="logout">
          <button onClick={handleLogoutClick}>Logout</button>
        </div>

      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>Are you sure you want to logout?</p>

            <div className="modal-actions">
              <button onClick={confirmLogout}>Logout</button>
              <button onClick={cancelLogout}>Cancel</button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
export default Sidebar;



