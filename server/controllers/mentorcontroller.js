const express = require("express")
const Mentor = require("../models/mentorschema")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const upload = require("../services/imgservices")
// const transport =require("../services/emailservice")
const router = express.Router()
const {randomBytes}=require("node:crypto")
router.post("/register", upload.fields([{name:"profilePhoto", maxCount: 1}]), async (req, res) => {
    const { fullName, email, password, phone,expertise, experience,credentials,bio } = req.body
    const hashPassword = bcrypt.hashSync(password, 10)
    const newMentor = new Mentor({
        fullName,
        email,
        password: hashPassword,
        phone,
        expertise,
        experience,
        credentials,
        bio,
        profilePhoto : req.file?.profilePhoto && req.file.profilePhoto[0].filename,
    })
    await newMentor.save()
    res.send({ message: "Mentor registered successfully", newMentor })
})
router.post("/login", async (req, res) => {
    const { email, password } = req.body
    const mentor = await Mentor.findOne({ email })

    if (!mentor) {
        res.status(404).send({ message: "No such user" })

    }
    else {
        const iscrtPassword = bcrypt.compareSync(password, mentor.password)
        if (iscrtPassword) {
            const token = jwt.sign({ id: mentor._id }, process.env.JWT_TOKEN)
            res.send({ message: "Mentor Logged in successfully", mentor, token })
        }
        else {
            res.status(400).send({ message: "Incorrect Password" })
        }

    }
})

module.exports=router