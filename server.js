//package imports
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
//files import
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";

//mongoDb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", authRoutes);

//listen
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `node server running in ${process.env.DEV_MODE} mode on port ${port}`
  );
});
