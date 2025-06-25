/**
 * CustomFilterVisibilityDataTableDemo.tsx
 * Developed by Docuart Bilgi Teknolojileri
 *
 * Bu sayfada, customFilter ve kolon görünürlüğü (enableColumnVisibility)
 * özelliklerini daha da kapsamlı göstermek için ek alanlar ekliyoruz:
 *  - City (Select)
 *  - Age (Numeric Input)
 *  - Birth Date (Input type="date")
 */

import { Input, Select, SelectTrigger, SelectContent, SelectItem, SelectValue, Label, Card, DataTable, DataTableColumnDef } from "xyz-comp";

/** Veri tipi */
interface Person {
  id: number;
  name: string;
  gender: string;
  city: string;
  age: number;
  birthDate: string; // "YYYY-MM-DD" formatında tutuyoruz
}

/** Örnek veri */
const PEOPLE_DATA: Person[] = [
  { id: 1, name: "Ali", gender: "Male", city: "Istanbul", age: 30, birthDate: "1993-05-12" },
  { id: 2, name: "Ayşe", gender: "Female", city: "Ankara", age: 22, birthDate: "2001-01-06" },
  { id: 3, name: "Zeynep", gender: "Female", city: "Istanbul", age: 27, birthDate: "1996-02-20" },
  { id: 4, name: "Mehmet", gender: "Male", city: "Izmir", age: 35, birthDate: "1988-11-02" },
  { id: 5, name: "Burcu", gender: "Female", city: "Bursa", age: 29, birthDate: "1994-09-14" },
];

/** Kolon tanımları */
const columns: DataTableColumnDef<Person>[] = [
  // 1) ID
  {
    header: "ID",
    accessorKey: "id",
  },
  // 2) Name
  {
    header: "Name",
    accessorKey: "name",
    enableColumnFilter: true,
    customFilter: ({ filterValue, setFilterValue }) => (
      <Input
        placeholder="Search name..."
        value={String(filterValue ?? "")}
        onChange={(e) => setFilterValue(e.target.value)}
      />
    ),
  },
  // 3) Gender
  {
    header: "Gender",
    accessorKey: "gender",
    enableColumnFilter: true,
    customFilter: ({ filterValue, setFilterValue }) => (
      <Select
        value={String(filterValue ?? "all")}
        onValueChange={(val: any) => setFilterValue(val === "all" ? "" : val)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="All Genders" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="Male">Male</SelectItem>
          <SelectItem value="Female">Female</SelectItem>
        </SelectContent>
      </Select>
    ),
  },
  // 4) City
  {
    header: "City",
    accessorKey: "city",
    enableColumnFilter: true,
    customFilter: ({ filterValue, setFilterValue }) => (
      <Select
        value={String(filterValue ?? "all")}
        onValueChange={(val: any) => setFilterValue(val === "all" ? "" : val)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="All Cities" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="Istanbul">Istanbul</SelectItem>
          <SelectItem value="Ankara">Ankara</SelectItem>
          <SelectItem value="Izmir">Izmir</SelectItem>
          <SelectItem value="Bursa">Bursa</SelectItem>
        </SelectContent>
      </Select>
    ),
  },
  // 5) Age
  {
    header: "Age",
    accessorKey: "age",
    enableColumnFilter: true,
    customFilter: ({ filterValue, setFilterValue }) => (
      <Input
        type="number"
        placeholder="Filter by age..."
        value={String(filterValue ?? "")}
        onChange={(e) => setFilterValue(e.target.value)}
      />
    ),
  },
  // 6) Birth Date
  {
    header: "Birth Date",
    accessorKey: "birthDate",
    enableColumnFilter: true,
    customFilter: ({ filterValue, setFilterValue }) => (
      <Input
        type="date"
        placeholder="Filter by birth date..."
        value={String(filterValue ?? "")}
        onChange={(e) => setFilterValue(e.target.value)}
      />
    ),
  },
];

export default function CustomFilterVisibilityDataTableDemo() {
  return (
    <Card className="p-5">
      <Label className="font-bold text-lg mb-4">Custom Filter & Column Visibility</Label>
      <DataTable
        title="People List"
        data={PEOPLE_DATA}
        columns={columns}
        // Kolon görünürlüğü menüsünü aktif ediyoruz
        enableColumnVisibility
        // Paginasyon kapalı, basit kullanım
        paginator={false}
        noDataMessage="No matching records found"
      />
    </Card>
  );
}
