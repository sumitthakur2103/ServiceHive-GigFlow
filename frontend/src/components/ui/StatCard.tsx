import { motion } from "framer-motion";
import { Card } from "./Card";

interface StatCardProps {
  label: string;
  value: number | string;
  accent: string;
  hint?: string;
}

export const StatCard = ({ label, value, accent, hint }: StatCardProps): JSX.Element => {
  return (
    <motion.div whileHover={{ y: -3 }}>
      <Card className="relative overflow-hidden">
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`} />
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          {label}
        </p>
        <div className="mt-3 text-3xl font-semibold" style={{ color: "var(--text)" }}>
          {value}
        </div>
        {hint ? <p className="mt-2 text-xs" style={{ color: "var(--muted)" }}>{hint}</p> : null}
      </Card>
    </motion.div>
  );
};
