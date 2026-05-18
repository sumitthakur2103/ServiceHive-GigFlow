import { z } from "zod";
import { LEAD_SOURCES, LEAD_STATUSES } from "../constants/lead.constants.js";

export const leadCreateSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  status: z.enum(LEAD_STATUSES).default("New"),
  source: z.enum(LEAD_SOURCES),
  assignedTo: z.string().optional()
});

export const leadUpdateSchema = leadCreateSchema.partial();

export const leadQuerySchema = z.object({
  status: z.enum(LEAD_STATUSES).optional(),
  source: z.enum(LEAD_SOURCES).optional(),
  search: z.string().trim().optional(),
  sort: z.enum(["latest", "oldest"]).optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional()
});
