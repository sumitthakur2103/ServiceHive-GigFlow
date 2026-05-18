import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authorize, protect } from "../middleware/auth.js";
import { listUsers } from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.use(protect, authorize("Admin"));
userRouter.get("/", asyncHandler(listUsers));
