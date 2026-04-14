const jwt = require("jsonwebtoken");
const Creator = require("../models/creatorSchema");
const Collaborator = require("../models/collaboratorSchema");
const Mentor = require("../models/mentorSchema");

async function authVerify(req, res, next) {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).send({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        //------------//
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        // Handle admin first
        if (decoded.admin) {
            req.user = { admin: true };
            req.role = "admin";
            return next();
        }


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
        req.role = decoded.role; 

        next();

    } catch (err) {
        res.status(401).send({ message: "Invalid token" });
    }
}

module.exports = authVerify;