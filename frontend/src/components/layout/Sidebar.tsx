import { BarChart3, ClipboardList, LogOut, UserCircle2, Plus } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { Button } from "../ui/Button";
import { ThemeToggle } from "../common/ThemeToggle";

const navItemClass = ({ isActive }: { isActive: boolean }): string =>
  [
    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition",
    isActive ? "bg-cyan-500 text-slate-950" : "text-[color:var(--muted)] hover:bg-black/5 hover:text-[color:var(--text)] dark:hover:bg-white/5"
  ].join(" ");

export const Sidebar = (): JSX.Element => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <aside className="hidden w-72 flex-col justify-between rounded-[28px] border p-5 shadow-soft backdrop-blur lg:flex"
      style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
      <div>
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-slate-950 font-bold">
            G
          </div>
          <div>
            <h1 className="text-lg font-semibold text-[color:var(--text)]">GigFlow</h1>
            <p className="text-xs text-[color:var(--muted)]">Smart Leads Dashboard</p>
          </div>
        </div>

        <div className="mt-8 space-y-2">
          <NavLink to="/" end className={navItemClass}>
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </NavLink>
          <NavLink to="/leads" className={navItemClass}>
            <ClipboardList className="h-4 w-4" />
            Leads
          </NavLink>
          {user?.role === "Admin" ? (
            <NavLink to="/leads/new" className={navItemClass}>
              <Plus className="h-4 w-4" />
              Create Lead
            </NavLink>
          ) : null}
          <NavLink to="/profile" className={navItemClass}>
            <UserCircle2 className="h-4 w-4" />
            Profile
          </NavLink>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-3xl border p-4" style={{ backgroundImage: "linear-gradient(135deg, rgba(34,211,238,.15), rgba(99,102,241,.1))", borderColor: "var(--border)" }}>
          <p className="text-xs uppercase tracking-[0.22em]" style={{ color: "var(--muted)" }}>Signed in as</p>
          <p className="mt-2 text-sm font-medium text-[color:var(--text)]">{user?.name}</p>
          <p className="text-xs text-[color:var(--muted)]">{user?.role}</p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <ThemeToggle />
          <Button variant="secondary" onClick={logout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
};
