import express from "express";
import userAuth from "../middlewares/auth.middleware.js";
import {
  createJobController,
  deleteJobController,
  getAllJobs,
  jobStatsController,
  updateJobController,
} from "../controllers/job.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job management routes
 */

/**
 * @swagger
 * /api/v1/job/create:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JobCreateInput'
 *     responses:
 *       201:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/v1/job/get:
 *   get:
 *     summary: Get all jobs for the logged-in user
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: searchForPosition
 *         schema:
 *           type: string
 *         description: Filter by job position
 *       - in: query
 *         name: searchForCompany
 *         schema:
 *           type: string
 *         description: Filter by company name
 *       - in: query
 *         name: searchForWorkLocation
 *         schema:
 *           type: string
 *         description: Filter by work location
 *     responses:
 *       200:
 *         description: List of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalJobs:
 *                   type: number
 *                   example: 3
 *                 jobs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Job'
 */

/**
 * @swagger
 * /api/v1/job/update/{id}:
 *   patch:
 *     summary: Update a job by ID
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JobUpdateInput'
 *     responses:
 *       200:
 *         description: Job updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       404:
 *         description: Job not found
 */

/**
 * @swagger
 * /api/v1/job/delete/{id}:
 *   delete:
 *     summary: Delete a job by ID
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       404:
 *         description: Job not found
 */

/**
 * @swagger
 * /api/v1/job/stats:
 *   get:
 *     summary: Get job statistics
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistics for jobs by status and month
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stats:
 *                   type: object
 *                   example:
 *                     pending: 2
 *                     interview: 1
 *                     reject: 0
 *                 monthlyApplication:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         example: "Jun 2025"
 *                       count:
 *                         type: number
 *                         example: 3
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     JobCreateInput:
 *       type: object
 *       required:
 *         - company
 *         - position
 *         - workLocation
 *       properties:
 *         company:
 *           type: string
 *           example: Google
 *         position:
 *           type: string
 *           example: Frontend Developer
 *         workLocation:
 *           type: string
 *           example: Bengaluru, India
 *         status:
 *           type: string
 *           enum: [pending, interview, reject]
 *           example: pending
 *         workType:
 *           type: string
 *           enum: [full-time, part-time, internship, freelance]
 *           example: full-time
 *         jobType:
 *           type: string
 *           enum: [Remote, On-site, Hybrid]
 *           example: Remote
 *
 *     JobUpdateInput:
 *       type: object
 *       properties:
 *         company:
 *           type: string
 *         position:
 *           type: string
 *         workLocation:
 *           type: string
 *         status:
 *           type: string
 *           enum: [pending, interview, reject]
 *         workType:
 *           type: string
 *           enum: [full-time, part-time, internship, freelance]
 *         jobType:
 *           type: string
 *           enum: [Remote, On-site, Hybrid]
 *
 *     Job:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 665fa7d2b6a1e3adce123456
 *         company:
 *           type: string
 *           example: Google
 *         position:
 *           type: string
 *           example: Frontend Developer
 *         status:
 *           type: string
 *           enum: [pending, interview, reject]
 *           example: interview
 *         workType:
 *           type: string
 *           enum: [full-time, part-time, internship, freelance]
 *           example: full-time
 *         jobType:
 *           type: string
 *           enum: [Remote, On-site, Hybrid]
 *           example: Remote
 *         workLocation:
 *           type: string
 *           example: Bengaluru, India
 *         createdBy:
 *           type: string
 *           example: 665abc123def45678901a234
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

// Routes
router.post("/create", userAuth, createJobController);
router.get("/get", userAuth, getAllJobs);
router.patch("/update/:id", userAuth, updateJobController);
router.delete("/delete/:id", userAuth, deleteJobController);
router.get("/stats", userAuth, jobStatsController);

export default router;
