/**
 * GroupingAggregationDataTableDemo.tsx
 * Developed by Docuart Bilgi Teknolojileri
 *
 * Bu örnekte sadece "region" üzerinden grouping yapıyoruz.
 * region satırı (row.getIsGrouped() === true) için row.getLeafRows() metoduyla
 * alt satırların product değerlerini toplayıp virgülle birleştiriyoruz.
 */

import { useState } from "react";
import { DataTable, DataTableColumnDef } from "xyz-comp";
import { Card } from "xyz-comp";
import { Button } from "xyz-comp";

interface Sale {
  id: number;
  region: string;
  product: string;
  sales: number;
}

const data: Sale[] = [
  { id: 1, region: "EMEA", product: "Laptop", sales: 5 },
  { id: 2, region: "EMEA", product: "Laptop", sales: 3 },
  { id: 3, region: "EMEA", product: "Phone", sales: 10 },
  { id: 4, region: "APAC", product: "Phone", sales: 20 },
  { id: 5, region: "APAC", product: "Laptop", sales: 2 },
];

// Kolon tanımları
const columns: DataTableColumnDef<Sale>[] = [
  // Region kolonu
  {
    header: "Region",
    accessorKey: "region",
    cell: ({ row, getValue }) => {
      // "region" satırında grouping aktif mi?
      if (row.getIsGrouped?.()) {
        // Tüm alt satırlardaki product değerlerini virgülle birleştirelim
        const leafRows = row.getLeafRows?.() || [];
        const productList = leafRows.map((r) => r.original.product);
        // Unique değerler almak isterseniz:
        // const uniqueProds = Array.from(new Set(productList));
        // Virgülle birleştir:
        const joinedProds = productList.join(", ");

        return (
          <span className="font-bold italic text-blue-700">
            {String(getValue())} → {joinedProds}
          </span>
        );
      }
      return String(getValue());
    },
  },
  // Product kolonu
  {
    header: "Product",
    accessorKey: "product",
    cell: ({ getValue }) => {
      // eğer product'ı da grouping'e eklemiyorsak,
      // row.getIsGrouped() = false olacaktır. Normal satır
      return String(getValue());
    },
  },
  // Sales kolonu
  {
    header: "Sales",
    accessorKey: "sales",
    aggregatedCell: ({ getValue }) => `Toplam: ${getValue()}`,
  },
];

export default function GroupingAggregationDataTableDemo() {
  // Yalnızca "region" üzerinden grouping yapmak için state
  const [grouping, setGrouping] = useState<string[]>([]);

  function toggleGrouping() {
    if (grouping.length > 0) {
      // Varsa kaldır
      setGrouping([]);
    } else {
      // Yoksa region ile başlat
      setGrouping(["region"]);
    }
  }

  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Grouping & Aggregation</h2>
        <Button onClick={toggleGrouping}>
          {grouping.length > 0 ? "Clear Grouping" : "Group by Region"}
        </Button>
      </div>

      <DataTable
        data={data}
        columns={columns}
        title="Sales Table"
        enableGrouping
        grouping={grouping}
        onGroupingChange={(newVal) => setGrouping(newVal as string[])}
        paginator={false}
      />
    </Card>
  );
}
