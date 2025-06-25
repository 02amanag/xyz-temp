/**
 * ExportPrintDataTableDemo.tsx
 * Developed by Docuart Bilgi Teknolojileri
 */
import { DataTable, DataTableColumnDef } from "xyz-comp";
import { Card } from "xyz-comp";

interface RecordItem {
  id: number;
  title: string;
  value: string;
}

const data: RecordItem[] = [
  { id: 1, title: "Record A", value: "ValA" },
  { id: 2, title: "Record B", value: "ValB" },
];

const columns: DataTableColumnDef<RecordItem>[] = [
  { header: "ID", accessorKey: "id" },
  { header: "Title", accessorKey: "title" },
  { header: "Value", accessorKey: "value" },
];

export default function ExportPrintDataTableDemo() {
  return (
    <Card className="p-5">
      <DataTable
        data={data}
        columns={columns}
        title="Export & Print"
        enableExport
        enablePrint
        enableColumnVisibility
        paginator={false}
      />
    </Card>
  );
}
