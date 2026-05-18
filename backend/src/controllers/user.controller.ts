import type { Request, Response } from "express";
import { User } from "../models/user.model.js";
import { sendResponse } from "../utils/apiResponse.js";

export const listUsers = async (_req: Request, res: Response): Promise<void> => {
  const users = await User.find().select("name email role").sort({ name: 1 });
  void sendResponse(
    res,
    200,
    "Users fetched",
    users.map((user) => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role
    }))
  );
};
