/**
 * RowSizeDemo.tsx
 * Developed by Docuart Bilgi Teknolojileri
 *
 * Bu sayfada "rowSize" seçme kontrollerini DataTable bileşeninin "header" prop'una
 * koyarak, tablo üst kısmında bir Select menüsünden satır yüksekliğini değiştirme
 * örneğini sergiliyoruz.
 */

import { useState } from "react";
import { DataTable, DataTableColumnDef } from "xyz-comp";
import { Card } from "xyz-comp";
import { Label } from "xyz-comp";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "xyz-comp";

// Örnek veri tipi
interface Person {
  id: number;
  firstName: string;
  lastName: string;
}

// Örnek veri
const data: Person[] = [
  { id: 1, firstName: "Ali", lastName: "Kara" },
  { id: 2, firstName: "Ayşe", lastName: "Yılmaz" },
  { id: 3, firstName: "Mehmet", lastName: "Demir" },
  { id: 4, firstName: "Zeynep", lastName: "Arslan" },
  { id: 5, firstName: "Hasan", lastName: "Turan" },
];

// Kolon tanımları
const columns: DataTableColumnDef<Person>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "First Name",
    accessorKey: "firstName",
  },
  {
    header: "Last Name",
    accessorKey: "lastName",
  },
];

export default function RowSizeDataTableDemo() {
  // rowSize state (varsayılan "md")
  const [rowSize, setRowSize] = useState<"xs" | "sm" | "md" | "lg">("md");

  return (
    <Card className="p-5 space-y-4">
      <DataTable<Person>
        title="Row Size Demo"
        data={data}
        columns={columns}
        // Tablonun üst kısmındaki "header" prop’una rowSize seçimi ekliyoruz
        header={
          <div className="flex items-center gap-2">
            <Label className="font-semibold">Satır Yüksekliği:</Label>
            <Select
              value={rowSize}
              onValueChange={(val:any) => setRowSize(val as "xs" | "sm" | "md" | "lg")}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="RowSize" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="xs">xs</SelectItem>
                <SelectItem value="sm">sm</SelectItem>
                <SelectItem value="md">md</SelectItem>
                <SelectItem value="lg">lg</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
        styleProps={{
          rowSize,
          striped: true,
          hasGridLines: true,
        }}
        paginator={false}
        noDataMessage="Veri bulunamadı"
      />
    </Card>
  );
}
