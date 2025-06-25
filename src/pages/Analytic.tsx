"use client";

import { useMemo, useState, memo } from "react";
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
  BadgeCard,
} from "xyz-comp";
import { ArrowDown, ArrowUp, ChevronDown } from "lucide-react";
import usa from "../assets/us.svg";
import facebook from "../assets/social/facebook.png";
import twitter from "../assets/social/twitter.png";
import youtube from "../assets/social/youtube.png";
import linkedin from "../assets/social/linkedin.png";
import dribbble from "../assets/social/dribbble.png";
import ReactECharts from "echarts-for-react";
import WorldMap, { MapData } from "@/components/ui/WorldMap";
import { useTheme } from "@/components/theme/theme-provider";
import { useTranslation } from "react-i18next";

const MemoWorldMap = memo(WorldMap);

const getMiniLineOption = (data: number[], color: string) => ({
  xAxis: {
    type: "category",
    show: false,
    data: data.map((_, i) => i),
  },
  yAxis: {
    type: "value",
    show: false,
  },
  grid: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "line",
    },
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    textStyle: {
      color: "#333",
      fontSize: 11,
    },
  },
  series: [
    {
      data,
      type: "line",
      smooth: true,
      showSymbol: false,
      lineStyle: {
        width: 2,
        color,
      },
      areaStyle: {
        opacity: 0,
      },
    },
  ],
});

