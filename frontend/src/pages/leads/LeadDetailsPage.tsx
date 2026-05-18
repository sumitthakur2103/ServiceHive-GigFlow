import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Mail, PencilLine, User } from "lucide-react";
import { useLeadDetails } from "../../hooks/useLeads";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Skeleton } from "../../components/ui/Skeleton";
import { formatDateTime } from "../../utils/date";
import { useAuthStore } from "../../store/authStore";

export default function LeadDetailsPage(): JSX.Element {
  const { id = "" } = useParams();
  const { data, isLoading } = useLeadDetails(id);
  const role = useAuthStore((state) => state.user?.role ?? null);
  const lead = data?.data;

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <Link to="/leads" className="inline-flex items-center gap-2 text-sm" style={{ color: "var(--muted)" }}>
        <ArrowLeft className="h-4 w-4" />
        Back to leads
      </Link>

      {isLoading ? (
        <Skeleton className="h-80 rounded-3xl" />
      ) : lead ? (
        <Card>
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Lead details</p>
              <h1 className="mt-2 text-3xl font-semibold" style={{ color: "var(--text)" }}>{lead.name}</h1>
              <p className="mt-2 flex items-center gap-2" style={{ color: "var(--muted)" }}>
                <Mail className="h-4 w-4" />
                {lead.email}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge tone={lead.status === "Qualified" ? "success" : lead.status === "Lost" ? "danger" : lead.status === "Contacted" ? "warning" : "info"}>{lead.status}</Badge>
              <Badge tone="neutral">{lead.source}</Badge>
              {role === "Admin" ? (
                <Link to={`/leads/${lead._id}/edit`} className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950">
                  <PencilLine className="h-4 w-4" />
                  Edit
                </Link>
              ) : null}
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border p-4" style={{ backgroundColor: "var(--surface-strong)", borderColor: "var(--border)" }}>
              <div className="flex items-center gap-2" style={{ color: "var(--muted)" }}>
                <User className="h-4 w-4" />
                Assigned to
              </div>
              <p className="mt-2" style={{ color: "var(--text)" }}>
                {typeof lead.assignedTo === "string" ? lead.assignedTo : lead.assignedTo.name}
              </p>
            </div>
            <div className="rounded-2xl border p-4" style={{ backgroundColor: "var(--surface-strong)", borderColor: "var(--border)" }}>
              <div className="flex items-center gap-2" style={{ color: "var(--muted)" }}>
                <CalendarDays className="h-4 w-4" />
                Created
              </div>
              <p className="mt-2" style={{ color: "var(--text)" }}>{formatDateTime(lead.createdAt)}</p>
            </div>
            <div className="rounded-2xl border p-4" style={{ backgroundColor: "var(--surface-strong)", borderColor: "var(--border)" }}>
              <div className="flex items-center gap-2" style={{ color: "var(--muted)" }}>
                <CalendarDays className="h-4 w-4" />
                Updated
              </div>
              <p className="mt-2" style={{ color: "var(--text)" }}>{formatDateTime(lead.updatedAt)}</p>
            </div>
          </div>
        </Card>
      ) : (
        <Card>
          <p style={{ color: "var(--text)" }}>Lead not found.</p>
        </Card>
      )}
    </motion.div>
  );
}
