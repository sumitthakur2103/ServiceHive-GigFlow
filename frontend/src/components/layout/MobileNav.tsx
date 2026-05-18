import { BarChart3, ClipboardList, PlusCircle, UserCircle2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const itemClass = ({ isActive }: { isActive: boolean }): string =>
  [
    "flex flex-1 flex-col items-center gap-1 rounded-2xl px-3 py-2 text-xs transition",
    isActive ? "bg-cyan-500 text-slate-950" : "text-[color:var(--muted)]"
  ].join(" ");

export const MobileNav = (): JSX.Element => {
  const role = useAuthStore((state) => state.user?.role ?? null);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t p-3 backdrop-blur lg:hidden"
      style={{ backgroundColor: "var(--surface-strong)", borderColor: "var(--border)" }}>
      <div className="mx-auto flex max-w-2xl gap-2">
        <NavLink to="/" end className={itemClass}>
          <BarChart3 className="h-4 w-4" />
          Dashboard
        </NavLink>
        <NavLink to="/leads" className={itemClass}>
          <ClipboardList className="h-4 w-4" />
          Leads
        </NavLink>
        {role === "Admin" ? (
          <NavLink to="/leads/new" className={itemClass}>
            <PlusCircle className="h-4 w-4" />
            Create
          </NavLink>
        ) : null}
        <NavLink to="/profile" className={itemClass}>
          <UserCircle2 className="h-4 w-4" />
          Profile
        </NavLink>
      </div>
    </nav>
  );
};
