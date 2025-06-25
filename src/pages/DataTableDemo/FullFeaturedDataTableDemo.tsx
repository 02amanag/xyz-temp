/*
 * FullFeaturedDataTableDemo.tsx
 * Developed by Docuart Bilgi Teknolojileri
 *
 * Bu örnekte, DataTable bileşeninin tüm gelişmiş özellikleri kullanılır;
 * ek olarak tüm CRUD işlemleri ve toplu silme AlertDialog / Dialog pencereleri
 * üzerinden gerçekleştirilir.
 *
 *  - Lucide-react ikonları (Plus, Trash2, Layers, Edit, XCircle)
 *  - Toolbar'da "New Record", "Bulk Delete", "Group by Category" butonları
 *  - Satır bazında "Actions" kolonu (Edit / Delete) ikonlu butonlar
 *  - Tüm silme işlemleri AlertDialog ile onaylanır
 *  - Yeni kayıt & düzenleme aynı Dialog içinde yapılır;
 *    Dialog başlığı "New Record" veya "Update Record" olarak dinamik değişir
 */

import { useState, useMemo } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  Checkbox,
  DataTable,
  DataTableColumnDef,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  Label,
  RowPinningState,
  TableData,
} from "xyz-comp";
import { Card } from "xyz-comp";
import { Button } from "xyz-comp";
import { Input } from "xyz-comp";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "xyz-comp";
import { Toolbar } from "xyz-comp";

// Lucide‑react ikonları
import { Plus, Trash2, Layers, Edit, XCircle } from "lucide-react";

/** Veri tipimiz */
interface ComplexItem extends TableData {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  disabled?: boolean;
}

/** Başlangıç verisi */
const initialData: ComplexItem[] = [
  { id: 1, name: "Item A", category: "Cat1", price: 100, stock: 5 },
  { id: 2, name: "Item B", category: "Cat1", price: 200, stock: 3, disabled: true },
  { id: 3, name: "Item C", category: "Cat2", price: 150, stock: 10 },
  { id: 4, name: "Item D", category: "Cat2", price: 300, stock: 2 },
  { id: 5, name: "Item E", category: "Cat1", price: 80, stock: 7 },
  { id: 6, name: "Item F", category: "Cat1", price: 120, stock: 0 },
  { id: 7, name: "Item G", category: "Cat2", price: 220, stock: 15 },
  { id: 8, name: "Item H", category: "Cat1", price: 90, stock: 8 },
  { id: 9, name: "Item I", category: "Cat2", price: 250, stock: 1, disabled: true },
  { id: 10, name: "Item J", category: "Cat1", price: 140, stock: 12 },
  { id: 11, name: "Item K", category: "Cat3", price: 500, stock: 4 },
  { id: 12, name: "Item L", category: "Cat3", price: 250, stock: 9 },
];

