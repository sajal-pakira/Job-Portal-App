//package imports
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";
// middleware imports
import errorMiddleware from "./middlewares/error.middleware.js";
import { sanitizeInput } from "./middlewares/sanitize.middleware.js";
// security packages
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
//files import
import connectDB from "./config/db.js";
import { swaggerDocs } from "./config/swagger.js";
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
app.use(helmet());
app.use(sanitizeInput);

app.use(ExpressMongoSanitize());

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobRoute);

// Swagger docs route
swaggerDocs(app); //Swagger at '/api-docs'

//Error middleware
app.use(errorMiddleware);

const port = process.env.PORT || 8080;
//listen
app.listen(port, () => {
  console.log(
    `node server running in ${process.env.DEV_MODE} mode on port ${port}`
  );
});
