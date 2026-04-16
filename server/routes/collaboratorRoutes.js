const express = require("express");
const router = express.Router();

const authVerify = require("../middleware/authMiddleware");
const upload = require("../services/imgService");
const { registerCollaborator, loginCollaborator, updateCollaboratorProfile } = require("../controllers/collaboratorController");
const { applyToProject, getMyApplicationStatus } = require("../controllers/applicationController");

const { getAllProjects, getSingleProject , getAppliedProjects, getActiveProjects} = require("../controllers/projectController");
const { getTasksByProject, updateTaskStatus } = require("../controllers/taskController");



// This file defines API routes and connects them to controller functions.
// ----------------- ROUTES -----------------
router.post("/register", upload.single("profilePic"), registerCollaborator);
router.post("/login", loginCollaborator);

router.get("/projects", authVerify, getAllProjects);
router.get("/projects/:id", authVerify, getSingleProject);
router.get("/tasks/:projectId", authVerify, getTasksByProject);

router.post("/apply", authVerify, applyToProject);

router.get("/my-application/:projectId", authVerify, getMyApplicationStatus);

router.get("/applied-projects", authVerify, getAppliedProjects);
router.get("/active-projects", authVerify, getActiveProjects);
router.put("/task-status/:id", authVerify, updateTaskStatus);


//profile
router.put("/profile", authVerify, upload.single("profilePic"), updateCollaboratorProfile);

module.exports = router;