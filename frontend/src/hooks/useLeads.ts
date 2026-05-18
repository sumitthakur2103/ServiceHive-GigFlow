import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { leadService } from "../services/leadService";
import type { LeadFilters } from "../types/lead";
import { toast } from "sonner";
import { useAuthStore } from "../store/authStore";

export const useLeads = (filters: LeadFilters) => {
  const userId = useAuthStore((state) => state.user?.id ?? "anonymous");
  const role = useAuthStore((state) => state.user?.role ?? "unknown");

  return useQuery({
    queryKey: ["leads", userId, role, filters],
    queryFn: () => leadService.list(filters)
  });
};

export const useLeadStats = () => {
  const userId = useAuthStore((state) => state.user?.id ?? "anonymous");
  const role = useAuthStore((state) => state.user?.role ?? "unknown");

  return useQuery({
    queryKey: ["lead-stats", userId, role],
    queryFn: leadService.stats
  });
};

export const useLeadDetails = (id: string) => {
  const userId = useAuthStore((state) => state.user?.id ?? "anonymous");
  const role = useAuthStore((state) => state.user?.role ?? "unknown");

  return useQuery({
    queryKey: ["lead", userId, role, id],
    queryFn: () => leadService.details(id),
    enabled: Boolean(id)
  });
};

export const useLeadMutations = () => {
  const queryClient = useQueryClient();

  const invalidateAll = async (): Promise<void> => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["leads"] }),
      queryClient.invalidateQueries({ queryKey: ["lead-stats"] }),
      queryClient.invalidateQueries({ queryKey: ["lead"] })
    ]);
  };

  const createMutation = useMutation({
    mutationFn: leadService.create,
    onSuccess: async () => {
      toast.success("Lead created");
      await invalidateAll();
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Parameters<typeof leadService.update>[1] }) =>
      leadService.update(id, payload),
    onSuccess: async () => {
      toast.success("Lead updated");
      await invalidateAll();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: leadService.remove,
    onSuccess: async () => {
      toast.success("Lead deleted");
      await invalidateAll();
    }
  });

  return { createMutation, updateMutation, deleteMutation };
};
