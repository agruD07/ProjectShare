const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/")//mongodb local copy
const db = mongoose.connection
db.on ("error", (e) => {
    console.log("Connection Error", e)
})
db.once("open",() => {
    console.log("Connection Established")
})