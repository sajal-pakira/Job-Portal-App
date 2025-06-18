//package imports
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";
//files import
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";

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

//validation middleware
app.use(errorMiddleware);

const port = process.env.PORT || 8080;
//listen
app.listen(port, () => {
  console.log(
    `node server running in ${process.env.DEV_MODE} mode on port ${port}`
  );
});
