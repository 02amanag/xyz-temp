/**
 * ServerSideDataTableDemo.tsx
 * Developed by Docuart Bilgi Teknolojileri
 *
 * Bu sayfada, DataTable bileşenini sunucu taraflı (server mode) çalışacak şekilde
 * yapılandırıyoruz, customFilter,
 * globalFilter, kolon görünürlüğü, vs. ek özelliklere de yer veriyoruz.
 */

import { useState } from "react";
import { Card } from "xyz-comp";
import { Input } from "xyz-comp";
import { Label } from "xyz-comp";
import { Cpu, Pen, Globe2 } from "lucide-react";
import { DatePicker } from "xyz-comp";
import { SortingState, ExpandedState, ColumnFiltersState } from "@tanstack/react-table";
import { DataTable, DataTableColumnDef, TableData } from "xyz-comp";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue, } from "xyz-comp";

/** Veri tipi (sunucu tabanlı tablo için) */
interface Product extends TableData {
  id: number;
  productName: string;
  category: string;
  publishDate?: string;
  price?: number;
  country?: string;
  disabled?: boolean;
  active?: boolean;
}

/** Kolonlar */
const columns: DataTableColumnDef<Product>[] = [
  {
    header: "Ürün Adı",
    accessorKey: "productName",
    enableSorting: true,
    enableColumnFilter: true,
    // Filtre: basit Input
    customFilter: ({ filterValue, setFilterValue }) => (
      <Input
        placeholder="Ürün adı ara..."
        value={String(filterValue ?? "")}
        onChange={(e) => setFilterValue(e.target.value)}
      />
    ),
    cell: ({ row }) => <Label>{row.getValue("productName")}</Label>,
  },
  {
    header: "Kategori",
    accessorKey: "category",
    enableSorting: true,
    enableColumnFilter: true,
    customFilter: ({ filterValue, setFilterValue }) => (
      <Select
        value={String(filterValue || "all")}
        onValueChange={(val:any) => setFilterValue(val === "all" ? "" : val)}
      >
        <SelectTrigger className="relative pl-8 text-sm">
          <SelectValue placeholder="Kategori Seç" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tümü</SelectItem>
          <SelectItem value="Elektronik">
            <span className="inline-flex items-center gap-2">
              <Cpu className="w-4 h-4 text-foreground" />
              Elektronik
            </span>
          </SelectItem>
          <SelectItem value="Kırtasiye">
            <span className="inline-flex items-center gap-2">
              <Pen className="w-4 h-4 text-foreground" />
              Kırtasiye
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    ),
    cell: ({ row }) => <Label>{row.getValue("category")}</Label>,
  },
  {
    header: "Ülke",
    accessorKey: "country",
    enableSorting: true,
    enableColumnFilter: true,
    customFilter: ({ filterValue, setFilterValue }) => (
      <Select
        value={String(filterValue || "all")}
        onValueChange={(val:any) => setFilterValue(val === "all" ? "" : val)}
      >
        <SelectTrigger className="relative pl-8 text-sm">
          <Globe2 className="w-4 h-4 absolute left-2 top-2 text-muted-foreground" />
          <SelectValue placeholder="Ülke Seç" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tümü</SelectItem>
          <SelectItem value="TR">🇹🇷 Türkiye</SelectItem>
          <SelectItem value="US">🇺🇸 ABD</SelectItem>
          <SelectItem value="DE">🇩🇪 Almanya</SelectItem>
          <SelectItem value="FR">🇫🇷 Fransa</SelectItem>
        </SelectContent>
      </Select>
    ),
    cell: ({ row }) => {
      const c = row.getValue("country") as string;
      let flag = "";
      let label = c;

      if (c === "TR") {
        flag = "🇹🇷";
        label = "Türkiye";
      } else if (c === "US") {
        flag = "🇺🇸";
        label = "ABD";
      } else if (c === "DE") {
        flag = "🇩🇪";
        label = "Almanya";
      } else if (c === "FR") {
        flag = "🇫🇷";
        label = "Fransa";
      } else {
        flag = "🌐";
        label = "Diğer";
      }
      return <Label>{flag} {label}</Label>;
    },
  },
  {
    header: "Yayın Tarihi",
    accessorKey: "publishDate",
    enableSorting: true,
    enableColumnFilter: true,
    // DatePicker
    customFilter: ({ filterValue, setFilterValue }) => {
      let from: Date | undefined;
      let to: Date | undefined;

      if (typeof filterValue === "string" && filterValue.includes(",")) {
        const [fromStr, toStr] = filterValue.split(",");
        if (fromStr) from = new Date(fromStr);
        if (toStr) to = new Date(toStr);
      }

      return (
        <DatePicker
          date={{ from, to }}
          numberOfMonths={1}
          closeOnSelect
          variant="outline"
          onDateSelect={(range: any) => {
            const fromStr = range.from.toISOString().slice(0, 10);
            const toStr = range.to.toISOString().slice(0, 10);
            setFilterValue(`${fromStr},${toStr}`);
          }}
        />
      );
    },
    cell: ({ row }) => {
      const dateStr: string = row.getValue("publishDate");
      return <Label>{dateStr}</Label>;
    },
  },
  {
    header: "Fiyat",
    accessorKey: "price",
    enableSorting: true,
    enableColumnFilter: true,
    // sortingFn -> sadece alert
    sortingFn: (rowA, rowB, columnId) => {
      console.log(`
        (custom sortingFn)
        rowA price: ${rowA.getValue(columnId)},
        rowB price: ${rowB.getValue(columnId)}
      `);
      // Sıralama yapmadığımızı varsayalım => 0 dönüyoruz
      return 0;
    },
    customFilter: ({ filterValue, setFilterValue }) => (
      <Input
        type="number"
        size="sm"
        placeholder="Fiyat..."
        value={String(filterValue ?? "")}
        onChange={(e) => setFilterValue(e.target.value)}
      />
    ),
    cell: ({ row }) => {
      const priceVal = row.getValue("price");
      return <Label>{priceVal ? `${priceVal} TL` : "—"}</Label>;
    },
  },
];

