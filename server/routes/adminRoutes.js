const express = require("express");
const router = express.Router();

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
router.get("/view/collaborators", adminVerify, viewCollaborators);
router.get("/view/mentors", adminVerify, viewMentors);
router.get("/view/creators", adminVerify, viewCreators);

// approve / reject
router.patch("/approve/:role/:id", adminVerify, approveUser);
router.patch("/reject/:role/:id", adminVerify, rejectUser);

module.exports = router;