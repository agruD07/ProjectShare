const express = require("express");
const router = express.Router();
const authVerify = require("../middleware/authMiddleware");

const upload = require("../services/imgService");
const { registerMentor, loginMentor, updateMentorProfile } = require("../controllers/mentorController");
// This file defines API routes and connects them to controller functions.
// ----------------- ROUTES -----------------
router.post("/register", upload.single("profilePic"), registerMentor);
router.post("/login", loginMentor);


router.get("/profile", authVerify, (req, res) => {
  res.send({ user: req.user });
});

router.put("/profile", authVerify, upload.single("profilePic"), updateMentorProfile);
module.exports = router;