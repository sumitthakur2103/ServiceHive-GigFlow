import type { Request, Response } from "express";
import { createLead, deleteLead, exportFilteredLeads, getLeadById, getLeadStats, listLeads, updateLead } from "../services/lead.service.js";
import { sendPaginatedResponse, sendResponse } from "../utils/apiResponse.js";
import { buildLeadsCsv } from "../utils/csv.js";
import type { LeadQueryInput } from "../services/lead.service.js";

export const create = async (req: Request, res: Response): Promise<void> => {
  const body = req.body as { name: string; email: string; status: string; source: string; assignedTo?: string };
  const result = await createLead(req.user!.id, req.user!.role, body);
  void sendResponse(res, 201, "Lead created", result);
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const body = req.body as Partial<{ name: string; email: string; status: string; source: string; assignedTo: string }>;
  const result = await updateLead(req.params.id, req.user!.id, req.user!.role, body);
  void sendResponse(res, 200, "Lead updated", result);
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  await deleteLead(req.params.id, req.user!.id, req.user!.role);
  void sendResponse(res, 200, "Lead deleted");
};

export const list = async (req: Request, res: Response): Promise<void> => {
  const query = (req.validatedQuery ?? req.query) as LeadQueryInput;
  const result = await listLeads(req.user!.id, req.user!.role, query);
  void sendPaginatedResponse(res, 200, "Leads fetched", result.items, result.pagination);
};

export const details = async (req: Request, res: Response): Promise<void> => {
  const result = await getLeadById(req.params.id, req.user!.id, req.user!.role);
  void sendResponse(res, 200, "Lead fetched", result);
};

export const stats = async (req: Request, res: Response): Promise<void> => {
  const result = await getLeadStats(req.user!.id, req.user!.role);
  void sendResponse(res, 200, "Stats fetched", result);
};

export const exportCsv = async (req: Request, res: Response): Promise<void> => {
  const query = (req.validatedQuery ?? req.query) as LeadQueryInput;
  const rows = await exportFilteredLeads(req.user!.id, req.user!.role, query);
  const csv = buildLeadsCsv(rows);
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="gigflow-leads.csv"');
  res.status(200).send(csv);
};
