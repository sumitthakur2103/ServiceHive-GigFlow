import { api } from "./api";
import type { AuthUser } from "../types/auth";
import type { ApiResponse } from "../types/api";

export const userService = {
  list: async (): Promise<ApiResponse<AuthUser[]>> => {
    const response = await api.get<ApiResponse<AuthUser[]>>("/users");
    return response.data;
  }
};
