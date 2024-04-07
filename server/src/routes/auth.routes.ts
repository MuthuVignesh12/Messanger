import express from "express";
import { login, logout, signUp } from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.get("/login", login)

authRouter.post("/signup", signUp)

authRouter.post("/logout", logout)

export default authRouter;