import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authorize, protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { createAdminSchema } from "../validators/admin.validator.js";
import { setupAdmin } from "../controllers/admin.controller.js";

export const adminRouter = Router();

adminRouter.use(protect, authorize("Admin"));
adminRouter.post("/setup", validate(createAdminSchema), asyncHandler(setupAdmin));
