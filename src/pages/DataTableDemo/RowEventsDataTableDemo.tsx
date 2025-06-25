/**
 * RowEventsDataTableDemo.tsx
 * Developed by Docuart Bilgi Teknolojileri
 *
 * Bu sayfada, tablo satırına:
 *  - tek tıklama (onRowClick)
 *  - çift tıklama (onRowDoubleClick)
 *  - sağ tıklama (onRowContextMenu)
 * olaylarını yakalayarak ekranda "Event Log" alanına yazıyoruz.
 */

import React, { useState } from "react";
import { DataTable } from "xyz-comp";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Card } from "xyz-comp";
import { Label } from "xyz-comp";

interface LogItem {
  id: number;
  action: string;
}

const data: LogItem[] = [
  { id: 1, action: "User Login" },
  { id: 2, action: "User Logout" },
];

const columns: ColumnDef<LogItem>[] = [
  { header: "ID", accessorKey: "id" },
  { header: "Action", accessorKey: "action" },
];

export default function RowEventsDataTableDemo() {
  const [eventLog, setEventLog] = useState<string>("Henüz bir işlem yok.");

  function handleRowClick(row: Row<LogItem>) {
    const message = `Tek tık: ID=${row.original.id}, Action=${row.original.action}`;
    setEventLog(message);
  }

  function handleRowDoubleClick(row: Row<LogItem>, e: React.MouseEvent) {
    e.preventDefault(); // opsiyonel, çift tıklamanın yan etkilerini engellemek isterseniz
    const message = `Çift tık: ID=${row.original.id}, Action=${row.original.action}`;
    setEventLog(message);
  }

  function handleRowContextMenu(row: Row<LogItem>, e: React.MouseEvent) {
    e.preventDefault(); // sağ tık menüsünü kapat
    const message = `Sağ tık: ID=${row.original.id}, Action=${row.original.action}`;
    setEventLog(message);
  }

  return (
    <Card className="p-5 space-y-4">
      <DataTable
        data={data}
        columns={columns}
        title="Row Events (Click, Double Click, Right Click)"
        paginator={false}
        onRowClick={handleRowClick}
        onRowDoubleClick={handleRowDoubleClick}
        onRowContextMenu={handleRowContextMenu}
      />

      <Label className="block font-semibold">Event Log:</Label>
      <div className="p-2 border rounded bg-muted">
        {eventLog}
      </div>
    </Card>
  );
}
