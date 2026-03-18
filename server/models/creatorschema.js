const mongoose = require("mongoose")
const creatorSchema = mongoose.Schema({
    fullName: {type:String, required:true},
    email: {type:String, required:true},
    password:{type:String, required:true},
    phone: {type:String, required:true},
    profilePic: {type:String},
    Activated: { type: Boolean, default: false }
})
const Creator = mongoose.model("creator",creatorSchema)
module.exports = Creator;