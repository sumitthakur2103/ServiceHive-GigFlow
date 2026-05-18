import { useMutation, useQuery } from "@tanstack/react-query";
import { authService } from "../services/authService";
import { useAuthStore } from "../store/authStore";
import { toast } from "sonner";

export const useProfile = () => {
  const token = useAuthStore((state) => state.token);
  return useQuery({
    queryKey: ["me"],
    queryFn: authService.me,
    enabled: Boolean(token)
  });
};

export const useLoginMutation = () => {
  const setSession = useAuthStore((state) => state.setSession);
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setSession(data);
      toast.success("Welcome back");
    }
  });
};

export const useRegisterMutation = () => {
  const setSession = useAuthStore((state) => state.setSession);
  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      setSession(data);
      toast.success("Account created");
    }
  });
};
