const Chat = require("../models/chatSchema");

const Creator = require("../models/creatorSchema");
const Collaborator = require("../models/collaboratorSchema");
const Mentor = require("../models/mentorSchema");

// SEND MESSAGE
exports.sendMessage = async (req, res) => {
  const { receiverId, message } = req.body;

  const newMsg = new Chat({
    sender: req.user._id,
    receiver: receiverId,
    message
  });

  await newMsg.save();
  res.send({ message: "Sent" });
};

// GET CHAT
exports.getMessages = async (req, res) => {
  const userId = req.user._id;
  const otherId = req.params.id;

  const messages = await Chat.find({
    $or: [
      { sender: userId, receiver: otherId },
      { sender: otherId, receiver: userId }
    ]
  }).sort({ createdAt: 1 });

  res.send(messages);
};

// GET CHAT USERS
exports.getChatUsers = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).send({ message: "User not found" });
    }

    const chats = await Chat.find({
      $or: [{ sender: userId }, { receiver: userId }]
    });

    const userIds = new Set();

    chats.forEach(c => {
      if (c.sender && c.sender.toString() !== userId.toString())
        userIds.add(c.sender.toString());

      if (c.receiver && c.receiver.toString() !== userId.toString())
        userIds.add(c.receiver.toString());
    });

    const ids = Array.from(userIds);

    const creators = await Creator.find({ _id: { $in: ids } }).select("-password");
    const collaborators = await Collaborator.find({ _id: { $in: ids } }).select("-password");
    const mentors = await Mentor.find({ _id: { $in: ids } }).select("-password");

    const users = [...creators, ...collaborators, ...mentors];

    //  ADD last message (correct place)
    const usersWithLastMsg = await Promise.all(
      users.map(async (u) => {
        const lastMsg = await Chat.findOne({
          $or: [
            { sender: userId, receiver: u._id },
            { sender: u._id, receiver: userId }
          ]
        }).sort({ createdAt: -1 });

        return {
          ...u._doc,
          lastMessage: lastMsg?.message || ""
        };
      })
    );

    //  SEND ONLY ONCE
    res.send({ users: usersWithLastMsg });
    

  } catch (err) {
    console.error("CHAT USER ERROR:", err);
    res.status(500).send({ message: "Error fetching chat users" });
  }
};