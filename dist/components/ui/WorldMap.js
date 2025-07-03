/* WorldMap.tsx -------------------------------------------- */
"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import axios from "axios";
import * as echarts from "echarts/core";
import { MapChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { GeoComponent, TooltipComponent, VisualMapComponent, } from "echarts/components";
import ReactECharts from "echarts-for-react";
echarts.use([
    MapChart,
    GeoComponent,
    TooltipComponent,
    VisualMapComponent,
    CanvasRenderer,
]);
export default function WorldMap({ data = [], selectedName, areaColor = "#3b82f6", countryColors = [], onSelect, height = 600, }) {
    const [loading, setLoading] = useState(false);
    const [geoData, setGeoData] = useState(null);
    // 1) GeoJSON’i bir kez yükle
    useEffect(() => {
        let cancelled = false;
        const fetchGeo = async () => {
            setLoading(true);
            try {
                const { data: worldJson } = await axios.get("https://s3-us-west-2.amazonaws.com/s.cdpn.io/95368/world.json");
                if (!echarts.getMap("world")?.geoJson) {
                    echarts.registerMap("world", worldJson);
                }
                if (!cancelled)
                    setGeoData(worldJson);
            }
            finally {
                if (!cancelled)
                    setLoading(false);
            }
        };
        fetchGeo();
        return () => {
            cancelled = true;
        };
    }, []);
    // 2) Echarts option oluştur
    const option = loading || !geoData
        ? { series: [] }
        : (() => {
            // seçili ve renk ekleme
            const merged = [
                ...data,
                ...(selectedName && !data.some((d) => d.name === selectedName)
                    ? [{ name: selectedName }]
                    : []),
            ].map((d) => {
                const base = d.name === selectedName ? { ...d, selected: true } : d;
                // sayfadan gelen countryColors eşlemesi
                const found = countryColors.find((c) => c.name === d.name);
                return {
                    ...base,
                    ...(found ? { itemStyle: { areaColor: found.color } } : {}),
                };
            });
            return {
                tooltip: { trigger: "item", formatter: "{b}: {c}" },
                visualMap: data.length
                    ? {
                        min: Math.min(...data.map((d) => d.value ?? 0)),
                        max: Math.max(...data.map((d) => d.value ?? 0)),
                        left: "left",
                        bottom: 20,
                        text: ["High", "Low"],
                        inRange: { color: ["#e0f3f8", "#045a8d"] },
                        calculable: true,
                    }
                    : undefined,
                series: [
                    {
                        type: "map",
                        map: "world",
                        roam: true,
                        selectedMode: "single",
                        select: { itemStyle: { areaColor } },
                        emphasis: { itemStyle: { areaColor } },
                        data: merged,
                    },
                ],
            };
        })();
    const onEvents = {
        click: (params) => {
            if (params.componentType !== "series")
                return;
            onSelect?.({ name: params.name, value: params.data?.value });
        },
    };
    if (loading)
        return _jsx("p", { children: "Harita y\u00FCkleniyor\u2026" });
    return (_jsx(ReactECharts, { option: option, style: { width: "100%", height }, onEvents: onEvents, notMerge: false, lazyUpdate: true }));
}
