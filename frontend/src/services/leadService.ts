import { api } from "./api";
import type { Lead, LeadFilters, LeadStats } from "../types/lead";
import type { PaginatedResponse, ApiResponse } from "../types/api";
import type { LeadSource, LeadStatus } from "../constants/leads";

export interface LeadFormPayload {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  assignedTo?: string;
}

export const leadService = {
  list: async (filters: LeadFilters): Promise<PaginatedResponse<Lead>> => {
    const response = await api.get<PaginatedResponse<Lead>>("/leads", { params: filters });
    return response.data;
  },
  stats: async (): Promise<ApiResponse<LeadStats>> => {
    const response = await api.get<ApiResponse<LeadStats>>("/leads/stats");
    return response.data;
  },
  details: async (id: string): Promise<ApiResponse<Lead>> => {
    const response = await api.get<ApiResponse<Lead>>(`/leads/${id}`);
    return response.data;
  },
  create: async (payload: LeadFormPayload): Promise<ApiResponse<Lead>> => {
    const response = await api.post<ApiResponse<Lead>>("/leads", payload);
    return response.data;
  },
  update: async (id: string, payload: Partial<LeadFormPayload>): Promise<ApiResponse<Lead>> => {
    const response = await api.put<ApiResponse<Lead>>(`/leads/${id}`, payload);
    return response.data;
  },
  remove: async (id: string): Promise<ApiResponse<null>> => {
    const response = await api.delete<ApiResponse<null>>(`/leads/${id}`);
    return response.data;
  },
  exportCsv: async (filters: LeadFilters): Promise<string> => {
    const response = await api.get("/leads/export/csv", {
      params: filters,
      responseType: "text"
    });
    return response.data;
  }
};
