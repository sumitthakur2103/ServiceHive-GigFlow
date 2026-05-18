import type { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({ open, title, children, onClose }: ModalProps): JSX.Element | null => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm dark:bg-slate-950/80">
      <div className="w-full max-w-2xl rounded-3xl border p-6 shadow-soft" style={{ backgroundColor: "var(--surface-strong)", borderColor: "var(--border)" }}>
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
            {title}
          </h3>
          <button onClick={onClose} className="rounded-full p-2 transition hover:bg-black/5 hover:text-[color:var(--text)] dark:hover:bg-white/5" style={{ color: "var(--muted)" }}>
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
