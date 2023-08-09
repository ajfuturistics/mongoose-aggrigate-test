const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  subject_name: {
    type: String,
    required: [true, "subject name is required"],
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    required: [true, "status is required"],
  },
});

const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;
