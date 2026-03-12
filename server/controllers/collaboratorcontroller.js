const express = require("express")
const Collaborator = require("../models/collaboratorschema")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const upload = require("../services/imgservices")
// const transport =require("../services/emailservice")
const router = express.Router()
const {randomBytes}=require("node:crypto")
router.post("/register", upload.single("Profile_pic"), async (req, res) => {
    const { fullName, email, password, phone,skills, portfolio,bio } = req.body
    const hashPassword = bcrypt.hashSync(password, 10)
    const newCollaborator = new Collaborator({
        fullName,
        email,
        password: hashPassword,
        phone,
        skills,
        portfolio,
        bio,
        profilePhoto : req.file?.profilePhoto && req.file.profilePhoto[0].filename,
    })
    await newCollaborator.save()
    res.send({ message: "Collaborator registered successfully", newCollaborator })
})
router.post("/login", async (req, res) => {
    const { email, password } = req.body
    const collaborator = await Collaborator.findOne({ email })

    if (!collaborator) {
        res.status(404).send({ message: "No such user" })

    }
    else {
        const iscrtPassword = bcrypt.compareSync(password, collaborator.password)
        if (iscrtPassword) {
            const token = jwt.sign({ id: collaborator._id }, process.env.JWT_TOKEN)
            res.send({ message: "Collaborator Logged in successfully", collaborator, token })
        }
        else {
            res.status(400).send({ message: "Incorrect Password" })
        }

    }
})