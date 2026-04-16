const Collaborator = require("../models/collaboratorSchema")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// const transport =require("../services/emailservice")
//const {randomBytes}=require("node:crypto")

// ----------------- REGISTER -----------------
exports.registerCollaborator = async (req, res) => {
    try{
        const { fullName, email, password, phone,skills, portfolio,bio } = req.body
        // Check if already exists
        const existingUser = await Collaborator.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: "User already exists" });
        }
   

        const hashPassword = bcrypt.hashSync(password, 10);
        const newCollaborator = new Collaborator({
            fullName,
            email,
            password: hashPassword,
            phone,
            skills: Array.isArray(skills)
                ? skills
                : typeof skills === "string"
                    ? skills.split(",").map(s => s.trim())
                    : [],

            portfolio: Array.isArray(portfolio)
                ? portfolio
                : typeof portfolio === "string"
                    ? portfolio.split(",").map(p => p.trim())
                    : [],
            bio,
            profilePic : req.file ? req.file.filename : null,

            // IMPORTANT → default false (admin must approve)
            Activated: false
        });
        await newCollaborator.save();
        const { password: hashedPassword, ...collaboratorData } = newCollaborator._doc;
        res.send({ 
            message: "Collaborator registered successfully. Wait for admin approval.",
            collaborator : collaboratorData
        });
    
    }catch (err) {
        res.status(500).send({ message: "Server error", error: err.message });
    }

};

// ----------------- LOGIN -----------------
exports.loginCollaborator = async (req, res) => {
    try{
        const { email, password } = req.body;

        const collaborator = await Collaborator.findOne({ email });

        collaborator.lastLogin = new Date();
        await collaborator.save();

        if (!collaborator) {
            return res.status(404).send({ message: "No such user" });

        }
        // ❗ Check admin approval
        if (!collaborator.Activated) {
            return res.status(403).send({
                message: "Account not approved by admin yet"
            });
        }
    
        const iscrtPassword = bcrypt.compareSync(password, collaborator.password)
        
        if (!iscrtPassword) {
            return res.status(400).send({ message: "Incorrect Password" });
        }
        //Add role in token
        // We store 'role' in JWT because users are in different collections.
        // During authentication, this role helps the middleware decide
        // which model (Creator/Collaborator/Mentor) to use to fetch the user.
        const token = jwt.sign(
            { collaboratorId: collaborator._id, role: "collaborator" },
             process.env.JWT_TOKEN,
              { expiresIn: "1d" }
            );
            const { password : hashedPassword, ...collaboratorData } = collaborator._doc;
            res.send({ 
                message: "Collaborator Logged in successfully",
                collaborator: collaboratorData,
                token 
            });

    }catch(err){
        res.status(500).send({message:"Server error", error: err.message});
    }
    
};
//----------------------UPDATE-----------------------------------
exports.updateCollaboratorProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const { fullName, skills, bio, phone, portfolio } = req.body;

    const updated = await Collaborator.findByIdAndUpdate(
      userId,
      {
        fullName,
        bio,
        phone,
        skills: Array.isArray(skills)
            ? skills
            : typeof skills === "string"
                ? skills.split(",").map(s => s.trim())
                : [],

        portfolio: Array.isArray(portfolio)
            ? portfolio
            : typeof portfolio === "string"
                ? portfolio.split(",").map(p => p.trim())
                : [],

        ...(req.file && { profilePic: req.file.filename })
      },
      { new: true }
    );

    res.send({ message: "Profile updated", user: updated });

  } catch (err) {
    res.status(500).send({ message: "Error updating profile" });
  }
};

