/**
 * RowExpandDataTableDemo.tsx
 * Developed by Docuart Bilgi Teknolojileri
 */
import { DataTable } from "xyz-comp";
import { ColumnDef } from "@tanstack/react-table";
import { Card } from "xyz-comp";

interface Product {
  id: number;
  name: string;
  description: string;
}

const data: Product[] = [
  { id: 1, name: "Laptop", description: "Powerful gaming laptop" },
  { id: 2, name: "Smartphone", description: "High-end camera phone" },
  { id: 3, name: "Headphones", description: "Noise cancelling" },
];

const columns: ColumnDef<Product>[] = [
  { header: "ID", accessorKey: "id" },
  { header: "Name", accessorKey: "name" },
];

export default function RowExpandDataTableDemo() {
  return (
    <Card className="p-5">
      <DataTable
        data={data}
        columns={columns}
        title="Row Expand"
        enableRowExpand
        renderRowExpand={(rowData) => (
          <div className="p-2 bg-muted">
            <strong>Description:</strong> {rowData.description}
          </div>
        )}
        paginator={false}
      />
    </Card>
  );
}
