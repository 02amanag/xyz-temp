import { cn } from "@/lib/utils";
import { AlertTriangle, Bell, Bold, Check, Italic, Loader2, Mail, Underline } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, CardHeader, CardTitle, Label, SelectButton, SelectOption, SplitButton, SplitButtonItem, Toggle } from "xyz-comp";

export default function ButtonPage() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [count, setCount] = useState(0)

  // Dropdown menü öğeleri
  const menuItems: SplitButtonItem[] = [
    {
      label: "Menu Option 1",
      onClick: () => alert("Clicked Option 1"),
    },
    {
      label: "Menu Option 2",
      icon: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
      onClick: () => alert("Clicked Option 2"),
    },
    {
      label: "Menu Option 3",
      onClick: () => alert("Clicked Option 3"),
    },
  ]

  // #1 Tekli seçim örneği (renk)
  const [color, setColor] = useState<string>("red")

  // #2 Çoklu seçim örneği (meyve)
  const [fruits, setFruits] = useState<string[]>(["banana"])

  // #3 Boş opsiyon listesi -> On/Off fallback
  const [fallbackVal, setFallbackVal] = useState<string>("off")

  // #4 itemTemplate örneği (meyveler)
  const [customFruits, setCustomFruits] = useState<string[]>([])

  // #5 Size örneği (sm, md, lg)
  const [sizeVal, setSizeVal] = useState<string>("on")

  // Renk seçenekleri (tekli)
  const colorOptions: SelectOption[] = [
    { label: "Red", value: "red" },
    { label: "Green", value: "green" },
    { label: "Blue", value: "blue" },
  ]

  // Meyve seçenekleri (çoklu)
  const fruitOptions: SelectOption[] = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Orange", value: "orange" },
  ]

  // #4 itemTemplate
  function fruitTemplate(opt: SelectOption, isSelected: boolean) {
    return isSelected
      ? <i>{opt.label}</i>
      : <i>{opt.label}</i>
  }

  // #5 size parametresinde kullanacağımız opsiyon listesi (tekli)
  const onOffOptions: SelectOption[] = [
    { label: "Off", value: "off" },
    { label: "On", value: "on" },
  ]

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader>
          <CardTitle>Button Component</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-3">
          <Button size="default">Default</Button>
          <Button variant="destructive" size="default">Destructive</Button>
          <Button variant="outline" size="default">Outline</Button>
          <Button variant="ghost" size="default">Ghost</Button>
          <Button variant="link">Link Button</Button>
          <Button isLoading={true}>Loading</Button>
          <Button>
            <Link to="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">Rick</Link>
          </Button>
          <Button variant="circleIcon" size="icon"><Mail /></Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Split Button Component</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          {/* Örnek 1: Temel Split Button */}
          <div className="flex items-center gap-4">
            <SplitButton
              label="Default Split"
              items={menuItems}
              onClick={() => alert("Ana butona tıklandı")}
            />
          </div>

          {/* Örnek 2: Primary */}
          <div className="flex items-center gap-4">
            <SplitButton
              label="Primary Button"
              variant="default"
              menuIcon={<Bell className="h-4 w-4" />}
              items={[
                {
                  label: "Action 1",
                  onClick: () => console.log("Primary -> Action 1"),
                },
                {
                  label: "Action 2",
                  onClick: () => console.log("Primary -> Action 2"),
                },
              ]}
              onClick={() => console.log("Primary main clicked")}
            />
          </div>

          {/* Örnek 3: Outline / Secondary Split */}
          <div className="flex items-center gap-4">
            <SplitButton
              label="Secondary"
              variant="outline"
              items={menuItems}
              onClick={() => alert("Secondary main clicked")}
            />
          </div>

          {/* Örnek 4: Yüklenme (loading) durumu */}
          <div className="flex items-center gap-4">
            <SplitButton
              label="Loading State"
              loading
              items={menuItems}
              onClick={() => console.log("Should not trigger if loading")}
            />
          </div>

          {/* Örnek 5: Disable edilmiş Split */}
          <div className="flex items-center gap-4">
            <SplitButton
              label="Disabled Split"
              disabled
              items={menuItems}
              onClick={() => alert("Bu tıklama gerçekleşmemeli")}
            />
          </div>

          {/* Örnek 6: Özel Iconlu Ana Buton ve Adım Sayacı */}
          <div className="flex items-center gap-4">
            <SplitButton
              label={`Clicked ${count} times`}
              icon={<Check className="h-4 w-4"  />}
              items={menuItems}
              onClick={() => setCount((prev) => prev + 1)}
              className="bg-success"
            />
          </div>

          {/* Örnek 7: Sadece Icon (Ana Buton) */}
          <div className="flex items-center gap-4">
            <SplitButton
              icon={<Loader2 className="w-4 h-4" />}
              items={menuItems}
              onClick={() => alert("Icon Main Button")}
            />
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-12 gap-3">
        <Card className="md:col-span-6">
          <CardHeader>
            <CardTitle>Select Button Component</CardTitle>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* #1 Tekli Seçim (Color) */}
            <section>
              <h2 className="font-semibold mb-2">Tekli Seçim (Color)</h2>
              <SelectButton
                value={color}
                onChange={(val) => setColor(val as string)}
                options={colorOptions}
                className="w-[244px] mb-2"
              />
            </section>

            {/* #2 Çoklu Seçim (Fruits) */}
            <section>
              <h2 className="font-semibold mb-2">Çoklu Seçim (Fruits)</h2>
              <SelectButton
                value={fruits}
                onChange={(val) => setFruits(val as string[])}
                options={fruitOptions}
                multiSelect
                className="w-[244px] mb-2"
              />
            </section>

            {/* #3 Boş Options -> On/Off Fallback */}
            <section>
              <h2 className="font-semibold mb-2">Options empty = On/Off Fallback</h2>
              <SelectButton
                value={fallbackVal}
                onChange={(val) => setFallbackVal(val as string)}
                options={[]} // boş => otomatik [Off, On]
                className="w-[244px] mb-2"
              />
            </section>

            {/* #4 itemTemplate usage */}
            <section>
              <h2 className="font-semibold mb-2">itemTemplate (Custom Fruits)</h2>
              <SelectButton
                value={customFruits}
                onChange={(val) => setCustomFruits(val as string[])}
                options={fruitOptions}
                multiSelect
                itemTemplate={fruitTemplate}
                className="w-[244px] mb-2"
              />
            </section>

            {/* #5 Size Örneği */}
            <section>
              <h2 className="font-semibold mb-2">Size Örneği (sm, md, lg)</h2>

              <div className="flex flex-col gap-4">
                {/* sm */}
                <div>
                  <SelectButton
                    value={sizeVal}
                    onChange={(val) => setSizeVal(val as string)}
                    options={onOffOptions}
                    className="mb-2"
                    size="sm"
                  />
                </div>

                {/* md */}
                <div>
                  <SelectButton
                    value={sizeVal}
                    onChange={(val) => setSizeVal(val as string)}
                    options={onOffOptions}
                    className="mb-2"
                    size="md"
                  />
                </div>

                {/* lg */}
                <div>
                  <SelectButton
                    value={sizeVal}
                    onChange={(val) => setSizeVal(val as string)}
                    options={onOffOptions}
                    className="mb-2"
                    size="lg"
                  />
                </div>
              </div>
            </section>
          </CardContent>
        </Card>

        <Card className="md:col-span-6">
          <CardHeader>
            <CardTitle>Toggle Component</CardTitle>
          </CardHeader>
          <CardContent className="space-x-1">
            {/* Kalın */}
            <Toggle
              variant="outline"
              size="sm"
              pressed={bold}
              onPressedChange={setBold}
              aria-label="Kalın"
            >
              <Bold size={16} />
            </Toggle>

            {/* İtalik */}
            <Toggle
              variant="outline"
              size="sm"
              pressed={italic}
              onPressedChange={setItalic}
              aria-label="İtalik"
            >
              <Italic size={16} />
            </Toggle>

            {/* Altı Çizili */}
            <Toggle
              variant="outline"
              size="sm"
              pressed={underline}
              onPressedChange={setUnderline}
              aria-label="Altı Çizili"
            >
              <Underline size={16} />
            </Toggle>

            <Label
              className={cn(
                "block mt-4 text-sm font-normal",
                bold && "font-bold",
                italic && "italic",
                underline && "underline"
              )}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab soluta officia vero dolorum nulla quibusdam debitis. Soluta molestiae asperiores eaque eius assumenda non eligendi dolore molestias quaerat facere, laborum id sapiente earum provident alias minima odio ducimus ut. At expedita quasi deserunt labore deleniti asperiores quos molestias animi eos, eius error culpa cum, quaerat in molestiae! Sequi unde culpa, odio fuga quaerat quasi reiciendis tempore consectetur voluptatibus perspiciatis! Quae repellendus doloremque explicabo, beatae itaque corporis dolore asperiores cumque necessitatibus vitae eaque assumenda recusandae quod sit magnam aliquid? Ex quas optio et magni deserunt vel debitis quam, corrupti maxime harum tempore.</Label>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}