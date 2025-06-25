/**
 * MultipleSelectPinningDataTableDemo.tsx
 * Developed by Docuart Bilgi Teknolojileri
 *
 * Bu sayfa, hem kolon pinleme (enablePinning) hem de
 * satır pinleme (enableRowPinning) özelliklerini gösterir.
 * Her satırda "Pin Top", "Pin Bottom" veya "Unpin" butonu bulunur.
 * Tıklanınca satır rowPinningState.top veya rowPinningState.bottom
 * dizisine eklenir veya çıkartılır.
 * Ayrıca tabloya daha fazla veri eklenerek dikey scroll sağlanır.
 */

import { useState } from "react";
import { DataTable, RowPinningState } from "xyz-comp";
import { ColumnDef } from "@tanstack/react-table";
import { Card } from "xyz-comp";
import { Button } from "xyz-comp";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function MultipleSelectPinningDataTableDemo() {
  // Örnek veri (10 satır)
  const [data] = useState<User[]>([
    { id: 1, name: "Ali", email: "ali@example.com", role: "Admin" },
    { id: 2, name: "Ayşe", email: "ayse@example.com", role: "User" },
    { id: 3, name: "Mehmet", email: "mehmet@example.com", role: "Editor" },
    { id: 4, name: "Zeynep", email: "zey@example.com", role: "User" },
    { id: 5, name: "Hasan", email: "hasan@example.com", role: "Editor" },
    { id: 6, name: "Elif", email: "elif@example.com", role: "User" },
    { id: 7, name: "Merve", email: "merve@example.com", role: "Admin" },
    { id: 8, name: "Cem", email: "cem@example.com", role: "User" },
    { id: 9, name: "Burak", email: "burak@example.com", role: "Admin" },
    { id: 10, name: "Gamze", email: "gamze@example.com", role: "Editor" },
  ]);

  // Satır pin state
  const [rowPinState, setRowPinState] = useState<RowPinningState>({
    top: [],
    bottom: [],
  });

  // Pin üst kısma
  function pinRowTop(rowId: string) {
    setRowPinState((prev) => {
      // Eğer zaten top dizisindeyse eklemeyelim
      if (!prev.top.includes(rowId)) {
        // Aynı satır bottom dizisindeyse onu da çıkaralım
        const nextBottom = prev.bottom.filter((id) => id !== rowId);
        return { ...prev, top: [...prev.top, rowId], bottom: nextBottom };
      }
      return prev;
    });
  }

  // Pin alt kısma
  function pinRowBottom(rowId: string) {
    setRowPinState((prev) => {
      if (!prev.bottom.includes(rowId)) {
        const nextTop = prev.top.filter((id) => id !== rowId);
        return { ...prev, bottom: [...prev.bottom, rowId], top: nextTop };
      }
      return prev;
    });
  }

  // Unpin (hem top hem bottom dizilerinden çıkar)
  function unpinRow(rowId: string) {
    setRowPinState((prev) => {
      return {
        ...prev,
        top: prev.top.filter((id) => id !== rowId),
        bottom: prev.bottom.filter((id) => id !== rowId),
      };
    });
  }

  // TanStack Table kolon tanımları
  const columns: ColumnDef<User>[] = [
    {
      header: "ID",
      accessorKey: "id",
      enablePinning: true, // Kolon sabitleme desteği
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Role",
      accessorKey: "role",
    },
    {
      id: "pinActions",
      header: "Pin Actions",
      cell: ({ row }) => {
        // Row ID (string)
        const rowId = row.id;
        // TanStack row pin durumunu al
        const pinnedPos = row.getIsPinned?.();
        // pinnedPos "top", "bottom" veya false döner
        if (pinnedPos === "top" || pinnedPos === "bottom") {
          // Zaten pinned -> Unpin butonu
          return (
            <Button size="sm" onClick={() => unpinRow(String(rowId))}>
              Unpin
            </Button>
          );
        } else {
          // Henüz pinned değil -> Pin Top & Pin Bottom butonları
          return (
            <div className="flex gap-1">
              <Button size="sm" variant="outline" onClick={() => pinRowTop(String(rowId))}>
                Pin Top
              </Button>
              <Button size="sm" variant="outline" onClick={() => pinRowBottom(String(rowId))}>
                Pin Bottom
              </Button>
            </div>
          );
        }
      },
      enablePinning: false,
      size: 140,
    },
  ];

  return (
    <Card className="p-5">
      <DataTable
        data={data}
        columns={columns}
        title="Multiple Selection + Pinning"
        selectionMode="multiple"
        enablePinning
        enableRowPinning
        rowPinningState={rowPinState}
        onRowPinningChange={setRowPinState}
        enableColumnVisibility
        paginator={false}
        scrollHeight="400px"
      />
    </Card>
  );
}
