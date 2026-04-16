const express = require("express");
const router = express.Router();
const authVerify = require("../middleware/authMiddleware");

const {
  sendMessage,
  getMessages,
  getChatUsers
} = require("../controllers/chatController");

router.post("/", authVerify, sendMessage);

router.get("/users", authVerify, getChatUsers);
router.get("/:id", authVerify, getMessages);

module.exports = router;