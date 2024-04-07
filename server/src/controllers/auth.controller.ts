import express, { Request, Response } from "express";
import { IUser } from "../models/user.model";
import { createUser, getUserByUserName } from "../services/user.service";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateToken";
import { ResponseUtil } from "../utils/Response.utils";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, userName, password, confirmPassword, gender, profilePic = '' } = req.body
    const profile = `https://avatar.iran.liara.run/public/${gender === 'male' ? 'boy' : 'girl'}?userName=${userName}`;

    if (confirmPassword !== password) {
      return ResponseUtil.sendErrorResponse(res, 400, "Password doesnot matches with Confirm Password");
    }

    // Check If user already exists
    const alreadyExistingUser = await getUserByUserName(userName);
    if (alreadyExistingUser) {
      return ResponseUtil.sendErrorResponse(res, 400, "UserName Already Exists");
    }

    // Generate Hash for the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser: IUser = {
      firstName,
      lastName,
      username: userName,
      password: hashedPassword,
      gender,
      profilePic: profilePic ? profilePic : profile,
    }

    // Create the User
    const createdUser = await createUser(newUser);
    if (createdUser) {

      // Generate JWT token and set the cookies
      generateTokenAndSetCookie(createdUser._id, res);

      // Sending Response
      return ResponseUtil.sendSuccessResponse(res, 201, 'User Created Succesfully', {
        _id: createdUser._id,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        username: createdUser.username,
        profilePic: createdUser.profilePic,
      });

    } else {
      return ResponseUtil.sendErrorResponse(res, 400, 'Failed to Create User');
    }
  } catch (error) {
    return ResponseUtil.sendErrorResponse(res, 500, 'Internal server error');
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;
    const user = await getUserByUserName(userName);
    const isPasswordCorrect = await bcrypt.compare(password, (user?.password || ""));

    // Password match with the user password
    if (!user || !isPasswordCorrect) {
      return ResponseUtil.sendErrorResponse(res, 400, 'Invalid Credentials');
    }

    generateTokenAndSetCookie(user._id + "", res);
    return res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    return ResponseUtil.sendErrorResponse(res, 500, 'Internal server error');
  }
}

export const logout = (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0
    })
    return ResponseUtil.sendSuccessResponse(res, 200, "Logged Out Successfully");
  } catch (error) {
    console.error('Error While Logout:', error);
    return ResponseUtil.sendErrorResponse(res, 500, 'Internal server error');
  }
}