export default function Analytic() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<MapData | null>(null);
  const { theme } = useTheme();

  const pieSlices: PieSlice[] = [
    { name: t("analytic.desktops"), value: 3561, color: "#FFC107" },
    { name: t("analytic.tablets"), value: 1443, color: "#04D182" },
    { name: t("analytic.mobiles"), value: 2462, color: "#3E82F7" },
  ];

  const pieSeries = pieSlices.map((s) => s.value);
  const totalValue = pieSeries.reduce((a, b) => a + b, 0);

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
          text: t("analytic.sessionsDevice"),
          textAlign: "center",
          fill: theme === "light" ? "#333" : "#fff",
          fontSize: 14,
          fontWeight: 600,
        },
      },
      {
        type: "text",
        left: "center",
        top: "52%",
        style: {
          text: `${totalValue}`,
          textAlign: "center",
          fill: theme === "light" ? "#333" : "#fff",
          fontSize: 20,
          fontWeight: "bold",
        },
      },
    ],
    series: [
      {
        name: t("analytic.sessionsDevice"),
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

  const stats = useMemo<MapData[]>(
    () => [
      { name: "United States of America", value: 120 },
      { name: "Brazil", value: 95 },
      { name: "India", value: 80 },
      { name: "China", value: 130 },
      { name: "Australia", value: 10 },
      { name: "Canada", value: 80 },
      { name: "Russia", value: 80 },
    ],
    []
  );

  const mostVisitedPages = useMemo(
    () => [
      { name: t("analytic.home"), title: "/app/home/", visits: 7616 },
      { name: t("analytic.resources"), title: "/app/resources/", visits: 6923 },
      {
        name: t("analytic.integrations"),
        title: "/integrations/paypal/",
        visits: 5228,
      },
      {
        name: t("analytic.partners"),
        title: "/partners/our-partners/",
        visits: 3512,
      },
      {
        name: t("analytic.developers"),
        title: "/developers/docs/",
        visits: 1707,
      },
    ],
    [t]
  );

  const socialMediaReferrals = useMemo(
    () => [
      {
        name: "Facebook",
        total: 322,
        change: 30.1,
        avatar: facebook,
        trendData: [12, 152, 22, 88, 236, 250, 230],
      },
      {
        name: "Twitter",
        total: 217,
        change: 21.6,
        avatar: twitter,
        trendData: [8, 12, 10, 18, 15, 20, 17],
      },
      {
        name: "YouTube",
        total: 188,
        change: -7.1,
        avatar: youtube,
        trendData: [20, 18, 15, 13, 10, 8, 5],
      },
      {
        name: "LinkedIn",
        total: 207,
        change: 11.9,
        avatar: linkedin,
        trendData: [10, 14, 12, 16, 14, 18, 17],
      },
      {
        name: "Dribbble",
        total: 86,
        change: -28.5,
        avatar: dribbble,
        trendData: [15, 13, 12, 10, 8, 7, 5],
      },
    ],
    []
  );

  const countryData = useMemo(
    () => [
      {
        name: t("analytic.unitedStatesOfAmerica"),
        percentage: 37.61,
        color: "#4f46e5",
      },
      { name: t("analytic.brazil"), percentage: 16.79, color: "#16a34a" },
      { name: t("analytic.india"), percentage: 12.42, color: "#f59e0b" },
      { name: t("analytic.china"), percentage: 9.85, color: "#dc2626" },
      { name: t("analytic.malaysia"), percentage: 7.68, color: "#0ea5e9" },
      { name: t("analytic.thailand"), percentage: 5.11, color: "#8b5cf6" },
    ],
    [t]
  );

  const chartData = useMemo(() => {
    const dayCategories = ["12am", "6am", "12pm", "6pm"].map((value) => {
      const key = value.toLowerCase().replace(/[:\s]/g, "");
      return t(`analytic.timeLabels.${key}`);
    });

    const weekCategories = [
      "1 Jan",
      "2 Jan",
      "3 Jan",
      "4 Jan",
      "5 Jan",
      "6 Jan",
      "7 Jan",
    ].map((date) => {
      const [day, monthAbbr] = date.split(" ");
      const translatedMonth = t(`analytic.${monthAbbr.toLowerCase()}`);
      return `${day} ${translatedMonth}`;
    });

    const monthCategories = Array.from({ length: 10 }, (_, i) => {
      const day = 3 + i * 3;
      const translatedMonth = t(`analytic.jan`);
      return `${day} ${translatedMonth}`;
    });

    return {
      Day: {
        categories: dayCategories,
        series: [
          {
            name: t("analytic.uniqueVisitors"),
            data: [120, 300, 240, 360],
          },
          {
            name: t("analytic.sessionDurations"),
            data: [100, 280, 200, 330],
          },
        ],
      },
      Week: {
        categories: weekCategories,
        series: [
          {
            name: t("analytic.uniqueVisitors"),
            data: [50, 60, 40, 80, 30, 70, 65],
          },
          {
            name: t("analytic.sessionDurations"),
            data: [45, 55, 35, 75, 40, 60, 50],
          },
        ],
      },
      Month: {
        categories: monthCategories,
        series: [
          {
            name: t("analytic.uniqueVisitors"),
            data: Array.from({ length: 10 }, () =>
              Math.floor(20 + Math.random() * 100)
            ),
          },
          {
            name: t("analytic.sessionDurations"),
            data: Array.from({ length: 10 }, () =>
              Math.floor(15 + Math.random() * 80)
            ),
          },
        ],
      },
    };
  }, [t]);

  const [period, setPeriod] = useState<"Day" | "Week" | "Month">("Week");
  const { categories, series } = chartData[period];

  const getBarOption = (
    categories: string[],
    series: { name: string; data: number[] }[]
  ) => ({
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    legend: { show: false },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
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
    color: ["#04D182", "#3E82F7"],
    series: series.map((s) => ({
      name: s.name,
      type: "bar",
      data: s.data,
      barWidth: "30%",
      itemStyle: {
        borderRadius: 0,
      },
      label: { show: false },
    })),
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="w-full md:flex-[3]">
          <CardContent className="flex flex-col md:flex-row h-full !py-0">
            <div className="flex-[2] md:border-r md:pr-4 h-full">
              <CardTitle className="py-4 mb-6">
                {t("analytic.entranceByRegion")}
              </CardTitle>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full overflow-hidden">
                  <img
                    src={usa}
                    alt="US Flag"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-extrabold text-xl">37.61%</p>
              </div>
              <CardDescription className="mb-6">
                {t("analytic.topEntranceRegion")}{" "}
              </CardDescription>
              {countryData.map(({ name, percentage, color }) => (
                <div key={name} className="flex justify-between gap-4 mb-6">
                  <BadgeCard variant="dot" dotBackgroundHex={color}>
                    {" "}
                    {name}
                  </BadgeCard>
                  <p className="text-sm font-medium">{percentage}%</p>
                </div>
              ))}
            </div>
            <div className="w-full md:flex-[5]">
              <MemoWorldMap
                data={stats}
                selectedName={selected?.name}
                areaColor="#16a34a"
                onSelect={setSelected}
                height={420}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="w-full md:flex-1">
          <CardContent className="p-6">
            <ReactECharts
              option={donutOption}
              style={{ height: "250%", width: "100%" }}
            />

            <div className="mt-6 space-y-4">
              {pieSlices.map((slice) => (
                <div key={slice.name} className="flex justify-between px-20">
                  <BadgeCard variant="dot" dotBackgroundHex={slice.color}>
                    {slice.name}
                  </BadgeCard>
                  <p className="text-sm font-medium">{slice.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Card className="w-full md:flex-1">
          <CardHeader>
            <CardTitle className="text-lg">
              {t("analytic.mostVisitedPages")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mostVisitedPages.map((page, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between py-2 ${
                    idx !== mostVisitedPages.length - 1 ? "border-b" : ""
                  }`}
                >
                  <div>
                    <p className="text-md font-bold">{page.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {page.title}
                    </p>
                  </div>
                  <BadgeCard status={"pending"}>
                    {page.visits.toLocaleString()}
                  </BadgeCard>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="w-full md:flex-1">
          <CardHeader>
            <CardTitle className="text-lg">
              {t("analytic.socialMediaReferrals")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {socialMediaReferrals.map((platform) => {
                const lineColor = platform.change >= 0 ? "#04D182" : "#DC2626";
                return (
                  <div
                    key={platform.name}
                    className={`flex items-center justify-between ${
                      platform.name !==
                      socialMediaReferrals[socialMediaReferrals.length - 1].name
                        ? "border-b"
                        : ""
                    } py-2`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={platform.avatar}
                        alt={platform.name}
                        className="w-8 h-8 object-contain !bg-transparent"
                      />
                      <div>
                        <p className="text-md font-bold">{platform.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {t("analytic.total")}:
                          <span className="font-semibold">
                            {platform.total}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <ReactECharts
                        option={getMiniLineOption(
                          platform.trendData,
                          lineColor
                        )}
                        style={{ height: 25, width: 60 }}
                      />
                      <p className="text-sm font-bold flex items-center gap-1 ml-2">
                        {platform.change}%
                        {platform.change >= 0 ? (
                          <ArrowUp className="w-4 h-4 text-success" />
                        ) : (
                          <ArrowDown className="w-4 h-4 text-destructive" />
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="w-full md:flex-[2]">
          <CardHeader className="flex !flex-row items-center justify-between">
            <CardTitle className="text-lg">
              {t("analytic.uniqueVisitors")}
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs">
                  {t(`analytic.${period.toLowerCase()}`)}{" "}
                  <ChevronDown className="ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {(["Day", "Week", "Month"] as const).map((p) => (
                  <DropdownMenuItem key={p} onSelect={() => setPeriod(p)}>
                    {t(`analytic.${p.toLowerCase()}`)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <ReactECharts
              option={getBarOption(categories, series)}
              style={{ height: 350, width: "100%" }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