export default function FullFeaturedDataTableDemo() {
  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------
  const [data, setData] = useState<ComplexItem[]>(initialData);
  const [selectedRows, setSelectedRows] = useState<ComplexItem[]>([]);

  // Dialog (Add / Edit)
  const [openRecordDialog, setOpenRecordDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState<ComplexItem | null>(null);
  const isNewRecord = useMemo(() => !currentItem || !data.find((d) => d.id === currentItem.id), [currentItem, data]);

  // AlertDialog (Delete ‑ single / bulk)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteTargetIds, setDeleteTargetIds] = useState<number[]>([]);

  // Row Pinning
  const [rowPin, setRowPin] = useState<RowPinningState>({ top: [], bottom: [] });

  // Grouping
  const [grouping, setGrouping] = useState<string[]>([]);
  const toggleGrouping = () => setGrouping((g) => (g.length ? [] : ["category"]));

  // ---------------------------------------------------------------------------
  // CRUD Helpers
  // ---------------------------------------------------------------------------
  const openNewRecord = () => {
    const maxId = data.reduce((max, d) => Math.max(max, d.id), 0);
    setCurrentItem({ id: maxId + 1, name: `${maxId + 1} test`, category: "Cat1", price: 0, stock: 0, disabled: false });
    setOpenRecordDialog(true);
  };

  const openEditRecord = (item: ComplexItem) => {
    setCurrentItem({ ...item });
    setOpenRecordDialog(true);
  };

  const saveRecord = () => {
    if (!currentItem) return;
    setData((prev) => {
      const idx = prev.findIndex((d) => d.id === currentItem.id);
      if (idx === -1) {
        // Yeni kayıt
        return [...prev, currentItem];
      } else {
        // Güncelleme
        const copy = [...prev];
        copy[idx] = currentItem;
        return copy;
      }
    });
    setOpenRecordDialog(false);
  };

  // Delete helpers
  const requestDelete = (ids: number[]) => {
    setDeleteTargetIds(ids);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (!deleteTargetIds.length) return;
    setData((prev) => prev.filter((d) => !deleteTargetIds.includes(d.id)));
    // Seçimleri temizle
    setSelectedRows([]);
    setDeleteTargetIds([]);
    setOpenDeleteDialog(false);
  };

  // Row Reorder
  const handleRowReorder = (newData: ComplexItem[]) => setData(newData);

  // ---------------------------------------------------------------------------
  // Column definitions
  // ---------------------------------------------------------------------------
  const columns: DataTableColumnDef<ComplexItem>[] = [
    {
      header: "ID",
      accessorKey: "id",
      enablePinning: true,
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      header: "Name",
      accessorKey: "name",
      enableSorting: true,
      enableColumnFilter: true,
      customFilter: ({ filterValue, setFilterValue }) => (
        <Input
          placeholder="Search name..."
          size="sm"
          value={String(filterValue ?? "")}
          onChange={(e) => setFilterValue(e.target.value)}
        />
      ),
    },
    {
      header: "Category",
      accessorKey: "category",
      enableSorting: true,
      enableColumnFilter: true,
      customFilter: ({ filterValue, setFilterValue }) => (
        <Select
          value={String(filterValue ?? "all")}
          onValueChange={(val: any) => setFilterValue(val === "all" ? "" : val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Cats" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cats</SelectItem>
            <SelectItem value="Cat1">Cat1</SelectItem>
            <SelectItem value="Cat2">Cat2</SelectItem>
            <SelectItem value="Cat3">Cat3</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      header: "Price",
      accessorKey: "price",
      enableSorting: true,
      enableColumnFilter: true,
      aggregatedCell: ({ getValue }) => `Sum Price: ${getValue()}`,
    },
    {
      header: "Stock",
      accessorKey: "stock",
      enableSorting: true,
      enableColumnFilter: true,
      customFilter: ({ filterValue, setFilterValue }) => (
        <Input
          type="number"
          placeholder="Min stock..."
          size="sm"
          value={String(filterValue ?? "")}
          onChange={(e) => setFilterValue(e.target.value)}
        />
      ),
      aggregatedCell: ({ getValue }) => `Sum Stock: ${getValue()}`,
    },
    {
      header: "",
      id: "actions",
      enableColumnFilter: false,
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => openEditRecord(item)}>
              <Edit className="mr-1 h-4 w-4" />
              Edit
            </Button>
            <Button size="sm" variant="destructive" onClick={() => requestDelete([item.id])}>
              <XCircle className="mr-1 h-4 w-4" />
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <Card className="p-5 space-y-4">
      {/* ----------------------------- DataTable ----------------------------- */}
      <DataTable<ComplexItem>
        data={data}
        columns={columns}
        title="Complex Items"
        // Toolbar
        header={
          <Toolbar
            alignment="left"
            left={
              <>
                <Button onClick={openNewRecord} className="inline-flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  <span>New Record</span>
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => requestDelete(selectedRows.map((r) => r.id))}
                  disabled={selectedRows.length === 0}
                  className="inline-flex items-center gap-1"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Bulk Delete</span>
                </Button>
              </>
            }
            right={
              <Button onClick={toggleGrouping} className="inline-flex items-center gap-1">
                <Layers className="h-4 w-4" />
                {grouping.length ? "Clear Grouping" : "Group by Category"}
              </Button>
            }
          />
        }
        // Footer
        footer={<div className="p-2 text-sm text-muted-foreground flex justify-end">Toplam kayıt sayısı: {data.length}</div>}
        // Selection
        selectionMode="multiple"
        onSelectionChange={setSelectedRows}
        // Row pinning / reorder / expand
        enablePinning
        enableRowPinning
        rowPinningState={rowPin}
        onRowPinningChange={setRowPin}
        enableRowReorder
        onRowReorder={handleRowReorder}
        enableRowExpand
        renderRowExpand={(rowData) => (
          <div className="p-2 bg-muted">
            <strong>Extra Info:</strong> {rowData.name} - {rowData.category}, Price: {rowData.price}
          </div>
        )}
        // Grouping
        enableGrouping
        grouping={grouping}
        onGroupingChange={(val) => setGrouping(val as string[])}
        // Filters & Sorting
        enableGlobalFilter
        enableColumnVisibility
        enableColumnResizing
        columnResizeMode="onChange"
        // Export & Print
        enableExport
        enablePrint
        // Styling
        styleProps={{ striped: true, hasGridLines: true }}
        // Pagination
        paginator
        initialPageSize={5}
        showFooterHeaders
      />

      {/* -------------------------- Add / Edit Dialog -------------------------- */}
      <Dialog
        open={openRecordDialog}
        showScroll
        onCloseClickOutside
        size="lg"
        onOpenChange={setOpenRecordDialog}
      >
        <DialogContent >
          <DialogHeader className="font-bold">{isNewRecord ? "New Record" : "Update Record"}</DialogHeader>

          {currentItem && (
            <div className="overflow-y-auto scrollbar-thin px-5 flex flex-col gap-3">
              <Input
                value={currentItem.id}
                placeholder="ID"
                label="ID"
                type="number"
                onChange={(e) => setCurrentItem({ ...currentItem, id: Number(e.target.value) })}
              />
              <Input
                value={currentItem.name}
                placeholder="Name"
                label="Name"
                onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
              />
              <Input
                value={currentItem.category}
                placeholder="Category"
                label="Category"
                onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })}
              />
              <Input
                value={currentItem.price}
                placeholder="Price"
                label="Price"
                type="number"
                keyFilter="number"
                onChange={(e) => setCurrentItem({ ...currentItem, price: Number(e.target.value) })}
              />
              <Input
                value={currentItem.stock}
                placeholder="Stock"
                keyFilter="number"
                label="Stock"
                type="number"
                onChange={(e) => setCurrentItem({ ...currentItem, stock: Number(e.target.value) })}
              />
              <div className="flex flex-col gap-2">
                <Label>Disabled</Label>
                <Checkbox
                  checked={currentItem.disabled ?? false}
                  onCheckedChange={(checked: boolean) => setCurrentItem({ ...currentItem, disabled: checked })}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenRecordDialog(false)}>
              Cancel
            </Button>
            <Button onClick={saveRecord}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --------------------------- Delete AlertDialog --------------------------- */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Confirmation</AlertDialogTitle>
          </AlertDialogHeader>
          {deleteTargetIds.length === 1 ? (
            <p>Seçilen kaydı silmek üzeresiniz. Devam etmek istiyor musunuz?</p>
          ) : (
            <p>Seçilen {deleteTargetIds.length} kaydı silmek üzeresiniz. Devam etmek istiyor musunuz?</p>
          )}
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setOpenDeleteDialog(false)}>
              Vazgeç
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Sil
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}