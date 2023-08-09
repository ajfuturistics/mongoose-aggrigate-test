const Marks = require("../models/marksModel");

const addMarks = async (req, res) => {
  try {
    const { studentId, subjectId, mark } = req.body;

    // if need to validate
    const exists = await Marks.findOne({
      studentId: studentId,
      subjectId: subjectId,
    });
    if (exists) {
      return res
        .status(400)
        .json({ message: "This subject is already added for this student" });
    }

    const marks = await Marks.create({ studentId, subjectId, marks: mark });

    res.status(201).json({ message: "Marks added successfully", marks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { addMarks };
