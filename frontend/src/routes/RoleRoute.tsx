import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import type { UserRole } from "../types/auth";

interface RoleRouteProps {
  allowed: UserRole[];
  children: ReactNode;
}

export const RoleRoute = ({ allowed, children }: RoleRouteProps): JSX.Element => {
  const role = useAuthStore((state) => state.user?.role ?? null);
  if (!role || !allowed.includes(role)) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};
