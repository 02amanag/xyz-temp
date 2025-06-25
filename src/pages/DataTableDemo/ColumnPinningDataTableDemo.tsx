/**
 * ColumnPinningDataTableDemo.tsx
 * Developed by Docuart Bilgi Teknolojileri
 *
 * Bu sayfada, DataTable bileşeninde kolon pinleme (sabitleme) özelliğini gösteriyoruz.
 * "enablePinning" prop'u ve kolon düzeyinde "enablePinning: true" ayarlarıyla,
 * kullanıcı kolonları sol veya sağ kenara sürükleyip sabitleyebilir.
 * Ayrıca daha fazla kolon ekleyerek yatay scroll oluşmasını sağlıyoruz.
 */

import { useState } from "react";
import { DataTable, DataTableColumnDef } from "xyz-comp";
import { Card } from "xyz-comp";
import { Button } from "xyz-comp";
import { ColumnPinningState } from "@tanstack/react-table";

// Örnek veri tipi
interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    phone: string;
    city: string;
    department: string;
    status: string;
}

// Örnek veri (daha geniş)
const data: User[] = [
    {
        id: 1,
        name: "Ali",
        email: "ali@example.com",
        role: "Admin",
        phone: "555-123-4567",
        city: "Istanbul",
        department: "IT",
        status: "Active"
    },
    {
        id: 2,
        name: "Ayşe",
        email: "ayse@example.com",
        role: "Editor",
        phone: "555-987-6543",
        city: "Ankara",
        department: "Marketing",
        status: "Active"
    },
    {
        id: 3,
        name: "Mehmet",
        email: "mehmet@example.com",
        role: "User",
        phone: "555-246-8101",
        city: "Bursa",
        department: "Sales",
        status: "Inactive"
    },
    {
        id: 4,
        name: "Zeynep",
        email: "zey@example.com",
        role: "User",
        phone: "555-999-8888",
        city: "Izmir",
        department: "Support",
        status: "Active"
    },
    {
        id: 5,
        name: "Cem",
        email: "cem@example.com",
        role: "Admin",
        phone: "555-222-3333",
        city: "Antalya",
        department: "IT",
        status: "Active"
    }
];

// Kolon tanımları
const columns: DataTableColumnDef<User>[] = [
    {
        header: "ID",
        accessorKey: "id",
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
        header: "Phone",
        accessorKey: "phone",
    },
    {
        header: "City",
        accessorKey: "city",
    },
    {
        header: "Department",
        accessorKey: "department",
    },
    {
        header: "Status",
        accessorKey: "status",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <Button size="sm" variant="outline">
                    {user.role === "Admin" ? "Revoke Admin" : "Make Admin"}
                </Button>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <Button size="sm" variant="outline">
                    {user.role === "Admin" ? "Revoke Admin" : "Make Admin"}
                </Button>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <Button size="sm" variant="outline">
                    {user.role === "Admin" ? "Revoke Admin" : "Make Admin"}
                </Button>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <Button size="sm" variant="outline">
                    {user.role === "Admin" ? "Revoke Admin" : "Make Admin"}
                </Button>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <Button size="sm" variant="outline">
                    {user.role === "Admin" ? "Revoke Admin" : "Make Admin"}
                </Button>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <Button size="sm" variant="outline">
                    {user.role === "Admin" ? "Revoke Admin" : "Make Admin"}
                </Button>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <Button size="sm" variant="outline">
                    {user.role === "Admin" ? "Revoke Admin" : "Make Admin"}
                </Button>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <Button size="sm" variant="outline">
                    {user.role === "Admin" ? "Revoke Admin" : "Make Admin"}
                </Button>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <Button size="sm" variant="outline">
                    {user.role === "Admin" ? "Revoke Admin" : "Make Admin"}
                </Button>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <Button size="sm" variant="outline">
                    {user.role === "Admin" ? "Revoke Admin" : "Make Admin"}
                </Button>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <Button size="sm" variant="outline">
                    {user.role === "Admin" ? "Revoke Admin" : "Make Admin"}
                </Button>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <Button size="sm" variant="outline">
                    {user.role === "Admin" ? "Revoke Admin" : "Make Admin"}
                </Button>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <Button size="sm" variant="outline">
                    {user.role === "Admin" ? "Revoke Admin" : "Make Admin"}
                </Button>
            );
        },
    }
];


export default function ColumnPinningDataTableDemo() {
    const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
        left: ["name", "email"],
        right: [],
    });

    return (
        <Card className="p-5 space-y-4">
            {/* "max-w-full overflow-x-auto" gibi stillerle 
                yatay kaydırma (horizontal scroll) sağlanabilir. 
                Aynı şekilde DataTable'da scrollHeight vb. de kullanabilirsiniz. 
            */}

            <DataTable<User>
                title="Column Pinning Demo"
                data={data}
                columns={columns}
                // enablePinning -> kolonları sabitlemeyi aktif eder
                enablePinning
                onColumnPinningChange={(newPinning) => {
                    setColumnPinning(newPinning);
                }}
                pinningState={columnPinning}
                paginator={false}
                noDataMessage="No users found"
            />
        </Card>
    );
}
