import { useMemo, useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus, Search, Download, RefreshCw, PencilLine, Trash2, Eye } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useDebounce } from "../../hooks/useDebounce";
import { useLeadMutations, useLeads } from "../../hooks/useLeads";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { Button } from "../../components/ui/Button";
import { DataTable } from "../../components/ui/DataTable";
import { Badge } from "../../components/ui/Badge";
import { EmptyState } from "../../components/ui/EmptyState";
import { Skeleton } from "../../components/ui/Skeleton";
import { downloadFile } from "../../utils/download";
import { toast } from "sonner";
import type { Lead } from "../../types/lead";
import { leadService } from "../../services/leadService";
import { LEAD_SOURCES, LEAD_STATUSES } from "../../constants/leads";

export default function LeadsPage(): JSX.Element {
  const role = useAuthStore((state) => state.user?.role ?? null);
  const [filters, setFilters] = useState({ status: "", source: "", search: "", sort: "latest", page: 1, limit: 10 });
  const debouncedSearch = useDebounce(filters.search, 350);
  const [isPending, startTransition] = useTransition();
  const { deleteMutation } = useLeadMutations();

  const query = useMemo(
    () => ({
      status: filters.status || undefined,
      source: filters.source || undefined,
      search: debouncedSearch || undefined,
      sort: filters.sort as "latest" | "oldest",
      page: filters.page,
      limit: 10
    }),
    [filters, debouncedSearch]
  );

  const { data, isLoading, refetch } = useLeads(query);

  const leads = data?.data ?? [];
  const pagination = data?.pagination;

  const handleExport = async (): Promise<void> => {
    try {
      const response = await leadService.exportCsv(query);
      downloadFile(response, "gigflow-leads.csv", "text/csv;charset=utf-8;");
      toast.success("CSV export downloaded");
    } catch {
      toast.error("Export failed");
    }
  };

  const columns = [
    {
      header: "Lead",
      render: (lead: Lead) => (
        <div>
          <div className="font-medium" style={{ color: "var(--text)" }}>{lead.name}</div>
          <div className="text-xs" style={{ color: "var(--muted)" }}>{lead.email}</div>
        </div>
      )
    },
    {
      header: "Status",
      render: (lead: Lead) => <Badge tone={lead.status === "Qualified" ? "success" : lead.status === "Lost" ? "danger" : lead.status === "Contacted" ? "warning" : "info"}>{lead.status}</Badge>
    },
    {
      header: "Source",
      render: (lead: Lead) => <Badge tone="neutral">{lead.source}</Badge>
    },
    {
      header: "Assigned",
      render: (lead: Lead) => <span style={{ color: "var(--muted)" }}>{typeof lead.assignedTo === "string" ? lead.assignedTo : lead.assignedTo.name}</span>
    },
    {
      header: "Actions",
      render: (lead: Lead) => (
        <div className="flex items-center gap-2">
          <Link to={`/leads/${lead._id}`} className="rounded-full p-2 text-slate-300 transition hover:bg-white/10 hover:text-white">
            <Eye className="h-4 w-4" />
          </Link>
          {role === "Admin" ? (
            <>
              <Link to={`/leads/${lead._id}/edit`} className="rounded-full p-2 text-slate-300 transition hover:bg-white/10 hover:text-white">
                <PencilLine className="h-4 w-4" />
              </Link>
              <button
                onClick={() => {
                  if (window.confirm(`Delete lead ${lead.name}?`)) {
                    void deleteMutation.mutateAsync(lead._id);
                  }
                }}
                className="rounded-full p-2 text-slate-300 transition hover:bg-rose-500/15 hover:text-rose-300"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </>
          ) : null}
        </div>
      )
    }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <Card>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Lead operations</p>
            <h1 className="mt-2 text-3xl font-semibold" style={{ color: "var(--text)" }}>Leads</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => void refetch()} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button variant="secondary" onClick={() => void handleExport()} className="gap-2">
              <Download className="h-4 w-4" />
              CSV Export
            </Button>
            {role === "Admin" ? (
              <Link to="/leads/new">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  New Lead
                </Button>
              </Link>
            ) : null}
          </div>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[1.3fr_0.7fr_0.7fr_0.7fr_0.6fr]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
            <Input
              value={filters.search}
              onChange={(e) => {
                const value = e.target.value;
                startTransition(() => setFilters((prev) => ({ ...prev, search: value, page: 1 })));
              }}
              className="pl-11"
              placeholder="Search name or email"
            />
          </div>
          <Select value={filters.status} onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value, page: 1 }))}>
            <option value="">All Statuses</option>
            {LEAD_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
          <Select value={filters.source} onChange={(e) => setFilters((prev) => ({ ...prev, source: e.target.value, page: 1 }))}>
            <option value="">All Sources</option>
            {LEAD_SOURCES.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </Select>
          <Select value={filters.sort} onChange={(e) => setFilters((prev) => ({ ...prev, sort: e.target.value, page: 1 }))}>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </Select>
          <div className="text-xs" style={{ color: "var(--muted)" }}>
            {isPending ? "Updating..." : "Filters are applied together with debounced search."}
          </div>
        </div>
      </Card>

      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-16 rounded-3xl" />
          <Skeleton className="h-16 rounded-3xl" />
          <Skeleton className="h-16 rounded-3xl" />
        </div>
      ) : leads.length ? (
        <DataTable columns={columns} rows={leads} />
      ) : (
        <EmptyState
          title="No leads match the current filters"
          description="Try broadening the search, changing the status, or clearing source filters."
        />
      )}

      {pagination ? (
        <Card className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Showing page <span style={{ color: "var(--text)" }}>{pagination.page}</span> of{" "}
            <span style={{ color: "var(--text)" }}>{pagination.totalPages}</span> from{" "}
            <span style={{ color: "var(--text)" }}>{pagination.total}</span> leads
          </p>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              disabled={pagination.page <= 1}
              onClick={() => setFilters((prev) => ({ ...prev, page: prev.page - 1 }))}
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}
            >
              Next
            </Button>
          </div>
        </Card>
      ) : null}
    </motion.div>
  );
}
