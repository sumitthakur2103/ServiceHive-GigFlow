import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/layout/Sidebar";
import { Topbar } from "../components/layout/Topbar";
import { MobileNav } from "../components/layout/MobileNav";

export const AppShell = (): JSX.Element => {
  return (
    <div className="min-h-screen text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-6 p-4 lg:p-6">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col gap-6 pb-24 lg:pb-0">
          <Topbar />
          <main className="min-w-0 flex-1">
            <Outlet />
          </main>
        </div>
      </div>
      <MobileNav />
    </div>
  );
};
