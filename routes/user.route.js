import express from "express";
import userAuth from "../middlewares/auth.middleware.js";
import {
  updateUserController,
  deleteUserController,
} from "../controllers/user.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User profile and account management
 */

/**
 * @swagger
 * /api/v1/user/update:
 *   put:
 *     summary: Update user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sajal
 *               lastName:
 *                 type: string
 *                 example: Pakira
 *               email:
 *                 type: string
 *                 format: email
 *                 example: sajal@example.com
 *               location:
 *                 type: string
 *                 example: Kolkata, India
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input or missing fields
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 */

/**
 * @swagger
 * /api/v1/user/delete:
 *   delete:
 *     summary: Delete the logged-in user account
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       404:
 *         description: User not found
 */

// Routes
router.put("/update", userAuth, updateUserController);
router.delete("/delete", userAuth, deleteUserController);

export default router;
