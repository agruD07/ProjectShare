const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  reporterName: {type:String, required:true},
  reportType: {type:String, required:true},
  description: {type:String, required:true},
  projectTitle: {type:String, required:true},
  creatorName: {type:String, required:true},
}, { timestamps: true });

module.exports = mongoose.model("report", reportSchema);