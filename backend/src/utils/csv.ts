import { stringify } from "csv-stringify/sync";

export interface CsvLeadRow {
  name: string;
  email: string;
  status: string;
  source: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
}

export const buildLeadsCsv = (rows: CsvLeadRow[]): string => {
  return stringify(rows, {
    header: true,
    columns: {
      name: "Name",
      email: "Email",
      status: "Status",
      source: "Source",
      assignedTo: "Assigned To",
      createdAt: "Created At",
      updatedAt: "Updated At"
    }
  });
};
