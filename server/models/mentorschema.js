 const mongoose = require("mongoose")
 const mentorschema = mongoose.Schema({
     fullName: {type:String, required:true},
     email: {type:String, required:true},
     password:{type:String, required:true},
     phone: {type:String, required:true},
     expertise:{type:String, required:true},
     experience: {type:String, required:true},
     credentials: {type:String, required:true},
     bio:{type:String, required:true},
     profilePhoto: {type:String},//, required:true
 })
 const Mentor = mongoose.model("mentors",mentorschema)
 module.exports = Mentor; 
  
 

