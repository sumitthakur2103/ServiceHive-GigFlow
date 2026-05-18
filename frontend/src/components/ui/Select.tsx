import type { SelectHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export const Select = ({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>): JSX.Element => {
  return (
    <select
      className={cn(
        "w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20",
        className
      )}
      style={{
        backgroundColor: "var(--input-bg)",
        borderColor: "var(--border)",
        color: "var(--text)"
      }}
      {...props}
    >
      {children}
    </select>
  );
};
