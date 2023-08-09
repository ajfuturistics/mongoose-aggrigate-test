const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Types.ObjectId,
    ref: "Student",
    required: [true, "student id is required"],
  },
  subjectId: {
    type: mongoose.Types.ObjectId,
    ref: "Subject",
    required: [true, "subject id is required"],
  },
  marks: {
    type: Number,
    min: [0, "Marks cannot be less than zero"],
    max: [100, "Marks cannot be greater than 100"],
  },
});

const Marks = mongoose.model("Marks", marksSchema);
module.exports = Marks;
