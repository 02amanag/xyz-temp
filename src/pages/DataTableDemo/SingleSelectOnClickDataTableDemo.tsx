/**
 * SingleSelectOnClickDataTableDemo.tsx
 * Developed by Docuart Bilgi Teknolojileri
 */
import { DataTable } from "xyz-comp";
import { ColumnDef } from "@tanstack/react-table";
import { Card } from "xyz-comp";

interface Customer {
  id: number;
  fullName: string;
  city: string;
}

const columns: ColumnDef<Customer>[] = [
  { header: "ID", accessorKey: "id" },
  { header: "Full Name", accessorKey: "fullName" },
  { header: "City", accessorKey: "city" },
];

const data: Customer[] = [
  { id: 1, fullName: "Ali Veli", city: "Istanbul" },
  { id: 2, fullName: "Ahmet Çelik", city: "Ankara" },
  { id: 3, fullName: "Zeynep Arslan", city: "Izmir" },
];

export default function SingleSelectOnClickDataTableDemo() {
  return (
    <Card className="p-5">
      <DataTable
        data={data}
        columns={columns}
        title="Single Selection (onClick)"
        selectionMode="single"
        selectRowOnClick
        paginator={false}
      />
    </Card>
  );
}
