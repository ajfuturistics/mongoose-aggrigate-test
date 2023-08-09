const Subject = require("../models/subjectModel");

const getSubject = async (req, res) => {
  try {
    const activeSubjects = await Subject.find({ status: "active" });
    res.status(200).json({ subjects: activeSubjects });
  } catch (error) {
    res.status(400).json({ message: "Failed to get subjects" });
  }
};

const addDummySubjects = async (req, res) => {
  try {
    // const subjects = [
    //   {
    //     subject_name: "English",
    //     status: "active",
    //   },
    //   {
    //     subject_name: "Science",
    //     status: "active",
    //   },
    //   {
    //     subject_name: "Maths",
    //     status: "active",
    //   },
    //   {
    //     subject_name: "Hindi",
    //     status: "inactive",
    //   },
    // ];

    // const data = await Subject.insertMany(subjects);
    // res.status(201).json(data);

    res.status(201).json({ message: "no data added" });
  } catch (error) {
    res.status(400).json({ message: "Failed to add students" });
  }
};

module.exports = { getSubject, addDummySubjects };
