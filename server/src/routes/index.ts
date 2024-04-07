import express from "express";
const router = express.Router();
import authRouter from "./auth.routes";
import messageRouter from "./message.routes";
import { protectedRoute } from "../middlewares/proctectedRoute";
import userRouter from "./user.routes";

router.get('/', (req, res) => {
  res.send('Welcome');
});

// Auth Routing
router.use("/auth", authRouter);

// User Routing
router.use("/user", protectedRoute, userRouter);

// Message Routing
router.use("/message", protectedRoute, messageRouter);

export default router;