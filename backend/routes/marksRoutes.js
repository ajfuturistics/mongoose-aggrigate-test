const express = require("express");
const { addMarks } = require("../controllers/marksController");

const router = express.Router();

router.route("/").post(addMarks);

module.exports = router;
