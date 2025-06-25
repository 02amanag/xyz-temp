/**
 * StylingVariantsDataTableDemo.tsx
 * Developed by Docuart Bilgi Teknolojileri
 */
import { Card } from "xyz-comp";
import { DataTable, DataTableColumnDef } from "xyz-comp";

interface Item {
  id: number;
  label: string;
}

const data: Item[] = [
  { id: 1, label: "Row 1" },
  { id: 2, label: "Row 2" },
  { id: 3, label: "Row 3" },
];

const columns: DataTableColumnDef<Item>[] = [
  { header: "ID", accessorKey: "id" },
  { header: "Label", accessorKey: "label" },
];

export default function StylingVariantsDataTableDemo() {
  return (
    <Card className="p-5">
      <DataTable
        data={data}
        columns={columns}
        title="Styling Variants"
        styleProps={{
          striped: true,
          hasGridLines: true,
          rowSize: "sm",
        }}
        paginator={false}
      />
    </Card>
  );
}
