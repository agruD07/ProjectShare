const Project = require("../models/projectSchema");
const Application = require("../models/applicationSchema");


//----------create project---POST-------
exports.createProject = async (req, res) => {
  try {
    const { title, description, category, techStack, status } = req.body;

    const project = new Project({
      title,
      description,
      category,
      techStack,
      status,
      creator: req.user._id,
    });

    await project.save();

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//---------View project---GET------
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ creator: req.user._id })
      .populate("collaborators", "fullName email bio skills profilePic")

    res.json({ projects });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//GET ALL PROJECTS (for Browse page)
exports.getAllProjects = async (req, res) => {
  try {

    const userId = req.user._id;

    const projects = await Project.find({
      status: { $in: ["Planning", "In Progress"] }
    })
    .populate("creator", "fullName");

    // attach applicationStatus to each project
    const updatedProjects = await Promise.all(
      projects.map(async (p) => {

        const application = await Application.findOne({
          projectId: p._id,
          applicantId: userId
        });

        let applicationStatus = "Active";
        let remainingDays = 0;

        if (application) {
          if (application.status === "Rejected") {
            const daysPassed =
              (Date.now() - new Date(application.updatedAt)) / (1000 * 60 * 60 * 24);

           
                  if (daysPassed <= 5) {
                    applicationStatus = "Rejected";
                    remainingDays = Math.ceil(5 - daysPassed);
                  } else {
                      applicationStatus = "Active";
                  }
              } else {
                // Pending or Approved
                applicationStatus = application.status || "Pending";
              }
            }

            return {
              ...p._doc,
              applicationStatus,
              remainingDays
      };
      })
    );


    res.json({ projects :updatedProjects  });

  } catch (err) {
    console.error("ERROR IN getAllProjects:", err);
    res.status(500).json({ message: "Error fetching projects" });
  }
};


//Get Single Project
exports.getSingleProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("creator", "fullName")
      .populate("collaborators", "fullName");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ project });

  } catch (err) {
    res.status(500).json({ message: "Error fetching project" });
  }
};


// GET APPLIED PROJECTS
exports.getAppliedProjects = async (req, res) => {
  try {
    const userId = req.user._id;

    const applications = await Application.find({
      applicantId: userId
    }).populate({
      path: "projectId",
      populate: { path: "creator", select: "fullName" }
    });

    const projects = applications
      .filter(app => app.projectId) // safety
      .map(app => ({
        ...app.projectId._doc,
        applicationStatus: app.status
      }));

    res.json({ projects });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching applied projects" });
  }
};


// GET ACTIVE (APPROVED) PROJECTS
exports.getActiveProjects = async (req, res) => {
  try {
    const userId = req.user._id;

    const applications = await Application.find({
      applicantId: userId,
      status: "Approved"
    }).populate({
      path: "projectId",
      populate: { path: "creator", select: "fullName" }
    });

    const projects = applications
      .filter(app => app.projectId)
      .map(app => app.projectId);

    res.json({ projects });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching active projects" });
  }
};

// UPDATE PROJECT
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Project.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json({ project: updated });

  } catch (err) {
    res.status(500).json({ message: "Error updating project" });
  }
};

// DELETE PROJECT
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    await Project.findByIdAndDelete(id);

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Error deleting project" });
  }
};
