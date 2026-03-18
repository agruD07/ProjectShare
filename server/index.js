const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
app.use(express.json())
app.use(cors())
require("./config/db.js")

app.use("/uploads",express.static("uploads/"))

//controllers evda
const adminRoutes = require("./routes/adminRoutes.js")
app.use("/admin",adminRoutes)

const creatorRoutes = require("./routes/creatorRoutes.js")
app.use("/creator",creatorRoutes)

const collaboratorRoutes= require("./routes/collaboratorRoutes.js")
app.use("/collaborator",collaboratorRoutes)

const mentorRoutes = require("./routes/mentorRoutes.js")
app.use("/mentor",mentorRoutes)

app.listen(8080, ()=>{
    console.log("server running at port no:8080")
})