/**
 * @function ServerSideDataTableDemo
 * Sunucu taraflı sayfalama / filtre / sıralama kullanıyoruz,
 * ama tabloyu "DataTableUsageExample.tsx" benzeri advanced custom filter örnekleriyle donatıyoruz.
 */
export default function ServerSideDataTableDemo() {
  // Örnek local veri (sadece gösterim). Gerçekte server’dan gelecek
  const [data] = useState<Product[]>([
    {
      id: 1,
      productName: "Laptop",
      category: "Elektronik",
      publishDate: "2023-08-10",
      price: 9000,
      country: "TR",
    },
    {
      id: 2,
      productName: "Mouse",
      category: "Elektronik",
      publishDate: "2023-08-15",
      price: 150,
      country: "US",
    },
    {
      id: 3,
      productName: "Kitap",
      category: "Kırtasiye",
      publishDate: "2023-07-01",
      price: 45,
      country: "DE",
    },
    {
      id: 4,
      productName: "Kalem",
      category: "Kırtasiye",
      publishDate: "2023-07-11",
      price: 10,
      country: "FR",
    },
  ]);

  const [totalRows] = useState(60); // varsayılan => 60 satır olduğunu varsayalım
  // Yüklenme durumu
  const [loading, setLoading] = useState(false);

  // Sunucuya istek simülasyonu
  async function handleFetchData(params: {
    pageIndex: number;
    pageSize: number;
    sorting?: SortingState;
    columnFilters?: ColumnFiltersState;
    globalFilter?: string;
  }) {
    setLoading(true);
    console.log(`
      [onFetchData]
      pageIndex: ${params.pageIndex}
      pageSize: ${params.pageSize}
      sorting: ${JSON.stringify(params.sorting)}
      columnFilters: ${JSON.stringify(params.columnFilters, null, 2)}
      globalFilter: ${params.globalFilter}
    `);
    // 1-2 sn simüle edip setLoading false yapalım
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }

  function handlePageChange(newPageIndex: number, newPageSize: number) {
    console.log(`(onPageChange) => pageIndex=${newPageIndex}, pageSize=${newPageSize}`);
  }

  function handleColumnFilterChange(columnId: string, filterValue: unknown) {
    console.log(`(onColumnFilterChange) => ${columnId} = ${filterValue}`);
  }

  function handleSortingChange(sorting: SortingState) {
    console.log(`(onSortingChange) => ${JSON.stringify(sorting)}`);
  }

  function handleExpandedChange(expanded: ExpandedState) {
    console.log(`(onExpandedChange) => ${JSON.stringify(expanded)}`);
  }

  return (
    <Card className="p-5">
      <DataTable<Product>
        title="Ürün Listesi (Server Mode)"
        columns={columns}
        data={data}
        totalRows={totalRows}
        paginationMode="server"
        onFetchData={handleFetchData}
        isLoading={loading}
        noDataMessage="Data Bulunamadı"

        // Gelişmiş özellikler
        enableExport
        enablePrint
        enableGlobalFilter
        enableColumnVisibility
        enableColumnResizing
        columnResizeMode="onChange"

        // Callbacks
        onPageChange={handlePageChange}
        onColumnFilterChange={handleColumnFilterChange}
        onSortingChange={handleSortingChange}
        onExpandedChange={handleExpandedChange}

        // Satır expand örneği
        enableRowExpand
        singleRowExpand={false}
        renderRowExpand={(rowData) => (
          <div className="p-3">
            <strong>Detay:</strong> {rowData.productName} - {rowData.category}, Ülke: {rowData.country}
            <br />
            Yayın Tarihi: {rowData.publishDate}
          </div>
        )}

        // Satır seçimi
        selectionMode="multiple"
        onSelectionChange={(rows) => {
          console.log(`(onSelectionChange) => ${JSON.stringify(rows)}`);
        }}


        // Pagination
        paginator
        initialPageSize={5}
      />
    </Card>
  );
}
