const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, required: true },
  message: String,
}, {
  timestamps: true   // THIS LINE ADDS createdAt + updatedAt
});

module.exports = mongoose.model("chat", chatSchema);