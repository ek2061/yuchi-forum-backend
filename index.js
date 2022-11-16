const cors = require("cors");
const express = require("express");
const FileStreamRotator = require("file-stream-rotator");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");
const sequelize = require("./db");
require("dotenv").config();

const app = express();

// test db connection
app.get("/db", async (req, res, next) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({ msg: "connected success" });
  } catch (error) {
    console.log(`資料庫錯誤原因: ${error}`);
    res.status(500).json({ msg: "connected fail" });
  }
});

const logDirectory = path.join(__dirname, "logger");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
var accessLogStream = FileStreamRotator.getStream({
  date_format: "YYYYMMDD",
  filename: path.join(logDirectory, "access-%DATE%.log"),
  frequency: "daily",
  verbose: false,
});
// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));
// setup body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// setup cors
app.use(cors());

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server running in ${port}`);
});
