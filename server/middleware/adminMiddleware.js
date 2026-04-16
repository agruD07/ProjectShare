const jwt = require("jsonwebtoken");

function adminVerify(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        // FIX 1: Check header
        if (!authHeader) {
            return res.status(401).send({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_TOKEN);

        // ❗ FIX 2: Check admin flag ONLY
        if (!decoded.admin) {
            return res.status(403).send({ message: "Not an admin" });
        }

        next();

    } catch (err) {
        res.status(401).send({ message: "Invalid token" });
    }
}

module.exports = adminVerify;