const express = require("express")
const router = express.Router()
const upload = require("../services/imgservices")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Creator = require("../models/creatorschema")
// const transport = require("../services/emailservices")
// const { randomBytes } = require("node:crypto")

router.post("/register", upload.single("Profile_pic"), async (req, res) => {
    const { fullName, email, password, phone} = req.body
    const hashPassword = bcrypt.hashSync(password, 10)
    const newCreator = new Creator({
        fullName,
        email,
        password: hashPassword,
        phone,
        Profile_pic : req.file?.filename && req.file.filename,
    })
    await newCreator.save()
    res.send({ message: "Project Creator registered successfully", newCreator })
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    const creator = await Creator.findOne({ email })

    if (!creator) {
        res.status(404).send({ message: "No such user" })

    }
    else {
        const iscrtPassword = bcrypt.compareSync(password, creator.password)
        if (iscrtPassword) {
            const token = jwt.sign({ id: creator._id }, process.env.JWT_TOKEN)
            res.send({ message: "UProject Creator Logged in successfully", creator, token })
        }
        else {
            res.status(400).send({ message: "Incorrect Password" })
        }

    }
})

module.exports=router