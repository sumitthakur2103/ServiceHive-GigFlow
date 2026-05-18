import { cn } from "../../utils/cn";

interface BadgeProps {
  tone: "neutral" | "success" | "warning" | "danger" | "info";
  children: string;
}

const tones: Record<BadgeProps["tone"], string> = {
  neutral: "bg-white/10 text-slate-200",
  success: "bg-emerald-500/15 text-emerald-300",
  warning: "bg-amber-500/15 text-amber-300",
  danger: "bg-rose-500/15 text-rose-300",
  info: "bg-cyan-500/15 text-cyan-300"
};

export const Badge = ({ tone, children }: BadgeProps): JSX.Element => {
  return <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-medium", tones[tone])}>{children}</span>;
};
