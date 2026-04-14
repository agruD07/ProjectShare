 const mongoose = require("mongoose")
 const mentorSchema = mongoose.Schema({
     fullName: {type:String, required:true},
     email: {type:String, required:true},
     password:{type:String, required:true},
     phone: {type:String, required:true},
     expertise:{type:String, required:true},
     experience: {type:String, required:true},
     credentials: {type:String, required:true},
     bio:{type:String, required:true},
     profilePic: {type:String},//, required:true
     Activated: { type: Boolean, default: false }
 })
 const Mentor = mongoose.model("mentor",mentorSchema)
 module.exports = Mentor; 
  
 

