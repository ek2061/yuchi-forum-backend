import cors from "cors";
import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import { getStream } from "file-stream-rotator";
import { existsSync, mkdirSync } from "fs";
import morgan from "morgan";
import path from "path";
import url from "url";
import commentApi from "./api/commentApi";
import postApi from "./api/postApi";
import userApi from "./api/userApi";
import { sequelize } from "./db.js";
import errorHandler from "./middleware/errorHandler.js";
dotenv.config();

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

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logDirectory = path.join(__dirname, "logger");
existsSync(logDirectory) || mkdirSync(logDirectory);
var accessLogStream = getStream({
  date_format: "YYYYMMDD",
  filename: path.join(logDirectory, "access-%DATE%.log"),
  frequency: "daily",
  verbose: false,
});
// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));
// setup body-parser
app.use(json());
app.use(urlencoded({ extended: false }));
// setup cors
app.use(cors());
// setup router (must be written after cors)
app.use("/api/post", postApi);
app.use("/api/comment", commentApi);
app.use("/api/user", userApi);
// setup error handler
app.use(errorHandler);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server running in ${port}`);
});
