import type { ReactNode } from "react";
import { Card } from "./Card";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export const EmptyState = ({ title, description, action }: EmptyStateProps): JSX.Element => {
  return (
    <Card className="flex flex-col items-center justify-center text-center">
      <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
        {title}
      </h3>
      <p className="mt-2 max-w-md text-sm" style={{ color: "var(--muted)" }}>
        {description}
      </p>
      {action ? <div className="mt-5">{action}</div> : null}
    </Card>
  );
};
