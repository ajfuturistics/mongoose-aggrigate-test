const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "firstname is required"],
  },
  lastname: {
    type: String,
    required: [true, "lastname is required"],
  },
  mobile: {
    type: String,
  },
  email: {
    type: String,
  },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
