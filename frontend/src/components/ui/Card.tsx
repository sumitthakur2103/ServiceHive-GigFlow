import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>): JSX.Element => {
  return (
    <div
      className={cn("rounded-3xl border p-6 shadow-soft backdrop-blur", className)}
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
        color: "var(--text)"
      }}
      {...props}
    />
  );
};
