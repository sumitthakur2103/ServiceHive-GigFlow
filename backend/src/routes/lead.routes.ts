import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authorize, protect } from "../middleware/auth.js";
import { create, details, exportCsv, list, remove, stats, update } from "../controllers/lead.controller.js";
import { validate, validateQuery } from "../middleware/validate.js";
import { leadCreateSchema, leadQuerySchema, leadUpdateSchema } from "../validators/lead.validator.js";

export const leadRouter = Router();

leadRouter.use(protect);
leadRouter.get("/stats", asyncHandler(stats));
leadRouter.get("/export/csv", validateQuery(leadQuerySchema), asyncHandler(exportCsv));
leadRouter.get("/", validateQuery(leadQuerySchema), asyncHandler(list));
leadRouter.post("/", authorize("Admin"), validate(leadCreateSchema), asyncHandler(create));
leadRouter.get("/:id", asyncHandler(details));
leadRouter.put("/:id", validate(leadUpdateSchema), asyncHandler(update));
leadRouter.delete("/:id", authorize("Admin"), asyncHandler(remove));
