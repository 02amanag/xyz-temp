import React from "react";
import {
  DataTable,
  Card,
  DropdownMenu,
  DropdownMenuTrigger,
  Button,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  BadgeCard,
} from "xyz-comp";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical, Eye, PlusCircle } from "lucide-react";
import Eileen from "../assets/avatars/Eileen.jpg";
import Terrance from "../assets/avatars/Terrance.jpg";
import Ron from "../assets/avatars/Ron.jpg";
import Luke from "../assets/avatars/Luke.jpg";
import Joyce from "../assets/avatars/Joyce.jpg";
import Samantha from "../assets/avatars/Samantha.jpg";
import Tara from "../assets/avatars/Tara.jpg";
import Frederick from "../assets/avatars/Frederick.jpg";
import Carolyn from "../assets/avatars/Carolyn.jpg";
import Brittany from "../assets/avatars/Brittany.jpg";
import Lloyd from "../assets/avatars/Lloyd.jpg";
import Gabriella from "../assets/avatars/Gabriella.jpg";

import { useTranslation } from "react-i18next";

interface Order {
  id: string;
  product: {
    name: string;
    avatar: string;
  };
  date: string;
  orderStatus: "Ready" | "Shipped";
  paymentStatus: "Paid" | "Pending" | "Expired";
  total: string;
}

const orderData: Order[] = [
  {
    id: "#5331",
    product: {
      name: "Eileen Horton",
      avatar: Eileen,
    },
    date: "11-11-2019",
    orderStatus: "Ready",
    paymentStatus: "Paid",
    total: "$677.00",
  },
  {
    id: "#5328",
    product: {
      name: "Terrance Moreno",
      avatar: Terrance,
    },
    date: "30-10-2019",
    orderStatus: "Ready",
    paymentStatus: "Paid",
    total: "$1,328.35",
  },
  {
    id: "#5321",
    product: {
      name: "Ron Vargas",
      avatar: Ron,
    },
    date: "05-07-2020",
    orderStatus: "Shipped",
    paymentStatus: "Paid",
    total: "$629.00",
  },
  {
    id: "#5287",
    product: {
      name: "Luke Cook",
      avatar: Luke,
    },
    date: "16-01-2020",
    orderStatus: "Shipped",
    paymentStatus: "Paid",
    total: "$25.90",
  },
  {
    id: "#5351",
    product: {
      name: "Joyce Freeman",
      avatar: Joyce,
    },
    date: "04-06-2020",
    orderStatus: "Ready",
    paymentStatus: "Pending",
    total: "$817.50",
  },
  {
    id: "#5285",
    product: {
      name: "Samantha Phillips",
      avatar: Samantha,
    },
    date: "06-06-2020",
    orderStatus: "Shipped",
    paymentStatus: "Paid",
    total: "$47.90",
  },
  {
    id: "#5290",
    product: {
      name: "Tara Fletcher",
      avatar: Tara,
    },
    date: "06-06-2020",
    orderStatus: "Ready",
    paymentStatus: "Pending",
    total: "$300.00",
  },
  {
    id: "#5337",
    product: {
      name: "Frederick Adams",
      avatar: Frederick,
    },
    date: "16-05-2020",
    orderStatus: "Ready",
    paymentStatus: "Expired",
    total: "$730.00",
  },
  {
    id: "#5297",
    product: {
      name: "Carolyn Hanson",
      avatar: Carolyn,
    },
    date: "26-05-2020",
    orderStatus: "Shipped",
    paymentStatus: "Paid",
    total: "$827.00",
  },
  {
    id: "#5298",
    product: {
      name: "Brittany Hale",
      avatar: Brittany,
    },
    date: "24-05-2020",
    orderStatus: "Shipped",
    paymentStatus: "Paid",
    total: "$1,866.00",
  },
  {
    id: "#5301",
    product: {
      name: "Lloyd Obrien",
      avatar: Lloyd,
    },
    date: "30-06-2020",
    orderStatus: "Shipped",
    paymentStatus: "Paid",
    total: "$269.00",
  },
  {
    id: "#5304",
    product: {
      name: "Gabriella May",
      avatar: Gabriella,
    },
    date: "01-07-2020",
    orderStatus: "Shipped",
    paymentStatus: "Paid",
    total: "$180.00",
  },
];

export default function OrdersTable() {
  const { t } = useTranslation();

  const orderColumns: ColumnDef<Order>[] = [
    { header: t("ordersTable.columns.id"), accessorKey: "id" },
    {
      id: "product",
      header: t("ordersTable.columns.product"),
      cell: ({ row }) => {
        const { name, avatar } = row.original.product;
        return (
          <div className="flex items-center gap-2">
            <img
              src={avatar}
              alt={name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-sm font-medium">{name}</span>
          </div>
        );
      },
    },
    { header: t("ordersTable.columns.date"), accessorKey: "date" },
    {
      header: t("ordersTable.columns.orderStatus"),
      accessorKey: "orderStatus",
      cell: ({ getValue }) => {
        const status = getValue<string>();
        const badgeStatus = status === "Ready" ? "success" : "warning";

        // Durumları da çevirmek istersen:
        const statusText = t(
          `ordersTable.status.order.${status.toLowerCase()}`
        );

        return <BadgeCard status={badgeStatus}>{statusText}</BadgeCard>;
      },
    },
    {
      header: t("ordersTable.columns.paymentStatus"),
      accessorKey: "paymentStatus",
      cell: ({ getValue }) => {
        const status = getValue<string>();
        const color =
          status === "Paid"
            ? "success"
            : status === "Pending"
            ? "warning"
            : "error";

        const statusText = t(
          `ordersTable.status.payment.${status.toLowerCase()}`
        );

        return (
          <p className="flex items-center text-sm gap-2 text-muted-foreground">
            <BadgeCard status={color} variant="dot">
              {statusText}
            </BadgeCard>
          </p>
        );
      },
    },
    {
      header: t("ordersTable.columns.total"),
      accessorKey: "total",
      cell: ({ getValue }) => (
        <span className="font-semibold">{getValue<string>()}</span>
      ),
    },
    {
      id: "actions",
      header: t("ordersTable.columns.actions"),
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem className="!m-0 !p-2">
              <span className="mr-2">
                <Eye className="w-4 h-4" />
              </span>
              {t("ordersTable.actions.viewDetails")}
            </DropdownMenuCheckboxItem>

            <DropdownMenuCheckboxItem className="!m-0 !p-2 border-t">
              <span className="mr-2">
                <PlusCircle className="w-4 h-4" />
              </span>
              {t("ordersTable.actions.addToBookmark")}
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const paddedOrderColumns = orderColumns.map((col) => ({
    ...col,
    cell:
      col.cell ??
      (({ getValue }) => (
        <div className="p-3">{getValue<string | number>()}</div>
      )),
  }));

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <DataTable
          data={orderData}
          columns={paddedOrderColumns}
          title={t("ordersTable.title")}
          header
          paginator={false}
          selectionMode="none"
          enableGlobalFilter
          enableColumnVisibility
          enableColumnResizing
          columnResizeMode="onChange"
          enableExport
          enablePrint
        />
      </Card>
    </div>
  );
}
