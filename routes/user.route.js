import express from "express";
import userAuth from "../middlewares/auth.middleware.js";
import { updateUserController } from "../controllers/user.controller.js";
const router = express.Router();

router.put("/update", userAuth, updateUserController);

export default router;
