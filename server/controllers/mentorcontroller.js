const Mentor = require("../models/mentorSchema")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

// const transport =require("../services/emailservice")
// const {randomBytes}=require("node:crypto")
// This file contains business logic for mentor (register, login, etc.)
// ----------------- REGISTER -----------------
exports.registerMentor = async (req, res) => {
    try{
        const { fullName, email, password, phone,expertise, experience,credentials,bio } = req.body
        
       // Check if already exists
        const existingUser = await Mentor.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: "User already exists" }); 
        }
    
        const hashPassword = bcrypt.hashSync(password, 10)
        const newMentor = new Mentor({
            fullName,
            email,
            password: hashPassword,
            phone,
            expertise: Array.isArray(expertise)
                ? expertise
                : expertise.split(",").map(e => e.trim()),
            experience,
            credentials,
            bio,
            profilePic : req.file ? req.file.filename : null,

            // IMPORTANT → default false (admin must approve)
            Activated: false
        });

        await newMentor.save();
        // Renaming password to avoid conflict and hide it from response
        const { password: hashedPassword, ...mentorData } = newMentor._doc;
        res.send({ 
            message: "Mentor registered successfully. Wait for admin approval.", 
            mentor : mentorData
        });
    } catch (err){
        res.status(500).send({message:"Server error", error: err.message});
    }
};

// ----------------- LOGIN -----------------
exports.loginMentor = async (req, res) => {
    try{
        const { email, password } = req.body
        const mentor = await Mentor.findOne({ email })

        if (!mentor) {
            return res.status(404).send({ message: "No such user" })

        }
        //  Check admin approval
        if (!mentor.Activated) {
            return res.status(403).send({
                message: "Account not approved by admin yet"
            });
        }
        
        const iscrtPassword = bcrypt.compareSync(password, mentor.password);
        
        if (!iscrtPassword) {
            return res.status(400).send({ message: "Incorrect Password" });
        }
            
        //Add role in token
        const token = jwt.sign(
            { mentorId: mentor._id , role : "mentor"},
            process.env.JWT_TOKEN,
            {expiresIn: "1d"}
        );
        // Renaming password to avoid conflict and hide it from response
        const { password: hashedPassword, ...mentorData } = mentor._doc;
        res.send({ 
            message: "Mentor Logged in successfully",
            mentor: mentorData,
            token 
        });
    }catch(err){
        res.status(500).send({message: "Server error", error: err.message});
    }
};
//--------------UPDATE--------------------
exports.updateMentorProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const { fullName, bio, experience, credentials, expertise } = req.body;

    const updated = await Mentor.findByIdAndUpdate(
      userId,
      {
        fullName,
        bio,
        experience,
        credentials,
        expertise: Array.isArray(expertise)
          ? expertise
          : expertise.split(",").map(e => e.trim()),
        ...(req.file && { profilePic: req.file.filename })
      },
      { new: true }
    );

    res.send({ message: "Profile updated", user: updated });

  } catch (err) {
    res.status(500).send({ message: "Error updating profile" });
  }
};
