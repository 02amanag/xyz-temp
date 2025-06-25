import { Folder, Home } from "lucide-react";
import React from "react";
import {
    Breadcrumb,
    Card,
    ContextMenu,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuSeparator,
    ContextMenuSub,
    ContextMenuSubTrigger,
    ContextMenuSubContent,
    ContextMenuCheckboxItem,
    ContextMenuRadioItem,
    ContextMenuRadioGroup,
    CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem,
    Button,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
    SidebarContent,
    SidebarMenu,
    SidebarMenuButton,
} from "xyz-comp";

export default function MenuPage() {
    // Örnek state'ler (Checkbox ve Radio örnekleri için)
    const [isChecked, setIsChecked] = React.useState(false)
    const [selectedRadio, setSelectedRadio] = React.useState("light")
    const [open, setOpen] = React.useState(false);
    const handleClickLibrary = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        alert("Kütüphane tıklandı!");
    };

    const items: any = [
        { label: "Ana Sayfa", href: "/", icon: <Home size={16} /> },
        { label: "Kütüphane", icon: <Folder size={16} />, onClick: handleClickLibrary },
        { label: "Belgeler", href: "/documents" },
        { label: "Breadcrumb", href: "/breadcrumb" },
        { label: "Detay", href: "/documents/detail" },
    ];


    return (
        <div className="space-y-5">
            <Card>
                <CardHeader>
                    <CardTitle>Bread Crumb</CardTitle>
                    <CardDescription>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis eligendi praesentium totam veniam! Doloribus, molestiae vel aliquid libero accusantium consequatur.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Breadcrumb
                        items={items}
                        maxVisible={3}
                        separator={<b>/</b>}
                        ellipsisAriaLabel="Daha fazla"
                    />
                </CardContent>
            </Card>

            <Card >
                <CardHeader>
                    <CardTitle>Context Menu Component</CardTitle>
                    <CardDescription>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis eligendi praesentium totam veniam! Doloribus, molestiae vel aliquid libero accusantium consequatur.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ContextMenu>
                        {/* Sağ tık menüsünü ya da normal tıklamayı tetikleyecek alan */}
                        <ContextMenuTrigger>
                            <Button>Right Click</Button>
                        </ContextMenuTrigger>

                        {/* Menü içeriği */}
                        <ContextMenuContent>
                            <ContextMenuLabel>Basic Actions</ContextMenuLabel>
                            <ContextMenuItem onSelect={() => alert("Cut!")}>Cut</ContextMenuItem>
                            <ContextMenuItem onSelect={() => alert("Copy!")}>Copy</ContextMenuItem>
                            <ContextMenuItem onSelect={() => alert("Paste!")}>Paste</ContextMenuItem>

                            <ContextMenuSeparator />

                            <ContextMenuLabel>More Options</ContextMenuLabel>
                            {/* Checkbox örneği */}
                            <ContextMenuCheckboxItem
                                checked={isChecked}
                                onCheckedChange={(val: any) => setIsChecked(val as boolean)}
                            >
                                Enable Advanced Mode
                            </ContextMenuCheckboxItem>

                            {/* Radio örneği */}
                            <ContextMenuLabel inset>Theme</ContextMenuLabel>
                            <ContextMenuRadioGroup
                                value={selectedRadio}
                                onValueChange={(val: any) => setSelectedRadio(val)}
                            >
                                <ContextMenuRadioItem value="light">Light</ContextMenuRadioItem>
                                <ContextMenuRadioItem value="dark">Dark</ContextMenuRadioItem>
                            </ContextMenuRadioGroup>

                            <ContextMenuSeparator />

                            {/* Alt Menü örneği */}
                            <ContextMenuSub>
                                <ContextMenuSubTrigger>Submenu</ContextMenuSubTrigger>
                                <ContextMenuSubContent>
                                    <ContextMenuItem onSelect={() => alert("Sub Option 1!")}>
                                        Sub Option 1
                                    </ContextMenuItem>
                                    <ContextMenuItem onSelect={() => alert("Sub Option 2!")}>
                                        Sub Option 2
                                    </ContextMenuItem>
                                </ContextMenuSubContent>
                            </ContextMenuSub>
                        </ContextMenuContent>
                    </ContextMenu>
                </CardContent>
            </Card>

            <Card >
                <CardHeader>
                    <CardTitle>Command Menu Component</CardTitle>
                    <CardDescription>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis eligendi praesentium totam veniam! Doloribus, molestiae vel aliquid libero accusantium consequatur.</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Diyalog’u açmak için bir buton */}
                    <Button onClick={() => setOpen(true)}>Open Command Menu</Button>

                    {/* CommandDialog'u kullanımı */}
                    <CommandDialog open={open} onOpenChange={setOpen} >
                        {/* Arama girişi */}
                        <CommandInput placeholder="Search or jump to..." />

                        {/* Liste alanı */}
                        <CommandList>
                            {/* Arama sonucunda veri yoksa */}
                            <CommandEmpty>No results found...</CommandEmpty>

                            {/* Gruplar halinde menü veya seçenek listesi */}
                            <CommandGroup heading="Suggestions">
                                <CommandItem onSelect={() => alert("Apple seçildi")}>Apple</CommandItem>
                                <CommandItem onSelect={() => alert("Orange seçildi")}>Orange</CommandItem>
                                <CommandItem onSelect={() => alert("Banana seçildi")}>Banana</CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </CommandDialog>
                </CardContent>
            </Card>

            <Card >
                <CardHeader>
                    <CardTitle>Sidebar Component</CardTitle>
                    <CardDescription>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis eligendi praesentium totam veniam! Doloribus, molestiae vel aliquid libero accusantium consequatur.</CardDescription>
                </CardHeader>
                <CardContent>
                    <SidebarContent className="w-52 border p-3">
                        <SidebarMenu>
                            <SidebarMenuButton className="bg-primary text-primary-foreground">Menu 1</SidebarMenuButton>
                            <SidebarMenuButton className="bg-primary text-primary-foreground">Menu 2</SidebarMenuButton>
                            <SidebarMenuButton className="bg-primary text-primary-foreground">Menu 3</SidebarMenuButton>
                            <SidebarMenuButton className="bg-primary text-primary-foreground">Menu 4</SidebarMenuButton>
                            <SidebarMenuButton className="bg-primary text-primary-foreground">Menu 5</SidebarMenuButton>
                            <SidebarMenuButton className="bg-primary text-primary-foreground">Menu 6</SidebarMenuButton>
                            <SidebarMenuButton className="bg-primary text-primary-foreground">Menu 7</SidebarMenuButton>
                            <SidebarMenuButton className="bg-primary text-primary-foreground">Menu 8</SidebarMenuButton>
                            <SidebarMenuButton className="bg-primary text-primary-foreground">Menu 9</SidebarMenuButton>
                            <SidebarMenuButton className="bg-primary text-primary-foreground">Menu 10</SidebarMenuButton>
                        </SidebarMenu>
                    </SidebarContent>
                </CardContent>
            </Card>
        </div>
    )
}
