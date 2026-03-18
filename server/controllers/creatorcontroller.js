const Creator = require("../models/creatorSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// const transport = require("../services/emailservices")
// const { randomBytes } = require("node:crypto")

//--------------------Register--------------
exports.registerCreator = async (req, res) => {
    try{
        const { fullName, email, password, phone} = req.body
        // Check if already exists
        const existingUser = await Creator.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: "User already exists" });
        }
    
        const hashPassword = bcrypt.hashSync(password, 10)
        const newCreator = new Creator({
            fullName,
            email,
            password: hashPassword,
            phone,
            profilePic : req.file ? req.file.filename : null,

            // IMPORTANT → default false (admin must approve)
            Activated: false
        })
        await newCreator.save();
        // Renaming password to avoid conflict and hide it from response
        const { password: hashedPassword, ...creatorData } = newCreator._doc;

        res.send({ 
            message: "Project Creator registered successfully. Wait for admin approval.",
            creator: creatorData
        });
    }catch(err){
        res.status(500).send({message: "Server error", error: err.message});
    }
};

// ----------------- LOGIN -----------------
exports.loginCreator = async (req, res) => {
    try{
        const { email, password } = req.body;
        const creator = await Creator.findOne({ email });

        if (!creator) {
            return res.status(404).send({ message: "No such user" });
        }
        // ❗ Check admin approval
        if (!creator.Activated) {
            return res.status(403).send({
                message: "Account not approved by admin yet"
            });
        }
   
        const iscrtPassword = bcrypt.compareSync(password, creator.password)
        if (!iscrtPassword) {
            return res.status(400).send({ message: "Incorrect Password" })
        }
        //Add role in token
        const token = jwt.sign({ 
            creatorId: creator._id, role :"creator" },
            process.env.JWT_TOKEN,
            {expiresIn : "1d"}
        );

        // Renaming password to avoid conflict and hide it from response
        const { password: hashedPassword, ...creatorData } = creator._doc;

        res.send({ 
            message: "Project Creator Logged in successfully",
            creator: creatorData,
            token 
        });
    }catch(err){
        res.status(500).send({message : "Server error", error:err.message});
    }
};

