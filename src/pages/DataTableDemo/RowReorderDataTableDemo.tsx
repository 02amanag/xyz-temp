/**
 * RowReorderDataTableDemo.tsx
 * Developed by Docuart Bilgi Teknolojileri
 */
import { useState } from "react";
import { DataTable } from "xyz-comp";
import { ColumnDef } from "@tanstack/react-table";
import { Card } from "xyz-comp";

interface Task {
  id: number;
  title: string;
  status: string;
}

const initialData: Task[] = [
  { id: 1, title: "Setup project", status: "Done" },
  { id: 2, title: "Implement feature", status: "In Progress" },
  { id: 3, title: "Write tests", status: "Pending" },
  { id: 4, title: "Review code", status: "Pending" },
];

const columns: ColumnDef<Task>[] = [
  { header: "ID", accessorKey: "id" },
  { header: "Title", accessorKey: "title" },
  { header: "Status", accessorKey: "status" },
];

export default function RowReorderDataTableDemo() {
  const [tasks, setTasks] = useState<Task[]>(initialData);

  function handleRowReorder(newData: Task[]) {
    setTasks(newData);
  }

  return (
    <Card className="p-5">
      <DataTable
        data={tasks}
        columns={columns}
        title="Row Reorder"
        enableRowReorder
        onRowReorder={handleRowReorder}
        paginator={false}
      />
    </Card>
  );
}
