// React Imports
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { clearName, selectUserName, setName } from '../redux/slices/userSlice';

// Avatar
import avatar from "../assets/avatars/xuxuefeng.png";

// Icons Import
import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    Bold,
    CircleArrowLeft,
    CircleArrowRight,
    Clock,
    Home,
    Italic,
    MoreHorizontal,
    Share,
    Strikethrough,
    User
} from "lucide-react";

// xyz-comp components import
import {
    Avatar,
    AvatarProps,
    Badge, Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Divider,
    ScrollArea,
    ScrollBar,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    Tabs,
    TabsList,
    Label,
    CardFooter,
    CardDescription,
    Heading,
    Separator,
    Skeleton,
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
    Input,
    Toolbar,
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    Toggle,
    BadgeCard
} from "xyz-comp";

// Örnek tipler
type ToggleOption = {
    value: string
    icon: React.ReactNode
    label: string
}

// Örnek tipler
type TabItem = {
    name: string;
    value: string;
    icon: React.ReactNode;
    iconPlacement: "left" | "right";
    content: React.ReactNode | any;
    caption?: { display: boolean, text: string };
}

export default function ToolsPage() {
    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);
    const [lastEditedText] = useState("2 saat önce");
    const [searchValue, setSearchValue] = useState("");
    const [selectedTab, setSelectedTab] = useState("tab1");
    const handleOption1 = () => alert("Seçenek 1 tıklandı!");
    const handleOption2 = () => alert("Seçenek 2 tıklandı!");
    const handleShare = () => alert("Paylaş butonuna tıklandı!");
    const [activeAlignment, setActiveAlignment] = useState("left");
    const [activeFormats, setActiveFormats] = useState<string[]>([]);

    // Format ve Align seçenekleri
    const formatOptions: ToggleOption[] = [
        {
            value: "bold",
            icon: <Bold className="w-4 h-4" />,
            label: "Kalın"
        },
        {
            value: "italic",
            icon: <Italic className="w-4 h-4" />,
            label: "İtalik"
        },
        {
            value: "strikethrough",
            icon: <Strikethrough className="w-4 h-4" />,
            label: "Üstü Çizili",
        },
    ]

    const alignOptions: ToggleOption[] = [
        {
            value: "left",
            icon: <AlignLeft className="w-4 h-4" />,
            label: "Sola Hizala"
        },
        {
            value: "center",
            icon: <AlignCenter className="w-4 h-4" />,
            label: "Ortala"
        },
        {
            value: "right",
            icon: <AlignRight className="w-4 h-4" />,
            label: "Sağa Hizala"
        },
    ]

    const avatars: AvatarProps[] = [
        {
            size: "sm",
            variant: "rounded",
            name: "Abidin",
            src: "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
        },
        {
            size: "sm",
            variant: "rounded",
            status: "offline",
            notificationCount: 15,
            name: "Savaş"
        },
        {
            size: "sm",
            variant: "square",
            status: "online",
            notificationCount: 15,
            name: "Emin"
        },
        {
            size: "sm",
            variant: "square",
            status: "offline",
            notificationCount: 15,
            name: "Enes"
        },
        {
            size: "md",
            variant: "rounded",
            status: "online",
            notificationCount: 15
        },
        {
            size: "md",
            variant: "rounded",
            status: "offline",
            notificationCount: 15
        },
        {
            size: "md",
            variant: "square",
            status: "online",
            notificationCount: 15
        },
        {
            size: "md",
            variant: "square",
            status: "offline",
            notificationCount: 15
        },
        {
            size: "lg",
            variant: "rounded",
            status: "online",
            notificationCount: 15
        },
        {
            size: "lg",
            variant: "rounded",
            status: "offline",
            notificationCount: 15
        },
        {
            size: "lg",
            variant: "square",
            status: "online",
            notificationCount: 15
        },
        {
            size: "lg",
            variant: "square",
            status: "offline",
            notificationCount: 15
        },
    ];

    const tabsList: TabItem[] = Array.from({ length: 12 }, (_, i) => {
        const tabNumber = i + 1;
        return {
            name: `Tab ${tabNumber}`,
            value: `tab${tabNumber}`,
            icon: <Home />,
            iconPlacement: "left",
            content: (
                <Card className="flex flex-col gap-3 w-full items-start h-full justify-start p-3">
                    <Label className="text-xl">{`Content ${tabNumber}`}</Label>
                    <Label className="text-sm font-normal text-left">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium dolorum reprehenderit
                        nulla dolores eaque facere cum a ducimus harum totam. Temporibus voluptates, magni obcaecati
                        quis facilis iusto cumque aliquam atque, saepe id laudantium, soluta consectetur neque itaque
                        at maiores officiis dolores ipsa molestiae doloribus placeat fugit ipsam aperiam excepturi?
                        Sint deleniti quo eos asperiores repellat sunt possimus. Voluptatem laborum provident sapiente
                        harum cum culpa rerum molestiae necessitatibus illo nihil officiis amet similique quae soluta
                        nisi animi perferendis mollitia, aperiam iste impedit distinctio excepturi veritatis quod ipsa.
                        Distinctio beatae culpa laboriosam quae rem ratione officiis architecto fugiat, voluptatum
                        accusantium molestiae? Ullam!
                    </Label>
                </Card>
            ),
            caption: { display: true, text: `caption${tabNumber}` },
        };
    });

    const handleFormatClick = (value: string) => {
        setActiveFormats((prev) =>
            prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
        )
    };

    const handleAlignClick = (value: string) => {
        setActiveAlignment(value)
    };

    // Redux storede tutulan name alanını değiştir
    const handleNameChange = (newName: string) => {
        dispatch(setName(newName));
    };

    // Redux storeda tutulan name alanını sil
    const handleClearName = () => {
        dispatch(clearName());
    };

    const handleCardClick = () => {
        alert("Card Clicked!");
    };

    const handleHeaderClick = (e: any) => {
        e.stopPropagation();
        alert("Header Clicked!");
    };

    const handleTitleClick = (e: any) => {
        e.stopPropagation();
        alert("Title Clicked!");
    };

    const handleContentClick = (e: any) => {
        e.stopPropagation();
        alert("Content Clicked!");
    };

    const handleDescriptionClick = (e: any) => {
        e.stopPropagation();
        alert("Card Description Clicked!");
    };

    const handleFooterClick = (e: any) => {
        e.stopPropagation();
        alert("Footer Clicked!");
    };

    return (
        <div className="grid grid-cols-12 gap-3">

            {/* Divider Examples */}
            <Card className="md:col-span-8 col-span-12">
                <CardHeader>
                    <CardTitle>Divider Örnekleri</CardTitle>
                    <CardDescription>Çeşitli yatay &amp; dikey bölücüler</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <h1 className="text-xl font-bold">Sosyal Güvenlik Kurumu</h1>

                    <Divider orientation="horizontal" variant="solid" />

                    <div className="flex space-x-6">
                        <div className="flex items-center">
                            <span>Sosyal</span>
                            <Divider orientation="vertical" variant="solid" className="mx-4 h-8" />
                            <span>Güvenlik</span>
                            <Divider orientation="vertical" variant="solid" className="mx-4 h-8" />
                            <span>Kurumu</span>
                        </div>
                    </div>

                    <Divider orientation="horizontal" variant="solid" />

                    <div className="flex flex-col space-y-4">
                        <div>Sosyal</div>
                        <Divider orientation="horizontal" variant="solid" />
                        <div>Güvenlik</div>
                        <Divider orientation="horizontal" variant="solid" />
                        <div>Kurumu</div>
                    </div>

                    <Divider orientation="horizontal" variant="solid" />

                    <div className="flex flex-col space-y-4">
                        <div>Sosyal</div>
                        <Divider orientation="horizontal" variant="dotted" className="mx-4 h-8" />
                        <div>Güvenlik</div>
                        <Divider orientation="horizontal" variant="default" className="mx-4 h-8" />
                        <div>Kurumu</div>
                    </div>

                    <Divider orientation="horizontal" variant="dashed" className="mx-4 h-8" />

                    <div className="flex space-x-6">
                        <div>Sosyal</div>
                        <Divider orientation="vertical" variant="dotted" className="mx-4 h-8" />
                        <div>Güvenlik</div>
                        <Divider orientation="vertical" variant="dashed" className="mx-4 h-8" />
                        <div>Kurumu</div>
                    </div>
                </CardContent>
            </Card>

            {/* ScrollArea Example */}
            <Card className="overflow-hidden md:col-span-4 col-span-12">
                <CardHeader>
                    <CardTitle>ScrollArea Örneği</CardTitle>
                    <CardDescription>Hem yatay hem dikey kaydırma</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] w-full">
                    <ScrollArea className="w-full h-full">
                        <div className="min-w-[600px] min-h-[400px]">
                            <p className="text-sm leading-relaxed">
                                {Array(30)
                                    .fill(
                                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. "
                                    )
                                    .join("")}
                            </p>
                        </div>
                        <ScrollBar orientation="vertical" />
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </CardContent>
            </Card>

            {/* Badge Examples */}
            <Card className="md:col-span-3 col-span-12">
                <CardHeader>
                    <CardTitle>Badge Örnekleri</CardTitle>
                    <CardDescription>Konum &amp; şekil varyasyonları</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-10 flex-col">
                    <Badge count={8} color="warning">
                        <User className="size-8" />
                    </Badge>

                    <Badge count={9} position="topLeft">
                        <User />
                    </Badge>

                    <Badge count={9} position="topLeft" shape="rectangle">
                        <User />
                    </Badge>

                    <Badge count={12} position="bottomRight">
                        <User />
                    </Badge>

                    <Badge count={12} position="bottomLeft">
                        <User />
                    </Badge>

                    <Badge count={12}>
                        <Button className="block px-4 py-2">Test</Button>
                    </Badge>
                </CardContent>
            </Card>

            <Card className="md:col-span-3 col-span-12">
                <CardHeader>
                    <CardTitle>BadgeCard Örnekleri</CardTitle>
                    <CardDescription>Status(Durum) &amp; şekil varyasyonları</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-5 flex-wrap">
                    <BadgeCard status="success">Test</BadgeCard>
                    <BadgeCard status="warning">Test</BadgeCard>
                    <BadgeCard status="error">Test</BadgeCard>
                    <BadgeCard status="pending">Test</BadgeCard>

                    <BadgeCard status="success">
                        <Clock />
                        Test
                    </BadgeCard>

                    <BadgeCard status="success" variant="dot">
                        Test
                    </BadgeCard>

                    <BadgeCard status="warning" variant="dot">
                        Test
                    </BadgeCard>

                    <BadgeCard status="error" variant="dot">
                        Test
                    </BadgeCard>

                    <BadgeCard status="pending" variant="dot">
                        <Clock />
                        Test
                    </BadgeCard>
                </CardContent>
            </Card>

            {/* Avatar Examples */}
            <Card className="md:col-span-6 col-span-12">
                <CardHeader>
                    <CardTitle>Avatar Örnekleri</CardTitle>
                    <CardDescription>Farklı boyut &amp; varyantlar</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-5 items-center justify-center flex-wrap">
                    {avatars.map((props, index) => (
                        <Avatar
                            key={index}
                            name={props.name}
                            size={props.size}
                            badgeVariant="error"
                            src={props.src}
                            status={props.status}
                            variant={props.variant}
                            notificationCount={props.notificationCount}
                        />
                    ))}
                </CardContent>
            </Card>

            {/* Tabs Examples */}
            <Card className="col-span-12">
                <CardHeader>
                    <CardTitle>Tabs Örnekleri</CardTitle>
                    <CardDescription>Default, Secondary, Underlined, Vertical</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} value={selectedTab}>
                        <TabsList
                            fill
                            fillTabBtn
                            variant="default"
                            layout="horizontal"
                            tabsList={tabsList}
                            onValueChange={setSelectedTab}
                            value={selectedTab}
                        />
                    </Tabs>

                    <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} value={selectedTab}>
                        <TabsList
                            fill
                            fillTabBtn
                            variant="secondary"
                            layout="horizontal"
                            tabsList={tabsList}
                            onValueChange={setSelectedTab}
                            value={selectedTab}
                        />
                    </Tabs>

                    <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} value={selectedTab}>
                        <TabsList
                            fill
                            fillTabBtn
                            variant="underlined"
                            layout="horizontal"
                            tabsList={tabsList}
                            onValueChange={setSelectedTab}
                            value={selectedTab}
                        />
                    </Tabs>

                    <div className="flex">
                        <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} value={selectedTab} className="w-full">
                            <TabsList
                                variant="default"
                                layout="vertical"
                                tabsList={tabsList}
                                onValueChange={setSelectedTab}
                                value={selectedTab}
                            />
                        </Tabs>
                    </div>
                </CardContent>
            </Card>

            {/* Card Examples */}
            <Card className="md:col-span-6 col-span-12">
                <CardHeader>
                    <CardTitle>Card Örnekleri</CardTitle>
                    <CardDescription>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores velit numquam reiciendis tenetur deleniti, corrupti necessitatibus non recusandae dolor blanditiis.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-7">
                    <div className="flex flex-col gap-3">
                        <Label>Card Default</Label>
                        <Card onClick={handleCardClick}>
                            <CardHeader onClick={handleHeaderClick}>
                                <CardTitle onClick={handleTitleClick}>Title</CardTitle>
                            </CardHeader>
                            <CardContent onClick={handleContentClick}>
                                <Label>Card Content</Label>
                            </CardContent>
                            <CardFooter onClick={handleFooterClick}>Footer</CardFooter>
                        </Card>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Label>Card With Description</Label>
                        <Card onClick={handleCardClick}>
                            <CardHeader onClick={handleHeaderClick}>
                                <CardTitle onClick={handleTitleClick}>Title</CardTitle>
                            </CardHeader>
                            <CardContent onClick={handleContentClick}>
                                <Label>Card Content</Label>
                                <CardDescription onClick={handleDescriptionClick}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos recusandae minima quaerat perferendis totam
                                    magnam nesciunt culpa libero id quae?
                                </CardDescription>
                            </CardContent>
                            <CardFooter onClick={handleFooterClick}>Footer</CardFooter>
                        </Card>
                    </div>
                </CardContent>
            </Card>

            {/* Heading Examples */}
            <Card className="md:col-span-6 col-span-12">
                <CardHeader>
                    <CardTitle>Heading Örnekleri</CardTitle>
                    <CardDescription>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores velit numquam reiciendis tenetur deleniti, corrupti necessitatibus non recusandae dolor blanditiis.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-10">
                    <Heading headingLevel="h1" iconLeft={<CircleArrowLeft />}>Sosyal Güvenlik Kurumu (h1)</Heading>
                    <Heading headingLevel="h2" iconLeft={<CircleArrowLeft />} linePosition="left">Sosyal Güvenlik Kurumu (h2)</Heading>
                    <Heading headingLevel="h3" iconLeft={<CircleArrowLeft />} linePosition="right">Sosyal Güvenlik Kurumu (h3)</Heading>
                    <Heading headingLevel="h4" linePosition="center">Sosyal Güvenlik Kurumu (h4)</Heading>
                    <Heading headingLevel="h5" iconLeft={<CircleArrowLeft />} linePosition="right">Sosyal Güvenlik Kurumu (h5)</Heading>
                    <Heading headingLevel="h6" iconLeft={<CircleArrowRight />} linePosition="right">Sosyal Güvenlik Kurumu (h6)</Heading>
                    <Heading headingLevel="h4">Sosyal Güvenlik Kurumu (h4)</Heading>
                    <Heading headingLevel="h5">Sosyal Güvenlik Kurumu (h5)</Heading>
                    <Heading headingLevel="h6" iconRight={<CircleArrowRight />}>Sosyal Güvenlik Kurumu (h6)</Heading>
                    <Heading headingLevel="h6" iconLeft={<CircleArrowLeft />}>Sosyal Güvenlik Kurumu (İkon Sol)</Heading>
                    <Heading headingLevel="h4" iconLeft={<CircleArrowRight />}>Sosyal Güvenlik Kurumu (İkon Sağ)</Heading>
                </CardContent>
            </Card>

            {/* Skeleton Examples */}
            <Card className="md:col-span-8 col-span-12">
                <CardHeader>
                    <CardTitle>Skeleton Örnekleri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                    <div className="flex flex-col gap-2">
                        <Label>Standart Skeleton</Label>
                        <Skeleton className="w-[300px] h-10" />
                        <Skeleton className="mt-2 h-44" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Yuvarlak Skeleton</Label>
                        <Skeleton className="w-32 h-32 rounded-full" />
                    </div>
                </CardContent>
            </Card>

            {/* Separator Examples */}
            <Card className="md:col-span-4 col-span-12">
                <CardHeader>
                    <CardTitle>Separator Örnekleri</CardTitle>
                    <CardDescription>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores velit numquam reiciendis tenetur deleniti, corrupti necessitatibus non recusandae dolor blanditiis.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                    <div className="flex flex-col gap-3">
                        <Label>Docuart</Label>
                        <Separator />
                        <Label>Sgk Micro Frontend</Label>
                    </div>
                    <div className="flex gap-3 items-center">
                        <Label>Docuart</Label>
                        <Separator orientation="vertical" className="h-8" />
                        <Label>Sgk Micro Frontend</Label>
                    </div>
                </CardContent>
            </Card>

            {/* HoverCard Example */}
            <Card className="md:col-span-4 col-span-12">
                <CardHeader>
                    <CardTitle>HoverCard Örneği</CardTitle>
                    <CardDescription>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores velit numquam reiciendis tenetur deleniti, corrupti necessitatibus non recusandae dolor blanditiis.</CardDescription>
                </CardHeader>
                <CardContent>
                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <button
                                type="button"
                                className="flex items-center space-x-2 rounded-md border px-3 py-2 shadow-sm transition-colors hover:bg-accent"
                            >
                                <img src={avatar} alt="Profil" className="h-10 w-10 rounded-full" />
                                <span className="font-medium">John Doe</span>
                            </button>
                        </HoverCardTrigger>
                        <HoverCardContent>
                            <div className="flex items-center space-x-4">
                                <img src={avatar} alt="Profil" className="h-16 w-16 rounded-full" />
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold">John Doe</p>
                                    <p className="text-xs text-muted-foreground">Product Designer • Acme Inc.</p>
                                    <p className="text-xs leading-snug">
                                        Kullanıcı arayüzleri tasarlar, tasarım sistemleri oluşturur ve 👾 oyun sever.
                                    </p>
                                </div>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </CardContent>
            </Card>

            {/* Redux Example */}
            <Card className="md:col-span-4 col-span-12">
                <CardHeader>
                    <CardTitle>Redux Örneği</CardTitle>
                    <CardDescription>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores velit numquam reiciendis tenetur deleniti, corrupti necessitatibus non recusandae dolor blanditiis.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <h1>Hello, {userName}!</h1>
                    <Input value={userName} onChange={(e) => handleNameChange(e.target.value)} />
                    <Button onClick={handleClearName}>Clear Name</Button>
                </CardContent>
            </Card>

            {/* Tooltip Example */}
            <Card className="md:col-span-4 col-span-12">
                <CardHeader>
                    <CardTitle>Tooltip Örneği</CardTitle>
                    <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam eius hic accusantium veritatis voluptate molestiae culpa magni assumenda doloribus! Consequuntur.</CardDescription>
                </CardHeader>
                <CardContent >
                    <Tooltip>
                        <TooltipTrigger>
                            <Button>Tooltip Content</Button>
                        </TooltipTrigger>
                        <TooltipContent className="w-96">
                            <Label>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque corrupti cumque ab autem quam ipsam doloremque quos, facilis quaerat velit!</Label>
                        </TooltipContent>
                    </Tooltip>
                </CardContent>
            </Card>

            {/* Toolbar Examples */}
            <Card className="col-span-12">
                <CardHeader>
                    <CardTitle>Toolbar Örnekleri</CardTitle>
                    <CardDescription>Alignment &amp; CRUD senaryoları</CardDescription>
                </CardHeader>
                <CardContent className="space-y-10">
                    {/* Örnek 1 */}
                    <div>
                        <h2>Alignment Left &amp; Right</h2>
                        <Toolbar
                            alignment="left"
                            className="my-custom-toolbar"
                            style={{ backgroundColor: "#fafafa" }}
                            left={
                                <Input
                                    type="search"
                                    placeholder="Arama yap..."
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    style={{ width: 150 }}
                                />
                            }
                            right={
                                <Button onClick={handleShare} style={{ display: "flex", gap: 4 }}>
                                    <Share className="w-4 h-4" />
                                    <span>Paylaş</span>
                                </Button>
                            }
                        />
                    </div>

                    {/* Örnek 2 */}
                    <div>
                        <h2>Alignment Center</h2>
                        <Toolbar alignment="center">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="flex gap-2">
                                        <MoreHorizontal className="w-4 h-4" />
                                        <span>Daha Fazla</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-48">
                                    <DropdownMenuItem onClick={handleOption1}>Seçenek 1</DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleOption2}>Seçenek 2</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </Toolbar>
                    </div>

                    {/* Örnek 3 */}
                    <div>
                        <h2>Editor Toolbar Örneği</h2>
                        <Toolbar
                            alignment="left"
                            className="overflow-x-auto"
                            right={
                                <div className="flex items-center gap-1">
                                    <Separator orientation="vertical" className="mx-2 h-6" />
                                    <a
                                        href="#"
                                        target="_blank"
                                        className="text-sm text-blue-600 hover:underline flex-shrink-0"
                                        style={{ marginRight: 10 }}
                                    >
                                        {lastEditedText}
                                    </a>
                                    <Button variant="default" className="ml-auto flex items-center gap-2 mr-2">
                                        Daha Fazla...
                                    </Button>
                                </div>
                            }
                        >
                            {formatOptions.map((option) => (
                                <Toggle
                                    key={option.value}
                                    pressed={activeFormats.includes(option.value)}
                                    onPressedChange={() => handleFormatClick(option.value)}
                                    style={{ marginRight: 8 }}
                                >
                                    {option.icon}
                                </Toggle>
                            ))}
                            {alignOptions.map((option) => (
                                <Toggle
                                    key={option.value}
                                    pressed={activeAlignment === option.value}
                                    onPressedChange={() => handleAlignClick(option.value)}
                                    style={{ marginRight: 8 }}
                                >
                                    {option.icon}
                                </Toggle>
                            ))}
                        </Toolbar>
                    </div>

                    {/* Örnek 4 */}
                    <div>
                        <h2>CRUD Toolbar Örneği</h2>
                        <Toolbar
                            alignment="left"
                            className="overflow-x-auto"
                            left={
                                <Button variant="default" onClick={() => alert("Yeni kayıt ekleniyor!")}>
                                    Yeni Ekle
                                </Button>
                            }
                            right={
                                <div className="flex gap-2">
                                    <Button variant="outline" onClick={() => alert("Dışa Aktar")}>
                                        Dışa Aktar
                                    </Button>
                                    <Button variant="outline" onClick={() => alert("İçe Aktar")}>
                                        İçe Aktar
                                    </Button>
                                </div>
                            }
                        >
                            <div className="flex items-center gap-2">
                                <Button onClick={() => alert("Kayıt güncelleniyor!")}>Güncelle</Button>
                                <Button variant="destructive" onClick={() => alert("Kayıt siliniyor!")}>
                                    Sil
                                </Button>
                            </div>
                        </Toolbar>
                    </div>
                </CardContent>
            </Card>
        </div >
    );

}