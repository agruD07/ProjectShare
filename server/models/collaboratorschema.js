 const mongoose = require("mongoose")
 const collaboratorSchema = mongoose.Schema({
     fullName: {type:String, required:true},
     email: {type:String, required:true},
     password:{type:String, required:true},
     phone: {type:String, required:true},
    skills:{type:[String], required:true},
    portfolio: {type:[String], required:true},
    bio:{type:String, required:true},
    profilePic: {type:String},// required:true
    // Approved: {type:Bollean, default:false}
    Activated: { type: Boolean, default: false }
 })
 const Collaborator = mongoose.model("collaborator",collaboratorSchema)//collection is created here 
 module.exports = Collaborator; 
  
 