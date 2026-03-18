const jwt = require("jsonwebtoken");
const Creator = require("../models/creatorSchema");
const Collaborator = require("../models/collaboratorSchema");
const Mentor = require("../models/mentorSchema");

async function authVerify(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);

        let user;

        if (decoded.role === "creator") {
            user = await Creator.findById(decoded.creatorId);
        } 
        else if (decoded.role === "collaborator") {
            user = await Collaborator.findById(decoded.collaboratorId);
        } 
        else if (decoded.role === "mentor") {
            user = await Mentor.findById(decoded.mentorId);
        }

        if (!user) return res.status(404).send({ message: "User not found" });
        if (!user.Activated) return res.status(403).send({ message: "Not approved" });

        req.user = user;
        req.role = decoded.role; // 🔥 VERY USEFUL

        next();

    } catch (err) {
        res.status(401).send({ message: "Invalid token" });
    }
}

module.exports = authVerify;