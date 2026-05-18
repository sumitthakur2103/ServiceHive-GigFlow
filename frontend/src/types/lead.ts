import type { AuthUser } from "./auth";
import type { LeadSource, LeadStatus } from "../constants/leads";

export type AssignedUser = Pick<AuthUser, "name" | "email" | "role"> & { _id: string };

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  assignedTo: AssignedUser | string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadStats {
  total: number;
  statusBreakdown: Record<LeadStatus, number>;
  recentLeads: Lead[];
}

export interface LeadFilters {
  status?: LeadStatus;
  source?: LeadSource;
  search?: string;
  sort?: "latest" | "oldest";
  page?: number;
  limit?: number;
}
