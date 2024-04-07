import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller";
import { protectedRoute } from "../middlewares/proctectedRoute";

const messageRouter = express.Router();

messageRouter.get("/:id", getMessages);
messageRouter.post("/send/:id", sendMessage);

export default messageRouter;