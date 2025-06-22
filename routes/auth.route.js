import express from "express";
import rateLimit from "express-rate-limit";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller.js";

const router = express.Router();

// Rate Limiter Middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes for user registration and login
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegisterInput'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input or user already exists
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a user and return JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLoginInput'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: your-jwt-token-here
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegisterInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: User's first name
 *           example: Sajal
 *         lastName:
 *           type: string
 *           description: User's last name (optional)
 *           example: Pakira
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: sajal@example.com
 *         password:
 *           type: string
 *           format: password
 *           description: User's password (minimum 6 characters)
 *           example: Sajal@1234
 *         location:
 *           type: string
 *           description: User's location
 *           example: Kolkata, India
 *
 *     UserLoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Registered email of the user
 *           example: sajal@example.com
 *         password:
 *           type: string
 *           format: password
 *           description: User's password
 *           example: Sajal@1234
 *
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 665fa7d2b6a1e3adce123456
 *         name:
 *           type: string
 *           example: Sajal
 *         lastName:
 *           type: string
 *           example: Pakira
 *         email:
 *           type: string
 *           example: sajal@example.com
 *         location:
 *           type: string
 *           example: Kolkata, India
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-06-18T10:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-06-18T10:05:00.000Z
 */

// Routes
router.post("/register", limiter, registerController);
router.post("/login", limiter, loginController);

export default router;
