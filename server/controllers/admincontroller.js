const jwt = require("jsonwebtoken");

const Collaborator = require("../models/collaboratorSchema");
const Mentor = require("../models/mentorSchema");
const Creator = require("../models/creatorSchema");

// ----------------- ADMIN LOGIN -----------------
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@admin.com" && password === "Admin@123") {
    const token = jwt.sign({ admin: true }, process.env.JWT_TOKEN, {
      expiresIn: "1d",
    });

    return res.send({ message: "Login Successfully", token });
  } else {
    return res.status(401).send({ message: "Login Failed" });
  }
};


// ----------------- VIEW USERS -----------------
exports.viewCollaborators = async (req, res) => {
  try {
    // remove password from response
    const collaborators = await Collaborator.find().select("-password"); // ✅ FIX

    res.send({
      message: "Registered Collaborators",
      collaborators
    });
  } catch (err) {
    res.status(500).send({ message: "Server error", error: err.message });
  }
};

exports.viewMentors = async (req, res) => {
  try {
        // remove password from response
    const mentors = await Mentor.find().select("-password");

    res.send({
      message: "Registered Mentors",
      mentors
    });
  } catch (err) {
    res.status(500).send({ message: "Server error", error: err.message });
  }
};

exports.viewCreators = async (req, res) => {
  try {
    // remove password from response
    const creators = await Creator.find().select("-password");

    res.send({
      message: "Registered Project Creators",
      creators
    });
  } catch (err) {
    res.status(500).send({ message: "Server error", error: err.message });
  }
};


// ----------------- APPROVE USER -----------------
exports.approveUser = async (req, res) => {
  const { role, id } = req.params;
  let Model;

  if (role === "collaborator") Model = Collaborator;
  else if (role === "mentor") Model = Mentor;
  else if (role === "creator") Model = Creator;
  else return res.status(400).send({ message: "Invalid role" });

  const user = await Model.findByIdAndUpdate(
    id,
    { Activated: true },
    { new: true }
  );

  if (!user) return res.status(404).send({ message: "User not found" });

  res.send({ message: `${role} approved successfully`, user });
};


// ----------------- REJECT USER -----------------
exports.rejectUser = async (req, res) => {
  const { role, id } = req.params;
  let Model;

  if (role === "collaborator") Model = Collaborator;
  else if (role === "mentor") Model = Mentor;
  else if (role === "creator") Model = Creator;
  else return res.status(400).send({ message: "Invalid role" });

  const user = await Model.findByIdAndUpdate(
    id,
    { Activated: false },
    { new: true }
  );

  if (!user) return res.status(404).send({ message: "User not found" });

  res.send({ message: `${role} rejected successfully`, user });
};