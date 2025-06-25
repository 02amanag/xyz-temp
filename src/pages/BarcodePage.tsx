import { CheckCircle, XCircle, Loader, Clock } from "lucide-react";
import { Barcode, Card } from "xyz-comp";

export default function BarcodePage() {
    return (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
            <Card className="p-5">
                {/* Barkod Bileşeni */}
                <Barcode
                    data="987654321"
                    type="barcode"
                    status="expired" // Durum: expired
                    width={2}
                    height={80}
                    color="#fff"
                    backgroundColor="#333"
                    title="Barcode"
                    downloadable={true}
                    resizable={true}
                />
            </Card>

            <Card className="p-5">
                {/* QR Kod Bileşeni */}
                <Barcode
                    data="https://www.docuart.com.tr"
                    type="qr"
                    status="active" // Durum: active
                    title="QR Code"
                    downloadable={true}
                    resizable={true}
                />
            </Card>

            <Card className="p-5">
                {/* Yüksek Çözünürlük Barkod */}
                <Barcode
                    data="987654321"
                    type="barcode"
                    status="loading" // Durum: loading
                    width={3}
                    height={120}
                    color="#000"
                    backgroundColor="#e0e0e0"
                    title="Barcode (With Downloadable)"
                    downloadable={true}
                />
            </Card>

            <Card className="p-5">
                <Barcode
                    data="https://docuart.com.tr"
                    type="qr"
                    status="scanned" // Durum: scanned
                    width={2}
                    height={150}
                    color="#000"
                    backgroundColor="#e0e0e0"
                    title="QR Kod (With Downloadable)"
                    downloadable={true}
                />
            </Card>

            <Card className="p-5">
                <Barcode
                    data="987654321"
                    type="barcode"
                    status="loading" // Durum: loading
                    width={3}
                    height={120}
                    title="Barcode (Without Resizable and Downloadable and Without Color)"
                    downloadable={false}
                    resizable={false}
                />
            </Card>

            <Card className="p-5">
                {/* Yüksek Çözünürlük QR Kod */}
                <Barcode
                    data="https://docuart.com.tr"
                    type="qr"
                    status="scanned" // Durum: scanned
                    width={2}
                    height={150}
                    title="QR Kod (Without Resizable and Downloadable and Without Color)"
                    downloadable={false}
                    resizable={false}
                />
            </Card>

            <Card className="p-5">
                {/* Durum Göstergeleri */}
                <div className="flex justify-center gap-10">
                    <div>
                        <CheckCircle className="text-green-500" size={24} />
                        <p>Active</p>
                    </div>
                    <div>
                        <XCircle className="text-red-500" size={24} />
                        <p>Expired</p>
                    </div>
                    <div>
                        <Loader className="animate-spin text-yellow-500" size={24} />
                        <p>Loading</p>
                    </div>
                    <div>
                        <Clock className="text-blue-500" size={24} />
                        <p>Scanned</p>
                    </div>
                </div>
            </Card >
        </div>

    );
};