const express = require("express");
const router = express.Router();

const authVerify = require("../middleware/authMiddleware");
const adminVerify = require("../middleware/adminMiddleware");

const {
  adminLogin,
  viewCollaborators,
  viewMentors,
  viewCreators,
  approveUser,
  rejectUser
} = require("../controllers/adminController");

// ----------------- ROUTES -----------------

// login (no middleware)
router.post("/login", adminLogin);

// view users (admin only)
router.get("/view/collaborators",authVerify, adminVerify, viewCollaborators);
router.get("/view/mentors",authVerify, adminVerify, viewMentors);
router.get("/view/creators",authVerify, adminVerify, viewCreators);

// approve / reject
router.patch("/approve/:role/:id",authVerify, adminVerify, approveUser);
router.patch("/reject/:role/:id", authVerify,adminVerify, rejectUser);




module.exports = router;