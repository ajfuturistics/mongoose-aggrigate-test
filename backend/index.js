const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./utils/db");
const studentRoutes = require("./routes/studentRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const marksRoutes = require("./routes/marksRoutes");

dotenv.config({});

const app = express();
const port = process.env.PORT || 5000;

// Connect DB
connectDB(process.env.DB_URI);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/student", studentRoutes);
app.use("/subject", subjectRoutes);
app.use("/marks", marksRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
