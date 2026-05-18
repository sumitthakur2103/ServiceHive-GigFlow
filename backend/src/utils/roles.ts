import type { UserRole } from "../models/user.model.js";

export const normalizeRole = (role: string): UserRole => {
  return role.toLowerCase() === "admin" ? "Admin" : "Sales User";
};

export const isAdminRole = (role: string): boolean => role.toLowerCase() === "admin";
