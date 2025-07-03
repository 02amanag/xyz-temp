export interface ProvinceData {
    name: string;
    value?: number;
}
export interface TurkeyProvincesMapProps {
    data?: ProvinceData[];
    selectedName?: string;
    areaColor?: string;
    onSelect?: (p: ProvinceData) => void;
}
export default function TurkeyProvincesMap({ data, selectedName, areaColor, onSelect, }: TurkeyProvincesMapProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TurkeyProvincesMap.d.ts.map