"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Button,
  PieSlice,
  DataTable,
  BadgeCard,
} from "xyz-comp";
import {
  ArrowDown,
  ArrowUp,
  CloudDownload,
  FileCheck,
  RefreshCw,
  ChartColumn,
  UsersRound,
  ChevronDown,
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import ReactECharts from "echarts-for-react";
import { useTheme } from "@/components/theme/theme-provider";

import Thumb7 from "../assets/images/thumb-7.jpg";
import Thumb11 from "../assets/images/thumb-11.jpg";
import Thumb12 from "../assets/images/thumb-12.jpg";
import Thumb14 from "../assets/images/thumb-14.jpg";
import Thumb17 from "../assets/images/thumb-17.jpg";

import Eileen from "../assets/avatars/Eileen.jpg";
import Ron from "../assets/avatars/Ron.jpg";
import Luke from "../assets/avatars/Luke.jpg";
import Joyce from "../assets/avatars/Joyce.jpg";
import Samantha from "../assets/avatars/Samantha.jpg";

import { useTranslation } from "react-i18next";

interface Product {
  name: string;
  avatar: string;
}
interface Order {
  id: string;
  product: Product;
  date: string;
  orderStatus: "Ready" | "Shipped";
  paymentStatus: "Paid" | "Pending";
  total: string;
}

export default function Sales() {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  console.log("config", theme);

  const categories = Array.from(
    { length: 7 },
    (_, i) => `${8 + i} ${t("sales.july")}`
  );

  const data = [45, 55, 35, 75, 40, 60, 50];

  const barOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      backgroundColor: "#fff",
      borderColor: "#ccc",
      borderWidth: 1,
      textStyle: { color: "#333", fontSize: 12 },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: categories,
      axisTick: { show: false },
      axisLine: { lineStyle: { color: "#ccc" } },
      axisLabel: { fontSize: 12 },
    },
    yAxis: {
      type: "value",
      axisTick: { show: false },
      axisLine: { lineStyle: { color: "#ccc" } },
      axisLabel: { fontSize: 12 },
      splitLine: { lineStyle: { type: "dashed" } },
    },
    series: [
      {
        name: t("sales.sessionDurations"),
        type: "bar",
        data,
        barWidth: "20%",
        itemStyle: {
          color: "#3E82F7",
          borderRadius: 0,
        },
        label: { show: false },
      },
    ],
  };

  const pieSlices: PieSlice[] = [
    { name: t("sales.categories.bags"), value: 2462, color: "#FFC107" },
    { name: t("sales.categories.devices"), value: 1443, color: "#04D182" },
    { name: t("sales.categories.cloths"), value: 3561, color: "#3E82F7" },
    { name: t("sales.categories.watches"), value: 3561, color: "#FA8C16" },
  ];

  const series = pieSlices.map((s) => s.value);
  const totalSales = series.reduce((a, b) => a + b, 0);

  const donutOption = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },
    color: pieSlices.map((s) => s.color),
    legend: {
      show: false,
    },
    graphic: [
      {
        type: "text",
        left: "center",
        top: "42%",
        style: {
          text: t("sales.categories.title"),
          textAlign: "center",
          fill: theme === "light" ? "#333" : "#fff",
          fontSize: 14,
          fontWeight: "bold",
        },
      },
      {
        type: "text",
        left: "center",
        top: "52%",
        style: {
          text: `${totalSales}`,
          textAlign: "center",
          fill: theme === "light" ? "#333" : "#fff",
          fontSize: 20,
          fontWeight: "bold",
        },
      },
    ],
    series: [
      {
        text: t("sales.categories.title"),
        type: "pie",
        radius: ["70%", "85%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: false,
          },
        },
        labelLine: {
          show: false,
        },
        data: pieSlices.map((s) => ({
          value: s.value,
          name: s.name,
          itemStyle: { color: s.color },
        })),
      },
    ],
  };

  const productDataByPeriod = () => ({
    "This Week": [
      {
        name: t("sales.products.Blue Jacket"),
        category: "cloths",
        sales: "5,930",
        increase: true,
        avatar: Thumb7,
      },
      {
        name: t("sales.products.White Sneaker"),
        category: "cloths",
        sales: "5,177",
        increase: true,
        avatar: Thumb12,
      },
      {
        name: t("sales.products.Red Beat Headphone"),
        category: "devices",
        sales: "4,701",
        increase: false,
        avatar: Thumb14,
      },
      {
        name: t("sales.products.Apple Watch"),
        category: "devices",
        sales: "2,833",
        increase: true,
        avatar: Thumb17,
      },
      {
        name: t("sales.products.Blue Backpack"),
        category: "bags",
        sales: "1,692",
        increase: false,
        avatar: Thumb11,
      },
    ],
    "This Month": [
      {
        name: t("sales.products.Blue Jacket"),
        category: "cloths",
        sales: "23,540",
        increase: true,
        avatar: Thumb7,
      },
      {
        name: t("sales.products.White Sneaker"),
        category: "cloths",
        sales: "18,210",
        increase: true,
        avatar: Thumb12,
      },
      {
        name: t("sales.products.Red Beat Headphone"),
        category: "devices",
        sales: "12,340",
        increase: true,
        avatar: Thumb14,
      },
      {
        name: t("sales.products.Apple Watch"),
        category: "devices",
        sales: "8,760",
        increase: false,
        avatar: Thumb17,
      },
      {
        name: t("sales.products.Blue Backpack"),
        category: "bags",
        sales: "5,120",
        increase: true,
        avatar: Thumb11,
      },
    ],
    "This Year": [
      {
        name: t("sales.products.Blue Jacket"),
        category: "cloths",
        sales: "142,300",
        increase: true,
        avatar: Thumb7,
      },
      {
        name: t("sales.products.White Sneaker"),
        category: "cloths",
        sales: "115,450",
        increase: true,
        avatar: Thumb12,
      },
      {
        name: t("sales.products.Red Beat Headphone"),
        category: "devices",
        sales: "98,700",
        increase: true,
        avatar: Thumb14,
      },
      {
        name: t("sales.products.Apple Watch"),
        category: "devices",
        sales: "65,230",
        increase: true,
        avatar: Thumb17,
      },
      {
        name: t("sales.products.Blue Backpack"),
        category: "bags",
        sales: "42,890",
        increase: false,
        avatar: Thumb11,
      },
    ],
  });

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
        avatar: Samantha,
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
  ];

  const orderColumns: ColumnDef<any>[] = [
    {
      header: t("sales.orders.id"),
      accessorKey: "id",
    },
    {
      id: "product",
      header: t("sales.orders.product"),
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
    {
      header: t("sales.orders.date"),
      accessorKey: "date",
    },
    {
      header: t("sales.orders.orderStatus"),
      accessorKey: "orderStatus",
      cell: ({ getValue }) => {
        const status = getValue<string>();
        const translatedStatus = t(
          `sales.orders.status.${status.toLowerCase()}`
        );

        const colorClasses =
          status === "Ready"
            ? "success"
            : status === "Shipped"
            ? "warning"
            : "error";

        return <BadgeCard status={colorClasses}>{translatedStatus}</BadgeCard>;
      },
    },
    {
      header: t("sales.orders.paymentStatus"),
      accessorKey: "paymentStatus",
      cell: ({ getValue }) => {
        const status = getValue<string>();
        const translatedStatus = t(
          `sales.orders.payment.${status.toLowerCase()}`
        );
        const color = status === "Paid" ? "#04D182" : "#FFC107";

        return (
          <p className="flex items-center text-sm gap-2 text-muted-foreground">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            {translatedStatus}
          </p>
        );
      },
    },
    {
      header: t("sales.orders.total"),
      accessorKey: "total",
      cell: ({ getValue }) => (
        <span className="font-semibold">{getValue<string>()}</span>
      ),
    },
  ];

  const paddedOrderColumns: ColumnDef<any>[] = orderColumns.map((col) => ({
    ...col,
    cell:
      col.cell ??
      (({ getValue }) => (
        <div className="p-3">{getValue<string | number>()}</div>
      )),
  }));

  const [productPeriod, setProdcutPeriod] = useState<
    "This Week" | "This Month" | "This Year"
  >("This Week");

  const productsToShow = productDataByPeriod()[productPeriod];

  const customerChartData = useMemo(
    () => ({
      "This Week": {
        categories: [
          t("sales.chart.days.mon"),
          t("sales.chart.days.tue"),
          t("sales.chart.days.wed"),
          t("sales.chart.days.thu"),
          t("sales.chart.days.fri"),
          t("sales.chart.days.sat"),
          t("sales.chart.days.sun"),
        ],
        series: [
          {
            name: t("sales.chart.storeCustomers"),
            data: [2000, 9200, 3800, 11000, 7500, 4500, 9800],
          },
          {
            name: t("sales.chart.onlineCustomers"),
            data: [2500, 4000, 6800, 4500, 2200, 7800, 8000],
          },
        ],
      },
      "This Month": {
        categories: [
          t("sales.chart.weeks.week1"),
          t("sales.chart.weeks.week2"),
          t("sales.chart.weeks.week3"),
          t("sales.chart.weeks.week4"),
        ],
        series: [
          {
            name: t("sales.chart.storeCustomers"),
            data: [32000, 35000, 34000, 37000],
          },
          {
            name: t("sales.chart.onlineCustomers"),
            data: [28000, 29000, 30000, 31000],
          },
        ],
      },
      "This Year": {
        categories: [
          t("sales.chart.months.jan"),
          t("sales.chart.months.feb"),
          t("sales.chart.months.mar"),
          t("sales.chart.months.apr"),
          t("sales.chart.months.may"),
          t("sales.chart.months.jun"),
          t("sales.chart.months.jul"),
          t("sales.chart.months.aug"),
          t("sales.chart.months.sep"),
          t("sales.chart.months.oct"),
          t("sales.chart.months.nov"),
          t("sales.chart.months.dec"),
        ],
        series: [
          {
            name: t("sales.chart.storeCustomers"),
            data: [
              45000, 48000, 47000, 50000, 52000, 55000, 58000, 60000, 62000,
              64000, 66000, 68000,
            ],
          },
          {
            name: t("sales.chart.onlineCustomers"),
            data: [
              40000, 42000, 43000, 45000, 47000, 49000, 51000, 53000, 55000,
              57000, 59000, 61000,
            ],
          },
        ],
      },
    }),
    [i18n.language]
  );

  const [customerPeriod, setCustomerPeriod] = useState<
    "This Week" | "This Month" | "This Year"
  >("This Week");

  const { categories: custCategories, series: custSeries } =
    customerChartData[customerPeriod];

  const getLineOption = (
    categories: string[],
    series: { name: string; data: number[] }[]
  ) => ({
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "line" },
      backgroundColor: "#fff",
      borderColor: "#ccc",
      borderWidth: 1,
      textStyle: { color: "#333", fontSize: 12 },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: categories,
      axisLine: { lineStyle: { color: "#ccc" } },
      axisTick: { show: false },
      axisLabel: { fontSize: 12, color: "#666" },
      splitLine: { show: false },
    },
    yAxis: {
      type: "value",
      axisLine: { lineStyle: { color: "#ccc" } },
      axisTick: { show: false },
      axisLabel: { fontSize: 12, color: "#666" },
      splitLine: {
        show: true,
        lineStyle: { color: "#ddd", type: "solid" },
      },
    },
    color: ["#17BCFF", "#3E82F7"],
    series: series.map((s) => ({
      name: s.name,
      type: "line",
      data: s.data,
      smooth: true,
      lineStyle: { width: 2 },
      showSymbol: false,
      emphasis: { focus: "series" },
    })),
  });

  const [storeTotal, onlineTotal] = custSeries.map((s) =>
    s.data.reduce((a, b) => a + b, 0)
  );

  const dateRange = t("sales.weeklyRevenue.dateRange", {
    start: "8 Jul",
    end: "15 Jul",
    year: "2020",
  });

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-12 gap-4">
        <Card className="lg:col-span-7 col-span-12 overflow-x-auto">
          <CardHeader className="flex-row justify-between items-center">
            <div>
              <CardTitle className="text-lg font-medium">
                {t("sales.weeklyRevenue.title")}
              </CardTitle>
              <CardDescription className="font-normal">
                {dateRange}
              </CardDescription>
            </div>
            <Button variant="outline">
              <CloudDownload /> {t("sales.weeklyRevenue.downloadReport")}
            </Button>
          </CardHeader>
          <CardContent className="flex">
            <div className="flex flex-col flex-1 mt-20 gap-4">
              <CardTitle className="text-3xl">$27,188.00</CardTitle>
              <p className="text-success text-sm flex items-center">
                <ArrowUp className="w-4 h-4" />{" "}
                {t("sales.weeklyRevenue.growth")}
              </p>
              <CardDescription>
                {t("sales.weeklyRevenue.description")}
              </CardDescription>
            </div>
            <div className="flex-[2]">
              <ReactECharts
                option={barOption}
                style={{ height: 200, width: "100%" }}
              />
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-5 col-span-12 grid grid-cols-12 gap-4">
          <Card className="col-span-6">
            <CardContent className="flex flex-col gap-2 mt-4 items-center justify-center">
              <FileCheck className="bg-success/10 text-success p-2 w-12 h-12 rounded-md mb-4" />
              <CardTitle>11,831</CardTitle>
              <CardDescription>{t("sales.dashboard.totalOrder")}</CardDescription>
            </CardContent>
          </Card>

          <Card className="col-span-6">
            <CardContent className="flex flex-col gap-2 mt-4 items-center justify-center">
              <RefreshCw className="bg-blue-100 text-blue-500 p-2 w-12 h-12 rounded-md mb-4" />
              <CardTitle>26.9%</CardTitle>
              <CardDescription>{t("sales.dashboard.conversionRate")}</CardDescription>
            </CardContent>
          </Card>

          <Card className="col-span-6">
            <CardContent className="flex flex-col gap-2 mt-4 items-center justify-center">
              <ChartColumn className="bg-warning/10 text-warning p-2 w-12 h-12 rounded-md mb-4" />
              <CardTitle>$6,922</CardTitle>
              <CardDescription>{t("sales.dashboard.totalProfit")}</CardDescription>
            </CardContent>
          </Card>

          <Card className="col-span-6">
            <CardContent className="flex flex-col gap-2 mt-4 items-center justify-center">
              <UsersRound className="bg-destructive/10 text-destructive p-2 w-12 h-12 rounded-md mb-4" />
              <CardTitle>873</CardTitle>
              <CardDescription>{t("sales.dashboard.dailyVisitors")}</CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <Card className="xl:col-span-4 lg:col-span-6 col-span-12">
          <CardHeader className="flex !flex-row justify-between items-center">
            <CardTitle className="text-base">{t("sales.topProduct")}</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs">
                  {t(`sales.period.${productPeriod}`)}{" "}
                  <ChevronDown className="ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onSelect={() => setProdcutPeriod("This Week")}
                >
                  {t("sales.period.This Week")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setProdcutPeriod("This Month")}
                >
                  {t("sales.period.This Month")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setProdcutPeriod("This Year")}
                >
                  {t("sales.period.This Year")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {productsToShow.map((product) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.avatar}
                      alt={product.name}
                      className="w-10 h-10 object-contain rounded-sm"
                    />
                    <div>
                      <p className="text-sm font-semibold">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {t(`sales.categories.${product.category}`)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm text-muted-foreground">
                      {t("sales.sales")}
                    </p>
                    <p className="text-sm font-bold flex items-center">
                      ${product.sales}{" "}
                      {product.increase ? (
                        <ArrowUp className="w-4 h-4 text-success" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-destructive" />
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="xl:col-span-4 lg:col-span-6 col-span-12">
          <CardContent className="p-6">
            <ReactECharts
              option={donutOption}
              style={{ height: "250%", width: "100%" }}
            />

            <div className="space-y-4 mt-8">
              {pieSlices.map((slice) => (
                <div
                  key={slice.name}
                  className="flex justify-between px-24 mx-4"
                >
                  <BadgeCard variant="dot" dotBackgroundHex={slice.color}>
                    {slice.name}
                  </BadgeCard>

                  <p className="text-sm font-medium">{slice.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="xl:col-span-4 lg:col-span-6 col-span-12">
          <CardHeader className="flex !flex-row justify-between items-center">
            <CardTitle className="text-base">
              {t("sales.chart.title.customers")}
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs">
                  {t(`sales.chart.period.${customerPeriod}`)}
                  <ChevronDown className="ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {(["This Week", "This Month", "This Year"] as const).map(
                  (p) => (
                    <DropdownMenuItem
                      key={p}
                      onSelect={() => setCustomerPeriod(p)}
                    >
                      {t(`sales.chart.period.${p}`)}
                    </DropdownMenuItem>
                  )
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col md:flex-row gap-8 mb-4">
              <div className="flex flex-col gap-2">
                <p className="text-2xl font-bold">
                  {storeTotal.toLocaleString()}
                </p>

                <BadgeCard variant="dot" dotBackgroundHex="#17BCFF">
                  {t("sales.chart.storeCustomers")}
                </BadgeCard>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-2xl font-bold">
                  {onlineTotal.toLocaleString()}
                </p>

                <BadgeCard variant="dot" dotBackgroundHex="#3E82F7">
                  {t("sales.chart.onlineCustomers")}
                </BadgeCard>
              </div>
            </div>

            <ReactECharts
              option={getLineOption(custCategories, custSeries)}
              style={{ height: 250, width: "100%" }}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-base">{t("sales.orders.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={orderData}
            columns={paddedOrderColumns}
            header
            paginator={false}
            selectionMode="none"
          />
        </CardContent>
      </Card>
    </div>
  );
}
