const { ObjectId } = require("bson");
const Student = require("../models/studentModal");

const getStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json({ students });
  } catch (error) {
    res.status(400).json({ message: "Failed to get students" });
  }
};

const getReport = async (req, res) => {
  const { search = "", subjectId = "", avgStart = 0, avgEnd = 100 } = req.body;
  // console.log({ search, subjectId, avgStart, avgEnd });

  try {
    const pipeline = [
      {
        $lookup: {
          from: "marks",
          localField: "_id",
          foreignField: "studentId",
          as: "result",
        },
      },

      {
        $project: {
          _id: 1,
          fullname: { $concat: ["$firstname", " ", "$lastname"] },
          total: { $sum: ["$result.marks"] },
          avg: {
            $ifNull: [
              { $avg: "$result.marks" }, // Calculate average if result.marks array exists
              0, // Set average to 0 if result.marks array is empty
            ],
          },
          mobile: 1,
          email: 1,
          numOfSubjects: {
            $size: "$result",
          },
          result: 1,
          subjectInfo: 1,
        },
      },

      {
        $addFields: {
          percentage: {
            $cond: [
              { $eq: ["$numOfSubjects", 0] }, // Check if numOfSubjects is zero
              0, // Set percentage to 0 if numOfSubjects is zero
              {
                $multiply: [
                  {
                    $divide: ["$total", { $multiply: [100, "$numOfSubjects"] }],
                  },
                  100,
                ],
              },
            ],
          },
        },
      },
      {
        $setWindowFields: {
          sortBy: { percentage: -1 },
          output: { rank: { $denseRank: {} } },
        },
      },

      {
        $match: {
          fullname: { $regex: search, $options: "i" },
          avg: {
            $gte: avgStart, // Greater than or equal to lower limit
            $lte: avgEnd, // Less than or equal to upper limit
          },
        },
      },
    ];

    if (subjectId) {
      pipeline.push({
        $match: {
          "result.subjectId": new ObjectId(subjectId),
        },
      });
    }

    const report = await Student.aggregate(pipeline);

    res.status(201).json({ report });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const addDummyStudents = async (req, res) => {
  try {
    // const students = [
    //   {
    //     firstname: "John",
    //     lastname: "Smith",
    //     mobile: "1234567890",
    //     email: "john@gmail.com",
    //   },
    //   {
    //     firstname: "Anna",
    //     lastname: "Smith",
    //     mobile: "1234567890",
    //     email: "anna@gmail.com",
    //   },
    // ];

    // const data = await Student.insertMany(students);
    // res.status(201).json(data);

    res.status(201).json({ message: "no data added" });
  } catch (error) {
    res.status(400).json({ message: "Failed to add students" });
  }
};

module.exports = { getStudents, addDummyStudents, getReport };
