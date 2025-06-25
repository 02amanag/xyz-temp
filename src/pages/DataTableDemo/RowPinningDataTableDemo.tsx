/**
 * RowPinningDataTableDemo.tsx
 * Developed by Docuart Bilgi Teknolojileri
 *
 * Bu sayfa, satır pinleme (enableRowPinning) özelliğini gösterir.
 * Varsayılan olarak ilk iki satır "top" dizisine pinned gelir.
 * Her satırda "Pin Top", "Pin Bottom" veya "Unpin" butonları bulunur.
 * Ayrıca tabloya daha fazla veri eklenerek dikey scroll sağlanır.
 */

import  { useState } from "react";
import { Card } from "xyz-comp";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable, RowPinningState } from "xyz-comp";

interface Ticket {
  id: number;
  subject: string;
  priority: string;
}

export default function RowPinningDataTableDemo() {
  // Örnek veri (10 satır)
  const [data] = useState<Ticket[]>([
    { id: 1, subject: "Login issue", priority: "High" },
    { id: 2, subject: "Payment problem", priority: "Low" },
    { id: 3, subject: "UI bug", priority: "Medium" },
    { id: 4, subject: "Performance issue", priority: "High" },
    { id: 5, subject: "New feature request", priority: "Low" },
    { id: 6, subject: "Security bug", priority: "High" },
    { id: 7, subject: "UX improvement", priority: "Medium" },
    { id: 8, subject: "Deployment problem", priority: "Low" },
    { id: 9, subject: "Payment gateway error", priority: "High" },
    { id: 10, subject: "Misc UI glitch", priority: "Medium" },
  ]);

  // Varsayılan olarak ilk iki satır üstte pinned
  const [rowPinState, setRowPinState] = useState<RowPinningState>({
    top: ["1", "2"], // ID'leri string olarak tutar
    bottom: [],
  });

  // Pin üst kısma
  // function pinRowTop(rowId: string) {
  //   setRowPinState((prev) => {
  //     if (!prev.top.includes(rowId)) {
  //       // Eğer bottom'ta varsa çıkar
  //       const nextBottom = prev.bottom.filter((id) => id !== rowId);
  //       return { ...prev, top: [...prev.top, rowId], bottom: nextBottom };
  //     }
  //     return prev;
  //   });
  // }

  // // Pin alt kısma
  // function pinRowBottom(rowId: string) {
  //   setRowPinState((prev) => {
  //     if (!prev.bottom.includes(rowId)) {
  //       const nextTop = prev.top.filter((id) => id !== rowId);
  //       return { ...prev, bottom: [...prev.bottom, rowId], top: nextTop };
  //     }
  //     return prev;
  //   });
  // }

  // // Unpin
  // function unpinRow(rowId: string) {
  //   setRowPinState((prev) => ({
  //     ...prev,
  //     top: prev.top.filter((id) => id !== rowId),
  //     bottom: prev.bottom.filter((id) => id !== rowId),
  //   }));
  // }

  const columns: ColumnDef<Ticket>[] = [
    { header: "ID", accessorKey: "id" },
    { header: "Subject", accessorKey: "subject" },
    { header: "Priority", accessorKey: "priority" },
  ];

  return (
    <Card className="p-5">
      <DataTable
        data={data}
        columns={columns}
        title="Row Pinning"
        enableRowPinning
        rowPinningState={rowPinState}
        onRowPinningChange={setRowPinState}
        scrollHeight="200px"
        paginator={false}
      />
    </Card>
  );
}
