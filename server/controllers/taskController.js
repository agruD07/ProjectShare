const Task = require("../models/taskSchema");
const Project = require("../models/projectSchema");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      project,
      assignedTo,
      assignedModel,
      status,
      priority,
      dueDate,
    } = req.body;

    const task = new Task({
      title,
      description,
      project,
      assignedTo,
      assignedModel,
      status,
      priority,
      dueDate,
      createdBy: req.user._id,
    });

    await task.save();
    // populate before sending
    const populatedTask = await task.populate("assignedTo", "fullName");
    res.status(201).json({ message: "Task created", task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating task" });
  }
};

// GET TASKS BY PROJECT
exports.getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const tasks = await Task.find({ project: projectId })
      .populate("assignedTo", "fullName");//taskSchema

//     const tasks = await Task.find({ project: projectId })
//         .populate({
//          path: "assignedTo",
//          select: "fullName",
//      });

    res.json({ tasks });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

//-------------get project user---assigned to -------
exports.getProjectUsers = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId)
      .populate("creator", "fullName")
      .populate("collaborators", "fullName");//projectSchema


    if (!project) {
        return res.status(404).json({ message: "Project not found" });
    }
    const users = [
      {
        _id: project.creator._id,
        name: project.creator.fullName,
        role: "creator",
      },
      ...project.collaborators.map((c) => ({
        _id: c._id,
        name: c.fullName,
        role: "collaborator",
      })),
    ];

    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    await Task.findByIdAndDelete(taskId);

    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting task" });
  }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const updated = await Task.findByIdAndUpdate(
      taskId,
      req.body,
      { new: true }
    ).populate("assignedTo", "fullName");

    res.json({ task: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating task" });
  }
};

//update status of tasks by collaborator
exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // CHECK if current user is assigned
    const isAssigned = task.assignedTo.some(
      userId => userId.toString() === req.user._id.toString()
    );

    if (!isAssigned) {
      return res.status(403).json({
        message: "You are not allowed to update this task"
      });
    }

    task.status = status;
    await task.save();

    res.json({ task });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating task" });
  }
};