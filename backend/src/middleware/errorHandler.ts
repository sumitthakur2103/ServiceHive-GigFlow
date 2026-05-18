import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";

export const notFound = (_req: Request, _res: Response, next: NextFunction): void => {
  next(new AppError(404, "Route not found"));
};

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
    return;
  }

  const message = err instanceof Error ? err.message : "Internal server error";
  res.status(500).json({
    success: false,
    message
  });
};
