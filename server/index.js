const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
require("./db.js")
application.use(cors())
application.use(express.json())

//controllers evda
const adminController = require("./controllers/admincontroller.js")
application.use("/admin",adminController)

const creatorController = require("./controllers/creatorcontroller.js")
application.use("/admin",adminController)

const collaboratorController = require("./controllers/collaboratorcontroller.js")
application.use("/admin",adminController)

const mentorController = require("./controllers/mentorcontroller.js")
application.use("/admin",adminController)

application.listen(8080, ()=>{
    console.log("server running at port no:8080")
})