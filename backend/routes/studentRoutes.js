const express = require("express");
const {
  // addDummyStudents,
  getReport,
  getStudents,
} = require("../controllers/studentController");

const router = express.Router();

router.route("/").get(getStudents).post(getReport);

module.exports = router;
