export interface MapData {
    name: string;
    value?: number;
}
export interface WorldMapProps {
    data?: MapData[];
    selectedName?: string;
    areaColor?: string;
    countryColors?: {
        name: string;
        color: string;
    }[];
    onSelect?: (d: MapData) => void;
    height?: number | string;
}
export default function WorldMap({ data, selectedName, areaColor, countryColors, onSelect, height, }: WorldMapProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=WorldMap.d.ts.map