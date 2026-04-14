const express = require("express");
const router = express.Router();

const upload = require("../services/imgService");
const { registerMentor, loginMentor } = require("../controllers/mentorController");
// This file defines API routes and connects them to controller functions.
// ----------------- ROUTES -----------------
router.post("/register", upload.single("profilePic"), registerMentor);
router.post("/login", loginMentor);

module.exports = router;