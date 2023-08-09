const express = require("express");
const {
  addDummySubjects,
  getSubject,
} = require("../controllers/subjectController");

const router = express.Router();

router.route("/").get(getSubject).post(addDummySubjects);

module.exports = router;
