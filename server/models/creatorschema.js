const mongoose = require("mongoose")
const creatorschema = mongoose.Schema({
    fullName: {type:String, required:true},
    email: {type:String, required:true},
    password:{type:String, required:true},
    phone: {type:String, required:true},
    profilePhoto: {type:String},
})
const Creator = mongoose.model("creator",creatorschema)
module.exports = Creator;