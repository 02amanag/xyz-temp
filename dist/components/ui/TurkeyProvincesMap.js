import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
/* TurkeyProvincesMap.tsx -------------------------------------------- */
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
export default function TurkeyProvincesMap({ data = [], selectedName, areaColor = "#3b82f6", onSelect, }) {
    const [loading, setLoading] = useState(false);
    const [geoData, setGeoData] = useState(); // harita GeoJSON’u
    /* -------- Haritayı yalnızca bir kez yükle -------- */
    async function handleFetchData() {
        setLoading(true);
        const { data: geo } = await axios.get("https://raw.githubusercontent.com/alpers/Turkey-Maps-GeoJSON/master/tr-cities.json");
        // Vite HMR’da “map already exists” hatasını engelle
        if (!echarts.getMap("TR_PROVINCES")?.geoJson) {
            echarts.registerMap("TR_PROVINCES", geo);
        }
        setGeoData(geo);
        setLoading(false);
    }
    useEffect(() => {
        handleFetchData(); // component mount → tek çağrı
    }, []);
    /* -------- Option’u doğrudan hesapla -------- */
    const option = loading || !geoData
        ? { series: [] }
        : (() => {
            const dataWithSelection = [
                ...data,
                ...(selectedName && !data.some(d => d.name === selectedName)
                    ? [{ name: selectedName }]
                    : []),
            ].map(d => (d.name === selectedName ? { ...d, selected: true } : d));
            return {
                tooltip: { trigger: "item", formatter: "{b}" },
                visualMap: data.length
                    ? {
                        min: 0,
                        max: Math.max(...data.map(d => d.value ?? 0)),
                        inRange: { color: ["#BAE6FD", "#0284C7"] },
                        left: "left",
                        bottom: 20,
                        text: ["Yüksek", "Düşük"],
                        calculable: true,
                    }
                    : undefined,
                series: [
                    {
                        type: "map",
                        map: "TR_PROVINCES",
                        roam: true,
                        selectedMode: "single",
                        select: { itemStyle: { areaColor } },
                        emphasis: { itemStyle: { areaColor } },
                        data: dataWithSelection,
                    },
                ],
            };
        })();
    /* -------- Tıklama olayını bildir -------- */
    const onEvents = {
        click: (params) => {
            if (params.componentType !== "series")
                return;
            onSelect?.({ name: params.name, value: params.data?.value });
        },
    };
    /* -------- UI -------- */
    if (loading)
        return _jsx(_Fragment, { children: "Harita y\u00FCkleniyor\u2026" });
    return (_jsx(ReactECharts, { option: option, style: { width: "100%", height: 600 }, onEvents: onEvents, notMerge: false, lazyUpdate // ← diff ederek günceller
        : true }));
}
