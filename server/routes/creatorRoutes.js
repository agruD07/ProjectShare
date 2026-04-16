const express = require("express");
const router = express.Router();
const authVerify = require("../middleware/authMiddleware");

const upload = require("../services/imgService");
const { registerCreator, loginCreator, updateProfile,getApprovedCollaborators, getApprovedMentors } = require("../controllers/creatorController");
const {createProject, getProjects,updateProject,deleteProject} = require("../controllers/projectController");
const { createTask, getTasksByProject, getProjectUsers, deleteTask, updateTask } = require("../controllers/taskController");
const { getApplicationsForCreator, updateApplicationStatus, markApplicationsViewed } = require("../controllers/applicationController");



// This file defines API routes and connects them to controller functions.
// ----------------- ROUTES -----------------
router.post("/register", upload.single("profilePic"), registerCreator);
router.post("/login", loginCreator);

// ----------------- PROTECTED PROFILE -----------------
router.get("/profile", authVerify, (req, res) => {
    res.send({
        message: "Access granted",
        user: req.user,
        role: req.role
    });
});




//Projects
router.get("/projects", authVerify, getProjects);
router.post("/projects", authVerify, createProject);
router.put("/projects/:id", authVerify, updateProject);
router.delete("/projects/:id", authVerify, deleteProject);

//Tasks
router.post("/tasks", authVerify, createTask);
router.get("/tasks/:projectId", authVerify, getTasksByProject);
router.get("/project-users/:projectId", authVerify, getProjectUsers);
router.delete("/tasks/:taskId", authVerify, deleteTask);
router.put("/tasks/:taskId", authVerify, updateTask);

//Application
router.get("/applications", authVerify, getApplicationsForCreator);
//application-dashboard
router.put("/applications/mark-viewed", authVerify, markApplicationsViewed);
router.put("/applications/:id", authVerify, updateApplicationStatus);


//View Collaborators
router.get("/collaborators", authVerify, getApprovedCollaborators);

//View Mentors
router.get("/mentors", authVerify, getApprovedMentors);

//Profile
router.put("/profile", authVerify, upload.single("profilePic"), updateProfile);


module.exports = router;