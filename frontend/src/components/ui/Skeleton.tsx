import { cn } from "../../utils/cn";

export const Skeleton = ({ className }: { className?: string }): JSX.Element => {
  return <div className={cn("animate-pulse rounded-xl bg-white/10", className)} />;
};
