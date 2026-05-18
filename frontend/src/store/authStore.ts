import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser, UserRole } from "../types/auth";

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  theme: "dark" | "light";
  setSession: (payload: { token: string; user: AuthUser }) => void;
  logout: () => void;
  toggleTheme: () => void;
  setUser: (user: AuthUser) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      theme: "dark",
      setSession: ({ token, user }) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
      toggleTheme: () => set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
      setUser: (user) => set({ user })
    }),
    {
      name: "gigflow-auth"
    }
  )
);

export const selectIsAuthed = (state: AuthState): boolean => Boolean(state.token && state.user);
export const selectRole = (state: AuthState): UserRole | null => state.user?.role ?? null;
