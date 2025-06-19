import express from "express";
import userAuth from "../middlewares/auth.middleware.js";
import {
  createJobController,
  deleteJobController,
  getAllJobs,
  updateJobController,
} from "../controllers/job.controller.js";
const router = express.Router();

// create job
router.post("/create", userAuth, createJobController);

// get all jobs
router.get("/get", userAuth, getAllJobs);

// update job
router.patch("/update/:id", userAuth, updateJobController);

// delete job
router.delete("/delete/:id", userAuth, deleteJobController);

export default router;
