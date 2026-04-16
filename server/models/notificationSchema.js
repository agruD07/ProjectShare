const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: String,
  role: String,
  message: String,
  type: String,
  link: String,
  isRead: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Notification", notificationSchema);