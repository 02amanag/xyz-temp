import { useState } from "react";
import { AlertCircle, Bell, Check, Circle, Loader, PersonStanding, RectangleVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Step, StepItem, Stepper, StepperFooter, StepperType } from "xyz-comp";


export default function StepPage() {

    const [currentStep, setCurrentStep] = useState(0)

    /** 🟢 Temel Stepper Örneği (Default) */
    const steps: StepperType[] = [
        {
            title: "Adım 1",
            description: "Birinci adım açıklaması",
            content: (
                <Card className="text-sm p-5">
                    <p>Burada birinci adımın içeriği var.</p>
                </Card>
            ),
            icon: <Bell />
        },
        {
            title: "Adım 2",
            description: "İkinci adım açıklaması",
            content: (
                <Card className="text-sm p-5">
                    <p>İkinci adımın içeriği burada görünüyor.</p>
                </Card>
            ),
        },
        {
            title: "Adım 3",
            description: "Üçüncü adım açıklaması",
            content: (
                <Card className="text-sm p-5">
                    <p>Son adımın içeriği!</p>
                </Card>
            ),
        },
    ];

    /** 🔵 1️⃣ Alternatif: Özel ikonlar ve daire stilleri */
    const stepsCustomIcons: StepperType[] = [
        {
            title: "Ön Hazırlık",
            description: "Planlama aşaması",
            icon: <Loader className="w-4 h-4 animate-spin" />,
            circleClassName: "border-2 border-gray-500"
        },
        {
            title: "Denetim",
            description: "Gözden geçirme",
            icon: <AlertCircle className="w-4 h-4 text-red-500" />,
            circleClassName: "border-2 border-red-500"
        },
        {
            title: "Onaylandı",
            description: "Tüm aşamalar tamamlandı",
            icon: <Check className="w-4 h-4 text-green-500" />,
            circleClassName: "border-2 border-green-500"
        },
    ];

    /** 🟡 2️⃣ Alternatif: Sadece ikonlardan oluşan adımlar */
    const stepsIconsOnly: StepperType[] = [
        {
            icon: <Circle className="w-4 h-4" />
        },
        {
            icon: <Bell className="w-4 h-4" />
        },
        {
            icon: <Check className="w-4 h-4" />
        }
    ];

    /** 🔴 3️⃣ Alternatif: Tamamlanan adımlar için farklı ikon ve renkler */
    const stepsCompletedStyles: StepperType[] = [
        {
            title: "Ön Hazırlık",
            description: "Planlama tamamlandı",
            icon: <Check className="w-4 h-4 text-green-500" />,
            circleClassName: "bg-green-200 border-green-500"
        },
        {
            title: "Denetim",
            description: "Onay bekliyor",
            icon: <AlertCircle className="w-4 h-4 text-yellow-500" />,
            circleClassName: "bg-yellow-200 border-yellow-500"
        },
        {
            title: "Onay",
            description: "Tamamlandı",
            icon: <Check className="w-4 h-4" />,
            circleClassName: "bg-green-500 border-green-500 text-white"
        }
    ];

    /** 🟣 4️⃣ Alternatif: Uzun açıklamalı geniş versiyon */
    const stepsWideLayout: StepperType[] = [
        {
            title: "Planlama",
            description: "Bu aşamada gerekli araştırmalar ve ön çalışmalar yapılır.",
            icon: <Loader className="w-4 h-4 animate-spin" />
        },
        {
            title: "Uygulama",
            description: "Geliştirme ve üretim süreci başlatılır.",
            icon: <Bell className="w-4 h-4" />
        },
        {
            title: "Son Kontrol",
            description: "Tüm detaylar gözden geçirilir, son testler yapılır.",
            icon: <Check className="w-4 h-4" />
        },
    ]

    // Footer butonları (Geri/İleri/Sıfırla)
    const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 0))
    const handleReset = () => setCurrentStep(0)

    const [activeIndex, setActiveIndex] = useState(0);

    const items: StepItem[] = [
        {
            title: "Personal Info",
            description: 'Personel desc',
            icon: <PersonStanding />,
        },
        {
            title: "Reservation",
            description: 'Reservation desc',
            icon: <Bell />,
        },
        {
            title: "Review",
            description: 'Review desc',
            icon: <RectangleVertical />,
        },
    ];

    return (
        <div className="space-y-5">
            <Card>
                <CardHeader>
                    <CardTitle>Step Page</CardTitle>
                </CardHeader>

                <CardContent className="h-full space-y-6 mb-3">
                    <Step
                        model={items}
                        readOnly={false}
                        activeIndex={activeIndex}
                        onSelect={(idx) => setActiveIndex(idx.index)}
                    />

                    <Step
                        orientation="vertical"
                        model={items}
                        readOnly={false}
                        activeIndex={activeIndex}
                        onSelect={(idx) => setActiveIndex(idx.index)}
                    />
                </CardContent>
            </Card>

            <Card>
                <div className="p-6">
                    <h1 className="text-xl font-bold mb-4">Stepper Page</h1>

                    {/* 🟢 Temel Stepper Örneği */}
                    <h2 className="text-lg font-semibold mb-5">Temel Stepper</h2>
                    <Stepper
                        steps={steps}
                        currentStep={currentStep}
                        onStepChange={setCurrentStep}
                        orientation="horizontal"
                        className="mb-8"
                    />

                    <h2 className="text-lg font-semibold mb-5">Temel Stepper Dikey</h2>
                    <Stepper
                        steps={steps}
                        currentStep={currentStep}
                        onStepChange={setCurrentStep}
                        orientation="vertical"
                        className="mb-8" />

                    {/* 🔵  Alternatif: Özel ikonlar ve daire stilleri */}
                    <h2 className="text-lg font-semibold mb-5"> Özel İkonlar ve Daire Stilleri</h2>
                    <Stepper
                        steps={stepsCustomIcons}
                        currentStep={currentStep}
                        onStepChange={setCurrentStep}
                        orientation="horizontal"
                        className="mb-8" />

                    {/* 🟡  Alternatif: Sadece ikonlar */}
                    <h2 className="text-lg font-semibold mb-5"> Sadece İkonlardan Oluşan Adımlar</h2>
                    <Stepper
                        steps={stepsIconsOnly}
                        currentStep={currentStep}
                        onStepChange={setCurrentStep}
                        orientation="horizontal"
                        className="mb-8" />

                    {/* 🔴  Alternatif: Tamamlanan adımlar için farklı ikon ve renkler */}
                    <h2 className="text-lg font-semibold mb-5"> Tamamlanan Adımlar İçin Farklı İkonlar</h2>
                    <Stepper
                        steps={stepsCompletedStyles}
                        currentStep={currentStep}
                        onStepChange={setCurrentStep}
                        orientation="vertical"
                        className="mb-8" />

                    {/* 🟣  Alternatif: Uzun Açıklamalı Geniş Versiyon */}
                    <h2 className="text-lg font-semibold mb-5"> Uzun Açıklamalı Geniş Stepper</h2>
                    <Stepper
                        steps={stepsWideLayout}
                        currentStep={currentStep}
                        onStepChange={setCurrentStep}
                        orientation="vertical"
                        className="mb-8" />

                    <StepperFooter
                        currentStep={currentStep}
                        totalSteps={steps.length}
                        onNext={handleNext}
                        onPrev={handlePrev}
                        onReset={handleReset}
                        nextButtonLabel="İleri"
                        prevButtonLabel="Geri"
                        resetButtonLabel="Sıfırla"
                    />
                </div>
            </Card>
        </div>
    )
}
