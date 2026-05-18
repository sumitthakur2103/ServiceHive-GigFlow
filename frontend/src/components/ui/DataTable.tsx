import type { ReactNode } from "react";

interface Column<T> {
  header: string;
  render: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
}

export const DataTable = <T,>({ columns, rows }: DataTableProps<T>): JSX.Element => {
  return (
    <div className="overflow-hidden rounded-3xl border shadow-soft" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y" style={{ divideColor: "var(--border)" }}>
          <thead style={{ backgroundColor: "var(--surface-strong)" }}>
            <tr>
              {columns.map((column) => (
                <th key={column.header} className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y" style={{ divideColor: "var(--border)" }}>
            {rows.map((row, index) => (
              <tr key={index} className="transition hover:bg-black/5 dark:hover:bg-white/5">
                {columns.map((column) => (
                  <td key={column.header} className="px-5 py-4 text-sm" style={{ color: "var(--text)" }}>
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
