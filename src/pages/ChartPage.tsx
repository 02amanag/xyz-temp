import {
  Label,
  LineChart,
  LineSeries,
  BarChart,
  BarSeries,
  PieChart,
  PieSlice,
  ProgressChart,
  HeatmapChart,
  TreemapChart,
  TreemapData,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "xyz-comp";

function ChartPage() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  const lineSeries: LineSeries[] = [
    { name: "Ürün 1", data: [10, 40, 20, 60, 30, 90], color: "#3B82F6" },
    { name: "Ürün 2", data: [20, 10, 50, 40, 70, 50], color: "#A855F7" },
    { name: "Ürün 3", data: [-10, -30, 20, 10, -40, -20], color: "#EC4899" },
  ];

  const barSeries: BarSeries[] = [
    { name: "Ürün 1", data: [100, 200, 300, 250, 150, 80], color: "#3B82F6" },
    { name: "Ürün 2", data: [150, 180, 120, 220, 140, 130], color: "#A855F7" },
    { name: "Ürün 3", data: [150, 180, 120, 220, 140, 130], color: "#3bd1d6" },
  ];

  const pieSlices: PieSlice[] = [
    { name: "Ürün 1", value: 40, color: "#3B82F6" },
    { name: "Ürün 2", value: 25, color: "#A855F7" },
    { name: "Ürün 3", value: 35, color: "#EC4899" },
  ];

  const progressData = [
    {
      name: "Desktop",
      data: [80, 90, 75, 88, 120, 110],
      color: "#555",
    },
    {
      name: "Mobile",
      data: [20, 40, 50, 60, 80, 70],
      color: "#aaa",
    },
  ];

  const days = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
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

  const treemapData: TreemapData[] = [
    {
      name: "Branch A",
      children: [
        { name: "Leaf A1", value: 4, color: "#3B82F6" },
        { name: "Leaf A2", value: 6, color: "#A855F7" },
      ],
    },
    {
      name: "Branch B",
      value: 20,
      color: "#EC4899"
    },
    {
      name: "Branch C",
      children: [
        { name: "Leaf C1", value: 10, color: "#A855F7" },
        { name: "Leaf C2", value: 8, color: "#3B82F6" },
        { name: "Leaf C3", value: 7, color: "#EC4899" },
      ],
    },
  ];

  // Example data generator: random values from 0 to 10
  const data: [number, number, number][] = [];
  for (let d = 0; d < days.length; d++) {
    for (let h = 0; h < hours.length; h++) {
      const value = Math.floor(Math.random() * 11); // 0 to 10
      data.push([h, d, value]); // x = hour index, y = day index
    }
  }

  return (
    <div className="grid grid-cols-2 gap-3">

      {/* LINE CHART */}
      <Card>
        <CardHeader>
          <CardTitle>LINE Chart</CardTitle>
          <CardDescription>Helpful info about these numbers.</CardDescription>
        </CardHeader>
        <CardContent>
          <LineChart
            className="h-96"
            // title="Line Chart"
            xAxisData={months}
            lines={lineSeries}
          />
        </CardContent>
      </Card>

      {/* PIE CHART */}
      <Card>
        <CardHeader>
          <CardTitle>PIE Chart</CardTitle>
          <CardDescription>Helpful info about these numbers.</CardDescription>
        </CardHeader>
        <CardContent>
          <PieChart
            className="h-[400px]"
            slices={pieSlices}
          />
        </CardContent>
      </Card>

      {/* BAR CHART */}
      <Card>
        <CardHeader>
          <CardTitle>BAR Chart</CardTitle>
          <CardDescription>Helpful info about these numbers.</CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart
            className="h-96 rounded-lg"
            //title="Bar Chart"
            xAxisData={months}
            bars={barSeries}
            isHorizontal
          />
        </CardContent>
      </Card>

      {/* PROGRESS CHART */}
      <Card>
        <CardHeader>
          <CardTitle>PROGRESS Chart</CardTitle>
          <CardDescription>Son 30 gün içinde yüklenen dosya sayısı</CardDescription>
        </CardHeader>
        <CardContent>
          <ProgressChart
            className="h-96 rounded-lg"
            title="" // or "Aylık Dosya Transferi"
            xAxisData={months}
            series={progressData}
          />
        </CardContent>
      </Card>

      {/* HEATMAP CHART */}
      <Card>
        <CardHeader>
          <CardTitle>Heatmap Chart</CardTitle>
          <CardDescription>Son 30 gün içinde yüklenen dosya sayısı</CardDescription>
        </CardHeader>
        <CardContent>
          <HeatmapChart
            className="h-96"
            days={days}
            hours={hours}
            data={data}
            minValue={0}
            maxValue={10}
            title="Usage by Day & Hour"
          />
        </CardContent>
      </Card>

      {/* TREEMAP CHART */}
      <Card>
        <CardHeader>
          <CardTitle>TREEMAP Chart</CardTitle>
          <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, sit.</CardDescription>
        </CardHeader>
        <CardContent>
          <TreemapChart
            className="h-96"
            data={treemapData}
          />
        </CardContent>
      </Card>

    </div>
  );
}

export default ChartPage;
