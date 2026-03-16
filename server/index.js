const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
app.use(express.json())
app.use(cors())
require("./db.js")

app.use("/uploads",express.static("uploads/"))

//controllers evda
const adminController = require("./controllers/admincontroller.js")
app.use("/admin",adminController)

const creatorController = require("./controllers/creatorcontroller.js")
app.use("/creator",creatorController)

const collaboratorController = require("./controllers/collaboratorcontroller.js")
app.use("/collaborator",collaboratorController)

const mentorController = require("./controllers/mentorcontroller.js")
app.use("/mentor",mentorController)

app.listen(8080, ()=>{
    console.log("server running at port no:8080")
})