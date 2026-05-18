import { Types, type FilterQuery } from "mongoose";
import { Lead } from "../models/lead.model.js";
import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";
import type { UserRole } from "../models/user.model.js";
import type { LeadDocument } from "../models/lead.model.js";
import type { LeadSource, LeadStatus } from "../constants/lead.constants.js";
import { isAdminRole } from "../utils/roles.js";

export interface LeadQueryInput {
  status?: LeadStatus;
  source?: LeadSource;
  search?: string;
  sort?: "latest" | "oldest";
  page?: number;
  limit?: number;
}

const buildScope = async (userId: string, role: UserRole): Promise<FilterQuery<LeadDocument>> => {
  if (isAdminRole(role)) {
    return {};
  }
  return { assignedTo: new Types.ObjectId(userId) };
};

const buildFilters = async (userId: string, role: UserRole, query: LeadQueryInput): Promise<FilterQuery<LeadDocument>> => {
  const scope = await buildScope(userId, role);
  const filters: FilterQuery<LeadDocument> = { ...scope };

  if (query.status) filters.status = query.status;
  if (query.source) filters.source = query.source;
  if (query.search) {
    const search = query.search.trim();
    filters.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } }
    ];
  }

  return filters;
};

export const createLead = async (userId: string, role: UserRole, input: { name: string; email: string; status: string; source: string; assignedTo?: string }) => {
  if (!isAdminRole(role)) {
    throw new AppError(403, "Only admins can create leads");
  }

  const assignedTo = input.assignedTo && input.assignedTo.trim().length > 0 ? input.assignedTo : userId;
  const assignedUser = await User.findById(assignedTo);
  if (!assignedUser) {
    throw new AppError(400, "Assigned user not found");
  }

  const lead = await Lead.create({
    name: input.name,
    email: input.email.toLowerCase(),
    status: input.status,
    source: input.source,
    assignedTo,
    createdBy: userId
  });

  return lead.populate("assignedTo", "name email role");
};

export const updateLead = async (
  leadId: string,
  userId: string,
  role: UserRole,
  input: Partial<{ name: string; email: string; status: string; source: string; assignedTo: string }>
) => {
  const lead = await Lead.findById(leadId);
  if (!lead) {
    throw new AppError(404, "Lead not found");
  }

  if (!isAdminRole(role) && String(lead.assignedTo) !== userId) {
    throw new AppError(403, "Forbidden");
  }

  if (input.assignedTo && !isAdminRole(role)) {
    throw new AppError(403, "Only admins can reassign leads");
  }

  if (input.assignedTo && input.assignedTo.trim().length > 0) {
    const assignedUser = await User.findById(input.assignedTo);
    if (!assignedUser) {
      throw new AppError(400, "Assigned user not found");
    }
    lead.assignedTo = new Types.ObjectId(input.assignedTo);
  }

  if (input.name !== undefined) lead.name = input.name;
  if (input.email !== undefined) lead.email = input.email.toLowerCase();
  if (input.status !== undefined) lead.status = input.status;
  if (input.source !== undefined) lead.source = input.source;

  await lead.save();
  return lead.populate("assignedTo", "name email role");
};

export const deleteLead = async (leadId: string, userId: string, role: UserRole): Promise<void> => {
  const lead = await Lead.findById(leadId);
  if (!lead) {
    throw new AppError(404, "Lead not found");
  }

  if (!isAdminRole(role) && String(lead.assignedTo) !== userId) {
    throw new AppError(403, "Forbidden");
  }

  await Lead.deleteOne({ _id: leadId });
};

export const getLeadById = async (leadId: string, userId: string, role: UserRole) => {
  const lead = await Lead.findById(leadId).populate("assignedTo", "name email role");
  if (!lead) {
    throw new AppError(404, "Lead not found");
  }

  if (!isAdminRole(role) && String(lead.assignedTo?._id ?? lead.assignedTo) !== userId) {
    throw new AppError(403, "Forbidden");
  }

  return lead;
};

export const listLeads = async (userId: string, role: UserRole, query: LeadQueryInput) => {
  const page = query.page ?? 1;
  const limit = query.limit ?? 10;
  const skip = (page - 1) * limit;

  const filters = await buildFilters(userId, role, query);

  const sort = query.sort === "oldest" ? { createdAt: 1 as const } : { createdAt: -1 as const };

  const [total, items] = await Promise.all([
    Lead.countDocuments(filters),
    Lead.find(filters)
      .populate("assignedTo", "name email role")
      .sort(sort)
      .skip(skip)
      .limit(limit)
  ]);

  return {
    items,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit))
    }
  };
};

export const getLeadStats = async (userId: string, role: UserRole) => {
  const match = await buildScope(userId, role);
  const [total, statusBreakdown, recentLeads] = await Promise.all([
    Lead.countDocuments(match),
    Lead.aggregate([
      { $match: match },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]),
    Lead.find(match).sort({ createdAt: -1 }).limit(5).populate("assignedTo", "name email role")
  ]);

  const normalized = {
    New: 0,
    Contacted: 0,
    Qualified: 0,
    Lost: 0
  };

  for (const entry of statusBreakdown as Array<{ _id: string; count: number }>) {
    normalized[entry._id as keyof typeof normalized] = entry.count;
  }

  return {
    total,
    statusBreakdown: normalized,
    recentLeads
  };
};

export const exportFilteredLeads = async (userId: string, role: UserRole, query: LeadQueryInput) => {
  const filters = await buildFilters(userId, role, query);
  const sort = query.sort === "oldest" ? { createdAt: 1 as const } : { createdAt: -1 as const };
  const leads = await Lead.find(filters).populate("assignedTo", "name email role").sort(sort);

  return leads.map((lead) => ({
    name: lead.name,
    email: lead.email,
    status: lead.status,
    source: lead.source,
    assignedTo:
      typeof lead.assignedTo === "object" && lead.assignedTo && "name" in lead.assignedTo
        ? String(lead.assignedTo.name)
        : String(lead.assignedTo),
    createdAt: lead.createdAt.toISOString(),
    updatedAt: lead.updatedAt.toISOString()
  }));
};
