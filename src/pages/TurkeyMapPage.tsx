// 1) Dosyanın en üstünde bir kez tanımla
import TurkeyProvincesMap, { ProvinceData } from "@/components/ui/TurkeyProvincesMap";
import { memo, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "xyz-comp";

const MemoTurkeyProvincesMap = memo(TurkeyProvincesMap);   // ← sadece 1 kez

export default function TurkeyMapPage() {
    const [selected, setSelected] = useState<ProvinceData | null>(null);

    const stats = useMemo<ProvinceData[]>(
        () => [
            { name: "İstanbul", value: 120 },
            { name: "Ankara", value: 95 },
            { name: "İzmir", value: 80 },
            { name: "Karabük", value: 130 },
            { name: "Artvin", value: 10 },
            { name: "Van", value: 80 },
            { name: "Mersin", value: 80 },
        ],
        [],
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Türkiye Haritası</CardTitle>
            </CardHeader>
            <CardContent>
                <MemoTurkeyProvincesMap
                    data={stats}
                    selectedName={selected?.name}
                    onSelect={setSelected}
                    areaColor="#16a34a"
                />

                <div className="mt-4">
                    Seçilen il: <b>{selected?.name ?? "Şehir Seçiniz!"}</b> – Değer: {selected?.value ?? "Şehir Seçiniz!"}
                </div>
            </CardContent>
        </Card>
    );
}
