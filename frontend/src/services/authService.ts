import { api } from "./api";
import type { AuthPayload } from "../types/auth";

export const authService = {
  login: async (payload: { email: string; password: string }): Promise<AuthPayload> => {
    const response = await api.post<AuthPayload>("/auth/login", payload);
    return response.data.data;
  },
  register: async (payload: { name: string; email: string; password: string }): Promise<AuthPayload> => {
    const response = await api.post<AuthPayload>("/auth/register", payload);
    return response.data.data;
  },
  me: async (): Promise<{ user: AuthPayload["user"] }> => {
    const response = await api.get<{ user: AuthPayload["user"] }>("/auth/me");
    return response.data.data;
  }
};
