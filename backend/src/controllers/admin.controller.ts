import type { Request, Response } from "express";
import { sendResponse } from "../utils/apiResponse.js";
import { createAdminAccount } from "../services/admin.service.js";

export const setupAdmin = async (req: Request, res: Response): Promise<void> => {
  const payload = req.body as {
    name: string;
    email: string;
    password: string;
  };

  const admin = await createAdminAccount(payload);
  void sendResponse(res, 201, "Admin account created", admin);
};
