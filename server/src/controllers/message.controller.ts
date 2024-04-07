import { Request, Response } from "express";
import { CustomRequest } from "../types/common.types";
import Conversation from "../models/conversation.model";
import Message from "../models/message.model";
import { ResponseUtil } from "../utils/Response.utils";
import { createConversation, findConversationByIds, getMessagesByUserIds } from "../services/converstation.service";

export const sendMessage = async (req: CustomRequest, res: Response) => {
  try {
    const { message } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user?._id

    let conversation = await findConversationByIds([senderId, recieverId]);

    if (!conversation) {
      conversation = await createConversation([senderId, recieverId])
    }

    const newMessage = new Message({
      senderId,
      recieverId,
      message
    });

    if (newMessage) {
      conversation?.messages.push(newMessage._id);
    }

    await Promise.all([conversation?.save(), newMessage.save()])

    return ResponseUtil.sendSuccessResponse(res, 200, "", newMessage)
  } catch (error) {
    return ResponseUtil.sendErrorResponse(res, 500, "Internal Server Error");
  }
}

export const getMessagesOfUser = async (req: CustomRequest, res: Response) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user?._id;
    let conversation = await getMessagesByUserIds([senderId, userToChatId]);

    if (!conversation) {
      return ResponseUtil.sendSuccessResponse(res, 200, "", []);
    }

    return ResponseUtil.sendSuccessResponse(res, 200, "", conversation?.messages);

  } catch (error) {
    return ResponseUtil.sendErrorResponse(res, 500, "Internal Server Error");
  }
}