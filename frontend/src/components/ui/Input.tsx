import type { InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export const Input = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>): JSX.Element => {
  return (
    <input
      className={cn(
        "w-full rounded-xl border px-4 py-3 text-sm outline-none transition placeholder:text-[color:var(--muted)] focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20",
        className
      )}
      style={{
        backgroundColor: "var(--input-bg)",
        borderColor: "var(--border)",
        color: "var(--text)"
      }}
      {...props}
    />
  );
};
