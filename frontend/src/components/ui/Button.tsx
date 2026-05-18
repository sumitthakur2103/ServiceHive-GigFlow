import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-cyan-500 text-slate-950 hover:bg-cyan-400",
  secondary: "bg-[color:var(--surface)] text-[color:var(--text)] hover:opacity-90 border border-[color:var(--border)]",
  ghost: "bg-transparent text-[color:var(--text)] hover:bg-black/5 dark:hover:bg-white/5",
  danger: "bg-rose-500 text-white hover:bg-rose-400"
};

export const Button = ({ variant = "primary", className, children, ...props }: ButtonProps): JSX.Element => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
