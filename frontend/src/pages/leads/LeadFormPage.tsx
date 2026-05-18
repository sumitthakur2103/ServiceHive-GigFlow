import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { useLeadDetails, useLeadMutations } from "../../hooks/useLeads";
import { toast } from "sonner";
import { useAuthStore } from "../../store/authStore";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../../services/userService";
import { LEAD_SOURCES, LEAD_STATUSES } from "../../constants/leads";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  status: z.enum(LEAD_STATUSES),
  source: z.enum(LEAD_SOURCES),
  assignedTo: z.string().optional()
});

type LeadFormValues = z.infer<typeof schema>;

interface LeadFormPageProps {
  mode: "create" | "edit";
}

export default function LeadFormPage({ mode }: LeadFormPageProps): JSX.Element {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { createMutation, updateMutation } = useLeadMutations();
  const role = useAuthStore((state) => state.user?.role ?? null);
  const { data } = useLeadDetails(id);
  const lead = data?.data;
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: userService.list,
    enabled: role === "Admin"
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<LeadFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      status: "New",
      source: "Website"
    }
  });

  useEffect(() => {
    if (mode === "edit" && lead) {
      reset({
        name: lead.name,
        email: lead.email,
        status: lead.status,
        source: lead.source,
        assignedTo: typeof lead.assignedTo === "string" ? lead.assignedTo : lead.assignedTo._id
      });
    }
  }, [lead, mode, reset]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      if (mode === "create") {
        await createMutation.mutateAsync(values);
      } else {
        await updateMutation.mutateAsync({ id, payload: values });
      }
      navigate("/leads", { replace: true });
    } catch {
      toast.error("Unable to save lead");
    }
  });

  return (
    <Card>
      <button type="button" onClick={() => navigate(-1)} className="mb-4 inline-flex items-center gap-2 text-sm" style={{ color: "var(--muted)" }}>
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>
      <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">{mode === "create" ? "Create lead" : "Edit lead"}</p>
      <h1 className="mt-2 text-3xl font-semibold" style={{ color: "var(--text)" }}>{mode === "create" ? "New Lead" : "Update Lead"}</h1>
      <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
        <label className="block">
          <span className="mb-2 block text-sm" style={{ color: "var(--muted)" }}>Name</span>
          <Input {...register("name")} placeholder="Lead name" />
          {errors.name ? <p className="mt-1 text-xs text-rose-300">{errors.name.message}</p> : null}
        </label>
        <label className="block">
          <span className="mb-2 block text-sm" style={{ color: "var(--muted)" }}>Email</span>
          <Input {...register("email")} placeholder="lead@email.com" />
          {errors.email ? <p className="mt-1 text-xs text-rose-300">{errors.email.message}</p> : null}
        </label>
        <label className="block">
          <span className="mb-2 block text-sm" style={{ color: "var(--muted)" }}>Status</span>
          <Select {...register("status")}>
            {LEAD_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm" style={{ color: "var(--muted)" }}>Source</span>
          <Select {...register("source")}>
            {LEAD_SOURCES.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </Select>
        </label>
        {role === "Admin" ? (
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm" style={{ color: "var(--muted)" }}>Assigned To</span>
            <Select {...register("assignedTo")}>
              <option value="">Select a user</option>
              {usersQuery.data?.data.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} - {user.role}
                </option>
              ))}
            </Select>
          </label>
        ) : null}
        <div className="md:col-span-2">
          <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
            {mode === "create" ? "Create Lead" : "Save Changes"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
