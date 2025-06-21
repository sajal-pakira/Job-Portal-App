import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

// IP limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

//register post
router.post("/register", limiter, registerController);
//login post
router.post("/login", limiter, loginController);

export default router;
