const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    description: { type: String },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",//collection
      required: true,
    },

    assignedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "assignedModel",
      },
    ],

    assignedModel: {
      type: String,
      enum: ["creator", "collaborator"],//model same name
      default: "creator",//enum same case should be used
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "creator",//model name
      required: true,
    },

    status: {
      type: String,
      enum: ["Open", "In Progress", "Completed", "Blocked"],
      default: "Open",
    },

    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },

    dueDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("task", taskSchema);