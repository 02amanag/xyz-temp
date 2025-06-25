/**
 * ColumnResizeDataTableDemo.tsx
 * Developed by Docuart Bilgi Teknolojileri
 *
 * Bu sayfada, DataTable bileşeninde kolon boyutlandırma (resize) özelliğini gösteriyoruz.
 * "enableColumnResizing" aktif. "columnResizeMode" değerini ("onChange" veya "onEnd")
 * kullanıcı arayüzünden değiştirebilirsiniz.
 */

import { useState } from "react";
import { Card } from "xyz-comp";
import { Label } from "xyz-comp";
import { DataTable, DataTableColumnDef } from "xyz-comp";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "xyz-comp";

// Örnek veri tipi
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

// Örnek veri
const data: Product[] = [
  { id: 1, name: "Laptop", category: "Elektronik", price: 9000 },
  { id: 2, name: "Mouse", category: "Elektronik", price: 150 },
  { id: 3, name: "Kalem", category: "Kırtasiye", price: 10 },
  { id: 4, name: "Kitap", category: "Kırtasiye", price: 45 },
  { id: 5, name: "Telefon", category: "Elektronik", price: 3000 }
];

// Kolon tanımları
const columns: DataTableColumnDef<Product>[] = [
  {
    header: "ID",
    accessorKey: "id",
    size: 60,
    minSize: 40,
    maxSize: 120
  },
  {
    header: "Name",
    accessorKey: "name",
    size: 200,
    minSize: 100
  },
  {
    header: "Category",
    accessorKey: "category",
    size: 150,
    minSize: 80
  },
  {
    header: "Price",
    accessorKey: "price",
    size: 120,
    minSize: 60
  }
];

export default function ColumnResizeDataTableDemo() {
  // columnResizeMode kontrolü: varsayılan "onChange"
  const [resizeMode, setResizeMode] = useState<"onChange" | "onEnd">("onChange");

  return (
    <Card className="p-5 space-y-4">
      {/* Üstte tabloya ait bir kontrol */}
      <div className="flex items-center gap-3">
        <Label className="font-semibold">Column Resize Mode:</Label>
        <Select
          value={resizeMode}
          onValueChange={(val:any) => setResizeMode(val as "onChange" | "onEnd")}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="onChange">onChange</SelectItem>
            <SelectItem value="onEnd">onEnd</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Asıl tablo */}
      <DataTable<Product>
        title="Column Resize Demo"
        data={data}
        columns={columns}
        enableColumnResizing
        columnResizeMode={resizeMode} // state ile yönetiyoruz
        paginator={false}
        noDataMessage="No products found"
      />
    </Card>
  );
}
