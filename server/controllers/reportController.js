const Report = require("../models/reportSchema")
// const jwt = require("jsonwebtoken")
// const bcrypt = require("bcrypt")
exports.createReport = async (req, res) => {
  try {
    const { reportType, description, projectTitle, creatorName } = req.body;

    const report = new Report({
      reporterName: req.user.name, // from auth middleware
      reportType,
      description,
      projectTitle,
      creatorName,
    });

    await report.save();

    res.send({ message: "Report submitted" });

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};