/**
 * BasicUsageDataTableDemo.tsx
 * Developed by Docuart Bilgi Teknolojileri
 */
import { DataTable } from "xyz-comp";
import { ColumnDef } from "@tanstack/react-table";
import { Card } from "xyz-comp";

interface Person {
  id: number;
  firstName: string;
  lastName: string;
}

const columns: ColumnDef<Person>[] = [
  { header: "ID", accessorKey: "id" },
  { header: "First Name", accessorKey: "firstName" },
  { header: "Last Name", accessorKey: "lastName" },
];

const data: Person[] = [
  { id: 1, firstName: "Ali", lastName: "Kara" },
  { id: 2, firstName: "Ayşe", lastName: "Yılmaz" },
  { id: 3, firstName: "Mehmet", lastName: "Demir" },
];

export default function BasicUsageDataTableDemo() {
  return (
    <Card className="p-5">
      <DataTable
        data={data}
        columns={columns}
        title="Basic Usage"
        paginator={false}
        selectionMode="single"
      />
    </Card>
  );
}
