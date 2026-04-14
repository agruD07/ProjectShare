const express = require("express");
const router = express.Router();
const authVerify = require("../middleware/authMiddleware");

const upload = require("../services/imgService");
const { registerCreator, loginCreator } = require("../controllers/creatorController");
const {createProject, getProjects} = require("../controllers/projectController");
const { createTask, getTasksByProject, getProjectUsers, deleteTask, updateTask } = require("../controllers/taskController");
const { getApplicationsForCreator, updateApplicationStatus } = require("../controllers/applicationController");


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

//Tasks
router.post("/tasks", authVerify, createTask);
router.get("/tasks/:projectId", authVerify, getTasksByProject);
router.get("/project-users/:projectId", authVerify, getProjectUsers);
router.delete("/tasks/:taskId", authVerify, deleteTask);
router.put("/tasks/:taskId", authVerify, updateTask);

//Application
router.get("/applications", authVerify, getApplicationsForCreator);
router.put("/applications/:id", authVerify, updateApplicationStatus);

module.exports = router;