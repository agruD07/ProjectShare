const Application = require("../models/applicationSchema");
const Project = require("../models/projectSchema");
const Task = require("../models/taskSchema");

// COLLABORATOR APPLY
exports.applyToProject = async (req, res) => {
  try {
    const { projectId, message } = req.body;
    
    // FIRST: Check if already applied
    const existing = await Application.findOne({
      projectId,
      applicantId: req.user._id
    });

    if (existing) {
      // If rejected → check 5-day rule
      if (existing.status === "Rejected") {
        const daysPassed =
          (Date.now() - new Date(existing.updatedAt)) / (1000 * 60 * 60 * 24);

        if (daysPassed < 5) {
          return res.status(400).json({
            message: `Wait ${Math.ceil(5 - daysPassed)} days to reapply`
          });
        }

        // AFTER 5 DAYS → RESET APPLICATION
        existing.status = "Pending";
        existing.message = message;
        await existing.save();

        return res.json({
          message: "Re-applied successfully",
          application: existing
        });
      }

      // If Pending or Approved → block
      return res.status(400).json({ message: "Already applied" });
    }

  //  THEN create
    const application = new Application({
      projectId,
      applicantId: req.user._id,
      message,
      status: "Pending" 
    });


    await application.save();

    res.status(201).json({ message: "Applied successfully", application });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error applying" });
  }
};


// CREATOR VIEW APPLICATIONS
exports.getApplicationsForCreator = async (req, res) => {
  try {
    const creatorId = req.user._id;

    // find creator's projects
    const projects = await Project.find({ creator: creatorId });

    const projectIds = projects.map(p => p._id);

    const applications = await Application.find({
      projectId: { $in: projectIds }
    })
      .populate("projectId", "title")
      .populate("applicantId", "fullName");

    res.json({ applications });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching applications" });
  }
};


// UPDATE STATUS (ACCEPT / REJECT)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );


    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Add collaborator
    if (status === "Approved" && application.projectId && application.applicantId) {
      await Project.findByIdAndUpdate(
        application.projectId,
        {
          $addToSet: { collaborators: application.applicantId }//prevents duplicate entries
        }
      );
    }


    if (status === "Rejected") {
      await Project.findByIdAndUpdate(
        application.projectId,
        {
          $pull: { collaborators: application.applicantId }
        }
      );

    await Task.updateMany(
        { project: application.projectId },
        {
          $pull: { assignedTo: application.applicantId }
        }
      );

    }


    const populated = await Application.findById(application._id)
      .populate("projectId", "title")
      .populate("applicantId", "fullName");

    res.json({ application: populated });

  } catch (err) {
    console.error("ERROR IN updateApplicationStatus:",err);
    res.status(500).json({ message: "Error updating status" });
  }
};


exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({ message: "Not found" });
    }

    // REMOVE from project
    await Project.findByIdAndUpdate(
      application.projectId,
      {
        $pull: { collaborators: application.applicantId }
      }
    );

    await Application.findByIdAndDelete(id);

    res.json({ message: "Application deleted & collaborator removed" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting application" });
  }
};


// GET application of logged-in user for a project
exports.getMyApplicationStatus = async (req, res) => {
  try {
    const { projectId } = req.params;

    const application = await Application.findOne({
      projectId,
      applicantId: req.user._id
    });

    if (!application) {
      return res.json({ status: "Active" });
    }

    if (application.status === "Rejected") {
      const daysPassed =
        (Date.now() - new Date(application.updatedAt)) / (1000 * 60 * 60 * 24);

      if (daysPassed > 5) {
        return res.json({ status: "Active" , remainingDays: 0});
      }

      return res.json({
        status: "Rejected",
        remainingDays: Math.ceil(5 - daysPassed)
      });

    }

    res.json({ status: application.status });

  } catch (err) {
    res.status(500).json({ message: "Error fetching status" });
  }
};