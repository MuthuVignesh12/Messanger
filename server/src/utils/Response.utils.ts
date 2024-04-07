import { Response } from 'express';

interface ApiResponse<T> {
  success: boolean;
  data?: T | null;
  message?: string;
}

export const ResponseUtil = {

  // Send Success Resposne foo the Api calls
  sendSuccessResponse<T>(
    res: Response,
    statusCode: number,
    message: string,
    data: T | null = null
  ): void {
    const response: ApiResponse<T> = {
      success: true,
      message: message,
      data: data
    };
    res.status(statusCode).json(response);
  },

  // Send Error Resposne foo the Api calls
  sendErrorResponse<T>(
    res: Response,
    statusCode: number,
    message: string,
  ): void {
    const response: ApiResponse<T> = {
      success: false,
      message: message
    };
    res.status(statusCode).json(response);
  }
};