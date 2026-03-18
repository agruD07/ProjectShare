const express = require("express");
const router = express.Router();

const upload = require("../services/imgservices");
const { registerCollaborator, loginCollaborator } = require("../controllers/collaboratorController");
// This file defines API routes and connects them to controller functions.
// ----------------- ROUTES -----------------
router.post("/register", upload.single("profilePic"), registerCollaborator);
router.post("/login", loginCollaborator);

module.exports = router;