import type { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service.js";
import { sendResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";
import type { UserRole } from "../models/user.model.js";

export const register = async (req: Request, res: Response): Promise<void> => {
  const data = req.body as { name: string; email: string; password: string };
  const result = await registerUser(data);
  res.setHeader("Authorization", `Bearer ${result.token}`);
  void sendResponse(res, 201, "Registration successful", result);
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const data = req.body as { email: string; password: string };
  const result = await loginUser(data);
  res.setHeader("Authorization", `Bearer ${result.token}`);
  void sendResponse(res, 200, "Login successful", result);
};

export const me = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    throw new AppError(401, "Authentication required");
  }

  const user = await User.findById(req.user.id).select("name email role");
  if (!user) {
    throw new AppError(404, "User not found");
  }

  void sendResponse(res, 200, "Profile loaded", {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role as UserRole
    }
  });
};
