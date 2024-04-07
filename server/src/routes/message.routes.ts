import express from "express";
import { getMessagesOfUser, sendMessage } from "../controllers/message.controller";
import { protectedRoute } from "../middlewares/proctectedRoute";

const messageRouter = express.Router();

messageRouter.get("/:id", getMessagesOfUser);
messageRouter.post("/send/:id", sendMessage);

export default messageRouter;