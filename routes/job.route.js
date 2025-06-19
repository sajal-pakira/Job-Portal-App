import express from "express";
import userAuth from "../middlewares/auth.middleware.js";
import { createJobController } from "../controllers/job.controller.js";
const router = express.Router();

router.post("/create-job", userAuth,createJobController);

export default router;
