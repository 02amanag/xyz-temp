/**
 * CustomLoadingDataTableDemo.tsx
 * Developed by Docuart Bilgi Teknolojileri
 *
 * Bu sayfa, DataTable bileşenine "renderLoading" özelliği ekleyerek,
 * isLoading = true olduğunda özel bir yüklenme şablonu göstermek için
 * nasıl bir yaklaşım izlenebileceğini sergiler.
 */

import { useState } from "react";
import { Button, Card, DataTable, DataTableColumnDef } from "xyz-comp"; // Kendi DataTable yolunuzu düzenleyin

// Örnek veri
interface RecordData {
  id: number;
  title: string;
  description: string;
}

// Kolonlar
const columns: DataTableColumnDef<RecordData>[] = [
  { header: "ID", accessorKey: "id" },
  { header: "Title", accessorKey: "title" },
  { header: "Description", accessorKey: "description" },
];

export default function CustomLoadingDataTableDemo() {
  const [data, setData] = useState<RecordData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Yüklenme simülasyonu
  function loadFakeData() {
    setIsLoading(true);
    setTimeout(() => {
      const mockData: RecordData[] = [
        { id: 1, title: "Record A", description: "Açıklama A" },
        { id: 2, title: "Record B", description: "Açıklama B" },
        { id: 3, title: "Record C", description: "Açıklama C" },
      ];
      setData(mockData);
      setIsLoading(false);
    }, 2000);
  }

  // renderLoading fonksiyonunu JSX döndürecek şekilde tanımlıyoruz
  function myLoadingTemplate() {
    return (
      <div className="flex flex-col items-center gap-2 p-4">
        {/* Basit bir spinner veya Lottie / harici component koyabilirsiniz */}
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent" />
        <span className="text-blue-600">Veriler yükleniyor, lütfen bekleyin...</span>
      </div>
    );
  }

  return (
    <Card className="p-5 space-y-4">
      <DataTable<RecordData>
        // DataTable verileri
        data={data}
        columns={columns}
        title="Custom Loading Demo"

        // Üst kısma butonu koyuyoruz
        header={
          <Button onClick={loadFakeData}>Fake Veri Yükle</Button>
        }

        // Özel yüklenme
        isLoading={isLoading}
        renderLoading={myLoadingTemplate} // callback şeklinde -> DataTable prop: () => React.ReactNode

        // Tablo boşsa
        noDataMessage="Hiç kayıt yok"

        // Paginasyon kapalı (isteğe bağlı)
        paginator={false}
      />
    </Card>
  );
}