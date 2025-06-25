import { CircleAlert } from "lucide-react";
import { useState } from "react";
import { Button, Fieldset, Input, Label, Panel } from "xyz-comp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
  AccordionPanelItem,
  AccordionPanelTrigger,
  AccordionPanelContent,
  AccordionPanelHeader,
  AccordionPanelFooter,
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "xyz-comp";

function AccordionPage() {
  const [openValue, setOpenValue] = useState<string | string[]>("item-1")
  // Toggle durumları: Farklı Fieldset'lerin açık/kapalı yönetimi
  const [toggle1, setToggle1] = useState(true)   // İlk toggle örneği
  const [toggle2, setToggle2] = useState(false)  // İkinci toggle örneği
  const [sampleOpen, setSampleOpen] = useState(true) // Başka bir örnek için açık/kapalı durumu

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader>
          <CardTitle>Accordion Component</CardTitle>
        </CardHeader>
        <CardContent >
          <Accordion type="multiple" className="w-full" defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>Sosyal</AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt pariatur assumenda accusamus, obcaecati expedita,
                itaque nulla reiciendis sapiente quae, perferendis consequuntur explicabo est quisquam incidunt? Assumenda ex similique quidem eum rerum,
                et perferendis, quos officiis praesentium voluptatum exercitationem pariatur? Veritatis asperiores accusamus aut provident suscipit minus
                dolore facilis eligendi molestiae voluptates, similique quos unde blanditiis voluptatem mollitia quam. Delectus ducimus perspiciatis quasi
                voluptatem. Perferendis doloribus aliquam iusto fugit molestiae suscipit necessitatibus a commodi? Distinctio dolores voluptas beatae
                blanditiis vel cum quod, facere soluta impedit sunt. Harum dolorum iste nam rerum placeat necessitatibus, tempora doloribus vel id distinctio
                minus molestias illo.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Güvenlik</AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt pariatur assumenda accusamus, obcaecati expedita,
                itaque nulla reiciendis sapiente quae, perferendis consequuntur explicabo est quisquam incidunt? Assumenda ex similique quidem eum rerum,
                et perferendis, quos officiis praesentium voluptatum exercitationem pariatur? Veritatis asperiores accusamus aut provident suscipit minus
                dolore facilis eligendi molestiae voluptates, similique quos unde blanditiis voluptatem mollitia quam. Delectus ducimus perspiciatis quasi
                voluptatem. Perferendis doloribus aliquam iusto fugit molestiae suscipit necessitatibus a commodi? Distinctio dolores voluptas beatae
                blanditiis vel cum quod, facere soluta impedit sunt. Harum dolorum iste nam rerum placeat necessitatibus, tempora doloribus vel id distinctio
                minus molestias illo.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Kurumu</AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt pariatur assumenda accusamus, obcaecati expedita,
                itaque nulla reiciendis sapiente quae, perferendis consequuntur explicabo est quisquam incidunt? Assumenda ex similique quidem eum rerum,
                et perferendis, quos officiis praesentium voluptatum exercitationem pariatur? Veritatis asperiores accusamus aut provident suscipit minus
                dolore facilis eligendi molestiae voluptates, similique quos unde blanditiis voluptatem mollitia quam. Delectus ducimus perspiciatis quasi
                voluptatem. Perferendis doloribus aliquam iusto fugit molestiae suscipit necessitatibus a commodi? Distinctio dolores voluptas beatae
                blanditiis vel cum quod, facere soluta impedit sunt. Harum dolorum iste nam rerum placeat necessitatibus, tempora doloribus vel id distinctio
                minus molestias illo.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Accordion Panel Component</CardTitle>
        </CardHeader>
        <CardContent className="space-y-10">
          {/* 1) Single  */}
          <section className="flex gap-5 flex-col">
            <Label>Default Mode</Label>
            <AccordionPanel
              collapsible
              defaultValue={["item-1"]}
              onChange={(openValues: any) => console.log("Açık item(lar):", openValues)}
            >
              <AccordionPanelItem value="item-1" >
                <AccordionPanelTrigger>
                  <div className="flex gap-2 items-center">
                    <CircleAlert className="w-4 h-4 text-primary" />
                    <Label className="text-xs">First Item (With Icon)</Label>
                  </div>
                </AccordionPanelTrigger>
                <AccordionPanelContent>
                  <div className="flex flex-col gap-3 px-5 py-5">
                    <Label>This is the first item's content. We can place other components here</Label>
                    <Button className="w-fit">Click Me</Button>
                  </div>
                </AccordionPanelContent>
              </AccordionPanelItem>

              <AccordionPanelItem value="item-2" >
                <AccordionPanelTrigger>
                  <div className="flex gap-2 items-center">
                    <CircleAlert className="w-4 h-4 text-warning" />
                    <Label className="text-xs">Second Item With Icon</Label>
                  </div>
                </AccordionPanelTrigger>
                <AccordionPanelContent className="px-5">
                  <Label className="text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Label>
                  <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground">
                    <li>Point A</li>
                    <li>Point B</li>
                    <li>Point C</li>
                    <li>Point D</li>
                  </ul>
                </AccordionPanelContent>
              </AccordionPanelItem>

              <AccordionPanelItem value="item-3" disabled>
                <AccordionPanelTrigger>
                  <div className="flex gap-2 items-center">
                    <CircleAlert className="w-4 h-4 text-destructive" />
                    <Label className="text-xs">Third Item With Icon</Label>
                  </div>
                </AccordionPanelTrigger>
                <AccordionPanelContent>Third Content...</AccordionPanelContent>
              </AccordionPanelItem>
            </AccordionPanel>
          </section>


          {/* 2) Multiple */}
          <section className="flex gap-5 flex-col">
            <Label>Multiple Mode</Label>
            <AccordionPanel
              type="multiple"
              collapsible
              defaultValue={["item-1"]}
              onChange={(openValues: any) => console.log("Açık item(lar):", openValues)}
            >
              <AccordionPanelItem value="item-1" >
                <AccordionPanelTrigger>
                  <div className="flex gap-2 items-center">
                    <CircleAlert className="w-4 h-4 text-primary" />
                    <Label className="text-xs">First Item (With Icon)</Label>
                  </div>
                </AccordionPanelTrigger>
                <AccordionPanelContent >
                  <div className="flex flex-col gap-3 px-5 py-5">
                    <Label>This is the first item's content. We can place other components here</Label>
                    <Button className="w-fit">Click Me</Button>
                  </div>
                </AccordionPanelContent>
              </AccordionPanelItem>

              <AccordionPanelItem value="item-2" >
                <AccordionPanelTrigger>
                  <div className="flex gap-2 items-center">
                    <CircleAlert className="w-4 h-4 text-warning" />
                    <Label className="text-xs">Second Item With Icon</Label>
                  </div>
                </AccordionPanelTrigger>
                <AccordionPanelContent className="px-5">
                  <Label className="text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Label>
                  <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground">
                    <li>Point A</li>
                    <li>Point B</li>
                    <li>Point C</li>
                    <li>Point D</li>
                  </ul>
                </AccordionPanelContent>
              </AccordionPanelItem>

              <AccordionPanelItem value="item-3" disabled>
                <AccordionPanelTrigger>
                  <div className="flex gap-2 items-center">
                    <CircleAlert className="w-4 h-4 text-destructive" />
                    <Label className="text-xs">Third Item With Icon</Label>
                  </div>
                </AccordionPanelTrigger>
                <AccordionPanelContent>Third Content...</AccordionPanelContent>
              </AccordionPanelItem>
            </AccordionPanel>
          </section>

          {/* 3) Colored Alternative */}
          <section className="flex gap-5 flex-col">
            <Label>Colored Alternative Mode</Label>
            <AccordionPanel
              type="multiple"
              collapsible
              defaultValue={["item-1"]}
              onChange={(openValues: any) => console.log("Açık item(lar):", openValues)}
              className="bg-slate-200 dark:bg-transparent border border-pink-300 md:w-[600px] w-full rounded-md text-sm"
            >
              <AccordionPanelItem value="item-1" >
                <AccordionPanelTrigger>
                  <div className="flex gap-2 items-center">
                    <CircleAlert className="w-4 h-4 text-primary" />
                    <Label className="text-xs">First Item (With Icon)</Label>
                  </div>
                </AccordionPanelTrigger>
                <AccordionPanelContent>
                  <div className="flex flex-col gap-3 px-5 py-5">
                    <Label>This is the first item's content. We can place other components here</Label>
                    <Button className="w-fit">Click Me</Button>
                  </div>
                </AccordionPanelContent>
              </AccordionPanelItem>

              <AccordionPanelItem value="item-2">
                <AccordionPanelTrigger>
                  <div className="flex gap-2 items-center">
                    <CircleAlert className="w-4 h-4 text-warning" />
                    <Label className="text-xs">Second Item With Icon</Label>
                  </div>
                </AccordionPanelTrigger>
                <AccordionPanelContent className="px-5">
                  <Label className="text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Label>
                  <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground">
                    <li>Point A</li>
                    <li>Point B</li>
                    <li>Point C</li>
                    <li>Point D</li>
                  </ul>
                </AccordionPanelContent>
              </AccordionPanelItem>

              <AccordionPanelItem value="item-3" disabled>
                <AccordionPanelTrigger>
                  <div className="flex gap-2 items-center">
                    <CircleAlert className="w-4 h-4 text-destructive" />
                    <Label className="text-xs">Third Item With Icon</Label>
                  </div>
                </AccordionPanelTrigger>
                <AccordionPanelContent>Third Content...</AccordionPanelContent>
              </AccordionPanelItem>
            </AccordionPanel>
          </section>

          {/* 4) Controlled usage  */}
          <section className="flex flex-col gap-3">
            <Label>Controlled usage Mode</Label>
            <AccordionPanel
              type="multiple"
              collapsible
              defaultValue={["item-1"]}
              onChange={(val) => setOpenValue(val)}
            >
              <AccordionPanelItem value="item-1" >
                <AccordionPanelTrigger>
                  <div className="flex gap-2 items-center">
                    <CircleAlert className="w-4 h-4 text-primary" />
                    <Label className="text-xs">First Item (With Icon)</Label>
                  </div>
                </AccordionPanelTrigger>
                <AccordionPanelContent >
                  <div className="flex flex-col gap-3 px-5 py-5">
                    <Label>This is the first item's content. We can place other components here</Label>
                    <Button className="w-fit">Click Me</Button>
                  </div>
                </AccordionPanelContent>
              </AccordionPanelItem>

              <AccordionPanelItem value="item-2" >
                <AccordionPanelTrigger>
                  <div className="flex gap-2 items-center">
                    <CircleAlert className="w-4 h-4 text-warning" />
                    <Label className="text-xs">Second Item With Icon</Label>
                  </div>
                </AccordionPanelTrigger>
                <AccordionPanelContent className="px-5">
                  <Label className="text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Label>
                  <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground">
                    <li>Point A</li>
                    <li>Point B</li>
                    <li>Point C</li>
                    <li>Point D</li>
                  </ul>
                </AccordionPanelContent>
              </AccordionPanelItem>

              <AccordionPanelItem value="item-3" disabled>
                <AccordionPanelTrigger>
                  <div className="flex gap-2 items-center">
                    <CircleAlert className="w-4 h-4 text-destructive" />
                    <Label className="text-xs">Third Item With Icon</Label>
                  </div>
                </AccordionPanelTrigger>
                <AccordionPanelContent>Third Content...</AccordionPanelContent>
              </AccordionPanelItem>
            </AccordionPanel>

            <Label className="text-sm">Currently open: <strong>{openValue}</strong></Label>
          </section>

          {/* 5) Custom Header And Footer  */}
          <section className="flex flex-col gap-5">
            <Label>Custom Header And Footer Mode</Label>
            <AccordionPanel
              type="multiple"
              collapsible
              defaultValue={["item-1"]}
              onChange={(val) => console.log(val)}
            >
              <AccordionPanelHeader className="p-2 font-bold"> Custom Header </AccordionPanelHeader>
              <AccordionPanelItem value="item-1">
                <AccordionPanelTrigger>
                  <div className="flex gap-2 items-center">
                    <CircleAlert className="w-4 h-4 text-primary" />
                    <Label className="text-xs">First Item (With Icon)</Label>
                  </div>
                </AccordionPanelTrigger>
                <AccordionPanelContent >
                  <div className="flex flex-col gap-3 px-5 py-5">
                    <Label>This is the first item's content. We can place other components here</Label>
                    <Button className="w-fit">Click Me</Button>
                  </div>
                </AccordionPanelContent>
              </AccordionPanelItem>

              <AccordionPanelItem value="item-2">
                <AccordionPanelTrigger>
                  <div className="flex gap-2 items-center">
                    <CircleAlert className="w-4 h-4 text-warning" />
                    <Label className="text-xs">Second Item With Icon</Label>
                  </div>
                </AccordionPanelTrigger>
                <AccordionPanelContent className="px-5">
                  <Label className="text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Label>
                  <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground">
                    <li>Point A</li>
                    <li>Point B</li>
                    <li>Point C</li>
                    <li>Point D</li>
                  </ul>
                </AccordionPanelContent>
              </AccordionPanelItem>

              <AccordionPanelItem value="item-3">
                <AccordionPanelTrigger>
                  <div className="flex gap-2 items-center">
                    <CircleAlert className="w-4 h-4 text-destructive" />
                    <Label className="text-xs">Third Item With Icon</Label>
                  </div>
                </AccordionPanelTrigger>
                <AccordionPanelContent>Third Content...</AccordionPanelContent>
              </AccordionPanelItem>

              <AccordionPanelFooter className="p-2 font-bold">Custom Footer</AccordionPanelFooter>
            </AccordionPanel>
          </section>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Panel Component</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Örnek 1: Sadece Header + Content */}
          <Panel header={<span className="text-primary text-lg font-bold">Header</span>}>
            <p className="text-sm">
              Bu panelde footer yok. Üst kısımda kısa bir başlık (header), alt
              kısımda (content) metin bulunuyor.
            </p>
          </Panel>

          {/* Örnek 2: Header + Content + Footer */}
          <Panel header={<span className="text-primary text-lg font-bold">Header + Content + Footer</span>}
            footer={<div className="text-xs">Footer içinde butonlar, linkler veya özet bilgiler olabilir.</div>}
          >
            <p className="text-xs">Bu panel hem header hem de footer içeriyor.</p>
            <p className="text-xs mt-2 leading-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </Panel>

          {/* Örnek 3: Çok kolonlu içerik (Yalnızca Content Kullanarak) */}
          <Panel header={<span className="text-primary text-lg font-bold">Multi Column</span>} >
            <div className="flex flex-row gap-4">
              <div className="flex-1 border border-muted-foreground/30 p-2 text-sm">
                <strong>Sol Kolon</strong>
                <p>Lorem ipsum dolor sit amet, consectetur.</p>
              </div>
              <div className="flex-1 border border-muted-foreground/30 p-2 text-sm">
                <strong>Sağ Kolon</strong>
                <p>
                  Bu kolonlar sabit boyutlu değil, Tailwind’de <code>flex-1</code>
                  kullanılarak alanı paylaşıyorlar.
                </p>
              </div>
            </div>
          </Panel>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fieldset Component</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* 1) Her zaman açık durumda, basit bir örnek */}
          <section className="space-y-8">
            <h2 className="font-semibold text-lg">Always Open</h2>
            <Fieldset header="Basic Fieldset" open>
              <p className="text-sm">
                This fieldset is always open. Place your text, form controls, or any other components here.
              </p>
            </Fieldset>
          </section>

          {/* 2) Her zaman kapalı, başlık rengini headerProps ile değiştirebiliriz */}
          <section className="space-y-8">
            <h2 className="font-semibold text-lg">Always Closed (Colored Header)</h2>
            <Fieldset
              header="Closed Fieldset"
              open={false}
              headerProps={{
                className: "bg-red-100 text-lg font-semibold",
                onClick: () => alert("Header area clicked!"),
              }}
            >
              <p className="text-sm">You won't see this content because the fieldset is closed.</p>
            </Fieldset>
          </section>

          {/* 3) Toggle örneği: Kullanıcının tıklamasıyla açık/kapalı durumu değişir */}
          <section className="space-y-8">
            <h2 className="font-semibold text-lg">Toggle Example (Colored Big Header)</h2>
            <Fieldset
              header="Colored Big Header"
              open={sampleOpen}
              onToggle={() => setSampleOpen(!sampleOpen)}
              headerProps={{
                className: "bg-red-100 text-lg font-semibold text-blue-800",
              }}
            >
              <p>
                Observe the big, colored header above. Fieldset is{" "}
                {sampleOpen ? "open" : "closed"}. Click the icon to toggle.
              </p>
            </Fieldset>
          </section>

          {/* 4) Farklı bir Fieldset: Özel node şeklinde header kullanımı */}
          <section className="space-y-8">
            <h2 className="font-semibold text-lg mb-11">Custom Header Node</h2>
            <Fieldset
              header={
                <div className="flex flex-col text-left">
                  <strong className="text-green-800">Complex Title</strong>
                  <span className="text-xs text-green-600">Subtitle line</span>
                </div>
              }
              open
              headerProps={{
                className: "bg-green-50 border-green-300 text-green-800",
                style: {
                  left: 10,
                  top: -40, // Header'ı daha yukarı konumlayabiliriz
                },
              }}
            >
              <p>
                This fieldset shows how you can pass a custom React node as the <em>header</em>.
                Use <strong>headerProps</strong> for styling or event handling.
              </p>
            </Fieldset>
          </section>

          {/* 5) Toggle #1 => toggle1 durumu */}
          <section className="space-y-8">
            <h2 className="font-semibold text-lg mb-7">Toggle Example #1</h2>
            <Fieldset
              header="Clickable #1"
              open={toggle1}
              onToggle={() => setToggle1(!toggle1)}
              headerProps={{
                className: "hover:bg-blue-50", // Hover örneği
              }}
            >
              <div className="space-y-2 text-sm">
                <p>
                  Fieldset is {toggle1 ? "open" : "closed"}. Click the icon to toggle.
                </p>
                <Button>Sample Button</Button>
              </div>
            </Fieldset>
          </section>

          {/* 6) Toggle #2 => toggle2 durumu */}
          <section className="space-y-8">
            <h2 className="font-semibold text-lg mb-7">Toggle Example #2</h2>
            <Fieldset
              header="Detailed Toggle"
              open={toggle2}
              onToggle={() => setToggle2(!toggle2)}
              headerProps={{
                className: "hover:bg-green-50 cursor-pointer",
                style: { top: -16 }, // Başlık biraz daha yukarıda
              }}
              className="bg-white"
            >
              <ul className="list-disc pl-5 text-sm">
                <li>Option A</li>
                <li>Option B</li>
              </ul>
            </Fieldset>
          </section>

          {/* 7) Her zaman açık, ek içerikler */}
          <section className="space-y-8">
            <h2 className="font-semibold text-lg mb-7">Always Open + Extra Content</h2>
            <Fieldset header="Longer Fieldset" open className="bg-white">
              <div className="text-sm space-y-2">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Additional content, like input and button.
                </p>
                <div className="flex items-center space-x-2">
                  <Input placeholder="Enter data..." />
                  <Button variant="outline">Submit</Button>
                </div>
              </div>
            </Fieldset>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}

export default AccordionPage;
