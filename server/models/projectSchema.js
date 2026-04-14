const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Web Development",
        "Mobile Development",
        "UI/UX Design",
        "Data Science",
        "Machine Learning",
        "Cloud Computing",
        "CyberSecurity",
        "DevOps",
        "Project Management",
        "Marketing",
        "Content Creation",
        "Business Strategy",
      ],
    },
    techStack: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ["Planning", "In Progress", "Completed", "On Hold"],
      default: "Planning",
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "creator",
    },
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "collaborator",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("project", projectSchema);