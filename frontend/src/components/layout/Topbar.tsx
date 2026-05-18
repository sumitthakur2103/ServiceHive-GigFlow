import { Bell } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { ThemeToggle } from "../common/ThemeToggle";

export const Topbar = (): JSX.Element => {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="sticky top-0 z-20 rounded-[28px] border px-5 py-4 shadow-soft backdrop-blur"
      style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">GigFlow</p>
          <h2 className="mt-1 text-xl font-semibold text-[color:var(--text)]">Welcome back, {user?.name}</h2>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button className="rounded-full border p-3 transition" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)", color: "var(--text)" }}>
            <Bell className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
