import type { Response } from "express";
import type { ApiResponse, PaginatedApiResponse, PaginationMeta } from "../types/api.types.js";

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T
): Response<ApiResponse<T>> => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

export const sendPaginatedResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T[],
  pagination: PaginationMeta
): Response<PaginatedApiResponse<T>> => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    pagination
  });
};
