import express from "express";
import { login, logout, signUp } from "../controllers/auth.controller";
import { getAllUsers } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/", getAllUsers)

export default userRouter;