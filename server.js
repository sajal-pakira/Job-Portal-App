import errorMiddleware from "./middlewares/error.middleware.js";
//package imports
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";
// security packages
import helmet from "helmet";
import xss from "xss";
import ExpressMongoSanitize from "express-mongo-sanitize";
//files import
import connectDB from "./config/db.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import jobRoute from "./routes/job.route.js";

//mongoDb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet(``));
app.use(xss(``));
app.use(ExpressMongoSanitize())

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobRoute);

//validation middleware
app.use(errorMiddleware);

const port = process.env.PORT || 8080;
//listen
app.listen(port, () => {
  console.log(
    `node server running in ${process.env.DEV_MODE} mode on port ${port}`
  );
});
