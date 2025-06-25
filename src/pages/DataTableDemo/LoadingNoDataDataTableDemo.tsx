/**
 * LoadingNoDataDataTableDemo.tsx
 * Developed by Docuart Bilgi Teknolojileri
 */
import { useState, useEffect } from "react";
import { DataTable } from "xyz-comp";
import { ColumnDef } from "@tanstack/react-table";
import { Card } from "xyz-comp";

interface Something {
  id: number;
  info: string;
}

const columns: ColumnDef<Something>[] = [
  { header: "ID", accessorKey: "id" },
  { header: "Info", accessorKey: "info" },
];

export default function LoadingNoDataDataTableDemo() {
  const [data, setData] = useState<Something[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2 saniye sonra boş data dönelim
    const timer = setTimeout(() => {
      setData([]);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="p-5">
      <DataTable
        data={data}
        columns={columns}
        title="Loading & No Data"
        isLoading={loading}
        noDataMessage="Kayıt bulunamadı"
        paginator={false}
      />
    </Card>
  );
}
