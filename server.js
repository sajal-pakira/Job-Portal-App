//package imports
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";

//mongoDb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.get("/", (req, res) => {
  res.send("<h1>welcome to my JOB PORTAL</h1>");
});

//listen
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `node server running in ${process.env.DEV_MODE} mode on port ${port}`
  );
});
