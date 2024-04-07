import express, { Response } from "express";
import { CustomRequest } from "../types/common.types";
import { ResponseUtil } from "../utils/Response.utils";
import { getAllUsersForUserId } from "../services/user.service";

export const getAllUsers = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user?._id;

    const getAllUsers = await getAllUsersForUserId(userId);

    if (!getAllUsers) {
      return ResponseUtil.sendSuccessResponse(res, 200, "", []);
    }

    return ResponseUtil.sendSuccessResponse(res, 200, "", getAllUsers);
  } catch (error) {
    console.log("Error while getting all users");
    return ResponseUtil.sendErrorResponse(res, 500, "Internal Server Error");
  }
}