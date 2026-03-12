 const mongoose = require("mongoose")
 const collaboratorschema = mongoose.Schema({
     fullName: {type:String, required:true},
     email: {type:String, required:true},
     password:{type:String, required:true},
     phone: {type:String, required:true},
    skills:{type:String, required:true},
    portfolio: {type:String, required:true},
    bio:{type:String, required:true},
    profilePhoto: {type:String},// required:true
    // Approved: {type:Bollean, default:false}
 })
 const Collaborator = mongoose.model("collaborators",collaboratorschema)
 module.exports = Collaborator; 
  
 