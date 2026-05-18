export type UserRole = "Admin" | "Sales User";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthPayload {
  user: AuthUser;
  token: string;
}
