import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  Ellipsis,
  Plus,
  Ban,
  UserRoundPlus,
  RotateCcw,
  Printer,
  FilePlus,
} from "lucide-react";
import {
  DataTable,
  Label,
  LineSeries,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Avatar,
  Progress,
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  BadgeCard,
} from "xyz-comp";
import Terrance from "../assets/avatars/Terrance.jpg";
import Ron from "../assets/avatars/Ron.jpg";
import Luke from "../assets/avatars/Luke.jpg";
import Joyce from "../assets/avatars/Joyce.jpg";
import Samantha from "../assets/avatars/Samantha.jpg";
import { useTranslation } from "react-i18next";
import ReactECharts from "echarts-for-react";

export default function Dashboard() {
  const { t } = useTranslation();

  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const dates = Array.from(
    { length: 12 },
    (_, i) => `${i + 1} ${t("dashboard.jan")}`
  );

  const lineSeries: LineSeries[] = [
    {
      name: t("dashboard.sessionDurations"),
      data: [46, 52, 38, 24, 33, 26, 21, 20, 6, 8, 16, 10],
      color: "#3E82F7",
    },
    {
      name: t("dashboard.pageViews"),
      data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
      color: "#04D182",
    },
  ];

  const uniqueVisitorsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
      },
    },
    xAxis: {
      type: "category",
      data: dates,
      axisLabel: {
        rotate: -45,
      },
    },
    yAxis: {
      type: "value",
    },
    grid: {
      show: false,
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    legend: {
      show: false,
    },
    color: lineSeries.map((l) => l.color || "#3E82F7"),
    series: lineSeries.map((l) => ({
      name: l.name,
      type: "line",
      data: l.data,
      smooth: true,
      lineStyle: {
        width: 3,
      },
      symbol: "circle",
      symbolSize: 6,
    })),
  };

  const memberData: LineSeries[] = [
    {
      name: t("dashboard.members"),
      data: [26, 16, 41, 26, 44, 12, 36, 19, 64],
      color: "#04D182",
    },
  ];

  const memberOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
        lineStyle: {
          color: "#999",
          width: 1,
          type: "solid",
        },
      },
    },
    xAxis: {
      type: "category",
      data: numbers,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: { show: false },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: { show: false },
    },
    grid: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
      containLabel: false,
    },
    legend: {
      show: false,
    },
    color: memberData.map((m) => m.color || "#04D182"),
    series: memberData.map((m) => ({
      name: m.name,
      type: "line",
      data: m.data,
      smooth: true,
      lineStyle: {
        width: 3,
      },
      symbol: "none",
    })),
  };

  const teamData = [
    {
      name: "Terrance Moreno",
      title: t("dashboard.softwareEngineer"),
      avatar: Terrance,
    },
    {
      name: "Ron Vargas",
      title: t("dashboard.uiuxDesigner"),
      avatar: Ron,
    },
    {
      name: "Luke Cook",
      title: t("dashboard.hrExecutive"),
      avatar: Luke,
    },
    {
      name: "Joyce Freeman",
      title: t("dashboard.frontendDeveloper"),
      avatar: Joyce,
    },
    {
      name: "Samantha Phillips",
      title: t("dashboard.complianceManager"),
      avatar: Samantha,
    },
  ];
  interface Customer {
    id: string;
    initials: string;
    name: string;
    date: string;
    amount: string;
    status: string;
  }

  const customerData: Customer[] = [
    {
      id: "1",
      initials: "CB",
      name: "Clayton Bates",
      date: "8 May 2020",
      amount: "$137.00",
      status: t("dashboard.approved"),
    },
    {
      id: "2",
      initials: "GF",
      name: "Gabriel Frazier",
      date: "6 May 2020",
      amount: "$322.00",
      status: t("dashboard.approved"),
    },
    {
      id: "3",
      initials: "DH",
      name: "Debra Hamilton",
      date: "1 May 2020",
      amount: "$543.00",
      status: t("dashboard.pending"),
    },
    {
      id: "4",
      initials: "SW",
      name: "Stacey Ward",
      date: "28 April 2020",
      amount: "$876.00",
      status: t("dashboard.rejected"),
    },
    {
      id: "5",
      initials: "TA",
      name: "Troy Alexander",
      date: "28 April 2020",
      amount: "$241.00",
      status: t("dashboard.approved"),
    },
  ];

  const customerColumns: ColumnDef<Customer>[] = [
    {
      accessorKey: "name",
      header: t("dashboard.customer"),
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <Avatar size="sm" variant="rounded" name={row.getValue("name")} />
          <div>
            <p className="text-sm font-medium">{row.getValue("name")}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "date",
      header: t("dashboard.date"),
      cell: ({ row }) => (
        <p className="text-xs text-muted-foreground">{row.getValue("date")}</p>
      ),
    },
    {
      accessorKey: "amount",
      header: t("dashboard.amount"),
    },
    {
      accessorKey: "status",
      header: t("dashboard.status"),
      cell: ({ getValue }) => {
        const rawStatus = getValue<string>();
        const colorClasses =
          rawStatus === t("dashboard.approved")
            ? "success"
            : rawStatus === t("dashboard.pending")
            ? "pending"
            : "error";

        return <BadgeCard status={colorClasses}>{rawStatus}</BadgeCard>;
      },
    },
  ];

  const days = [
    t("dashboard.sunday"),
    t("dashboard.monday"),
    t("dashboard.tuesday"),
    t("dashboard.wednesday"),
    t("dashboard.thursday"),
    t("dashboard.friday"),
    t("dashboard.saturday"),
  ];

  const hours = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
  ];

  const data: [number, number, number][] = [];
  for (let d = 0; d < days.length; d++) {
    for (let h = 0; h < hours.length; h++) {
      const value = Math.floor(Math.random() * 11);
      data.push([h, d, value]);
    }
  }

  const progressTexts = {
    error: t(""),
    complete: t(""),
    loading: t(""),
  };

  return (
    <div className="space-y-5 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {t("dashboard.revenue")}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <Label className="text-3xl font-bold flex items-center gap-1">
                  $2,454
                  <span className="text-base text-destructive flex items-center gap-1 ml-3">
                    -11.4
                    <ArrowDown className="w-5 h-5" />
                  </span>
                </Label>
              </div>
              <CardDescription>
                {t("dashboard.compareToLastYear", { year: 2019 })}
              </CardDescription>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("dashboard.sales")}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <Label className="text-3xl font-bold flex items-center gap-1">
                  $6,982
                  <span className="text-base text-success flex items-center gap-1 ml-3">
                    8.2
                    <ArrowUp className="w-5 h-5" />
                  </span>
                </Label>
              </div>
              <CardDescription>
                {t("dashboard.compareToLastYear", { year: 2019 })}
              </CardDescription>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("dashboard.costs")}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <Label className="text-3xl font-bold flex items-center gap-1">
                  $8,310
                  <span className="text-base text-success flex items-center ml-3">
                    0.7
                    <ArrowUp className="w-5 h-5" />
                  </span>
                </Label>
              </div>
              <CardDescription>
                {t("dashboard.compareToLastYear", { year: 2019 })}
              </CardDescription>
            </div>
          </CardContent>
        </Card>

        <Card className="md:row-span-2">
          <CardHeader className="flex items-center">
            <CardTitle className="text-base">
              {t("dashboard.monthlyTarget")}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="w-[200px] h-[200px]">
              <Progress value={87} variant="circle" texts={progressTexts} />
            </div>
            <CardDescription className="text-center">
              {t("dashboard.monthlyTargetDescription")}
            </CardDescription>
            <Button>{t("dashboard.learnMore")}</Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 md:row-span-2">
          <CardHeader>
            <CardTitle className="text-base">
              {t("dashboard.uniqueVisitors")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-64 md:h-[450px]">
              <ReactECharts
                option={uniqueVisitorsOption}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <ReactECharts
              option={memberOption}
              style={{ width: "100%", height: "200%" }}
            />
            <div className="flex flex-col gap-2 mt-3">
              <div className="flex items-center">
                <Label className="text-3xl font-bold flex items-center gap-1">
                  $8,310
                  <span className="text-base text-success flex items-center ml-3">
                    3.7
                    <ArrowUp className="w-5 h-5" />
                  </span>
                </Label>
              </div>
              <CardDescription>{t("dashboard.activeMembers")}</CardDescription>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <Card className="w-full lg:w-1/4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">
              {t("dashboard.newJoinMember")}
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <Ellipsis />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuCheckboxItem className="!m-0 !p-2">
                  <span className="mr-2">
                    <Plus className="w-4 h-4" />
                  </span>
                  {t("dashboard.addAll")}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="!m-0 !p-2">
                  <span className="mr-2">
                    <Ban className="w-4 h-4" />
                  </span>
                  {t("dashboard.disableAll")}
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>

          <CardContent>
            <div className="space-y-8">
              {teamData.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <Avatar
                      name={member.name}
                      src={member.avatar}
                      size="sm"
                      variant="rounded"
                    />
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {member.title}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-muted-foreground border-muted-foreground/10 hover:border-primary hover:text-primary transition-colors duration-300"
                  >
                    <span>
                      <UserRoundPlus />
                    </span>
                    {t("dashboard.add")}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="w-full lg:w-3/4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">
              {t("dashboard.latestTransactions")}
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <Ellipsis />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuCheckboxItem className="!m-0 !p-2">
                  <span className="mr-2">
                    <RotateCcw className="w-4 h-4" />
                  </span>
                  {t("dashboard.refresh")}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="!m-0 !p-2">
                  <span className="mr-2">
                    <Printer className="w-4 h-4" />
                  </span>
                  {t("dashboard.print")}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="!m-0 !p-2">
                  <span className="mr-2">
                    <FilePlus className="w-4 h-4" />
                  </span>
                  {t("dashboard.export")}
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>

          <CardContent>
            <DataTable
              data={customerData}
              columns={customerColumns}
              header
              paginator={false}
              selectionMode="none"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
