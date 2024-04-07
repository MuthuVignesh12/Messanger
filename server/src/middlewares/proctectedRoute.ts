import { NextFunction, Request, Response } from "express";
import { ResponseUtil } from "../utils/Response.utils";
import jwt from "jsonwebtoken";
import config from "../constants/config";
import { getUserById } from "../services/user.service";
import { CustomRequest } from "../types/common.types";

export const protectedRoute = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return ResponseUtil.sendErrorResponse(res, 401, "Unauthorised");
    }

    const decodedToken: any = jwt.verify(token, config.jwtSecret);

    if (!decodedToken) {
      return ResponseUtil.sendErrorResponse(res, 401, "Unauthorised");
    }

    const user = await getUserById(decodedToken.userId);
    console.log(user);


    if (!user) {
      return ResponseUtil.sendErrorResponse(res, 404, "User Not Found");
    }

    req.user = user;
    console.log(req.user);
    next();

  } catch (error) {
    console.log('Error in Proctect Route')
    return ResponseUtil.sendErrorResponse(res, 500, "Internal Server Error");
  }
}