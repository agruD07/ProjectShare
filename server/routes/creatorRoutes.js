const express = require("express");
const router = express.Router();

const upload = require("../services/imgservices");
const { registerCreator, loginCreator } = require("../controllers/creatorController");
// This file defines API routes and connects them to controller functions.
// ----------------- ROUTES -----------------
router.post("/register", upload.single("profilePic"), registerCreator);
router.post("/login", loginCreator);

module.exports = router;