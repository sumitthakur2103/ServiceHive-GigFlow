import { motion } from "framer-motion";
import { useLeadStats } from "../hooks/useLeads";
import { Card } from "../components/ui/Card";
import { Skeleton } from "../components/ui/Skeleton";
import { StatCard } from "../components/ui/StatCard";
import { Badge } from "../components/ui/Badge";
import { EmptyState } from "../components/ui/EmptyState";
import { Link } from "react-router-dom";

export default function DashboardPage(): JSX.Element {
  const { data, isLoading } = useLeadStats();
  const stats = data?.data;

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {isLoading ? (
          <>
            <Skeleton className="h-32 rounded-3xl" />
            <Skeleton className="h-32 rounded-3xl" />
            <Skeleton className="h-32 rounded-3xl" />
            <Skeleton className="h-32 rounded-3xl" />
          </>
        ) : (
          <>
            <StatCard label="Total Leads" value={stats?.total ?? 0} accent="from-cyan-500 to-sky-500" hint="Across your access scope" />
            <StatCard label="New" value={stats?.statusBreakdown.New ?? 0} accent="from-indigo-500 to-violet-500" />
            <StatCard label="Qualified" value={stats?.statusBreakdown.Qualified ?? 0} accent="from-emerald-500 to-teal-500" />
            <StatCard label="Lost" value={stats?.statusBreakdown.Lost ?? 0} accent="from-rose-500 to-orange-500" />
          </>
        )}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>Recent Leads</h3>
              <p className="text-sm" style={{ color: "var(--muted)" }}>Your latest pipeline activity</p>
            </div>
            <Link to="/leads" className="text-sm text-cyan-300 hover:text-cyan-200">
              View all
            </Link>
          </div>

          <div className="mt-6 space-y-3">
            {stats?.recentLeads.length ? (
              stats.recentLeads.map((lead) => (
                <div key={lead._id} className="flex flex-col gap-3 rounded-2xl border p-4 md:flex-row md:items-center md:justify-between" style={{ backgroundColor: "var(--surface-strong)", borderColor: "var(--border)" }}>
                  <div>
                    <p className="font-medium" style={{ color: "var(--text)" }}>{lead.name}</p>
                    <p className="text-sm" style={{ color: "var(--muted)" }}>{lead.email}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="info">{lead.status}</Badge>
                    <Badge tone="neutral">{lead.source}</Badge>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState
                title="No leads yet"
                description="Create leads to start tracking your pipeline and conversion stages."
                action={<Link to="/leads" className="text-cyan-300">Open leads list</Link>}
              />
            )}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>Pipeline Snapshot</h3>
          <div className="mt-6 space-y-4">
            {stats ? (
              Object.entries(stats.statusBreakdown).map(([status, count]) => (
                <div key={status}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span style={{ color: "var(--muted)" }}>{status}</span>
                    <span style={{ color: "var(--text)" }}>{count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500"
                      style={{ width: `${stats.total ? (count / stats.total) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <Skeleton className="h-48 rounded-2xl" />
            )}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
