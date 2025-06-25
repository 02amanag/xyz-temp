import {
  Mail,
  MessageCircleMore,
  ScrollText,
  ShoppingBag,
  Tags,
  User,
  UserRoundPlus,
  UsersRound,
  Lock,
  CreditCard,
  Bell,
  Trash,
} from "lucide-react";
import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  DataTable,
  DatePicker,
  Heading,
  Input,
  Label,
  Switch,
  Tabs,
  TabsList,
} from "xyz-comp";
import Brittany from "../assets/avatars/Brittany.jpg";
import { useTranslation } from "react-i18next";
import InputMask from "react-input-mask";
import visaLogo from "../assets/images/visa.png";
import masterLogo from "../assets/images/master.png";
import { ColumnDef } from "@tanstack/react-table";
import { useIsMobile } from "@/hooks/use-mobile";

type NotificationSetting = {
  id: string;
  icon: React.ReactNode;
  enabled: boolean;
};
interface PaymentMethod {
  id: string;
  type: "visa" | "master";
  last4: string;
  expiry: string;
}

const paymentMethods: PaymentMethod[] = [
  { id: "1", type: "visa", last4: "7260", expiry: "06/22" },
  { id: "2", type: "master", last4: "1272", expiry: "04/21" },
];

const initialSettings: NotificationSetting[] = [
  {
    id: "mentions",
    icon: <Tags className="w-8 h-8 text-primary" />,
    enabled: false,
  },
  {
    id: "follows",
    icon: <UserRoundPlus className="w-8 h-8 text-primary" />,
    enabled: true,
  },
  {
    id: "comments",
    icon: <MessageCircleMore className="w-8 h-8 text-primary" />,
    enabled: true,
  },
  {
    id: "email",
    icon: <Mail className="w-8 h-8 text-primary" />,
    enabled: false,
  },
  {
    id: "newProduct",
    icon: <ShoppingBag className="w-8 h-8 text-primary" />,
    enabled: true,
  },
  {
    id: "groupInvites",
    icon: <UsersRound className="w-8 h-8 text-primary" />,
    enabled: false,
  },
  {
    id: "tasks",
    icon: <ScrollText className="w-8 h-8 text-primary" />,
    enabled: false,
  },
];

function Settings() {
  const [selectedTab, setSelectedTab] = useState("edit-profile");
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  const [settings, setSettings] =
    useState<NotificationSetting[]>(initialSettings);

  const toggle = (id: string) => {
    setSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const months = [
    t("months.january"),
    t("months.february"),
    t("months.march"),
    t("months.april"),
    t("months.may"),
    t("months.june"),
    t("months.july"),
    t("months.august"),
    t("months.september"),
    t("months.october"),
    t("months.november"),
    t("months.december"),
  ];

  const [selectedDate, setSelectDate] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(),
    to: new Date(),
  });

  const [selectedId, setSelectedId] = useState<string>("1");
  const [methods, setMethods] = useState(paymentMethods);

  const handleDelete = (id: string) => {
    setMethods((prev) => prev.filter((m) => m.id !== id));
    if (selectedId === id && methods.length > 1) {
      setSelectedId(methods[0].id);
    }
  };

  const columns: ColumnDef<PaymentMethod>[] = [
    {
      header: t("settings.billing.card"),
      accessorKey: "type",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 p-4">
          <img
            src={row.original.type === "visa" ? visaLogo : masterLogo}
            alt="card"
            className="w-16 h-auto"
          />
          <p>{row.original.type}</p>
        </div>
      ),
    },
    {
      header: t("settings.billing.cardNumber"),
      accessorKey: "last4",
      cell: ({ row }) => (
        <div className="p-4">{`•••• •••• •••• ${row.original.last4}`}</div>
      ),
    },
    {
      header: t("settings.billing.expires"),
      accessorKey: "expiry",
      cell: ({ row }) => <div className="p-4">{row.original.expiry}</div>,
    },
    {
      header: "",
      id: "actions",
      cell: ({ row }) => (
        <div className="p-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row.original.id);
            }}
            className="text-destructive hover:text-destructive"
          >
            <Trash size={18} />
          </button>
        </div>
      ),
    },
  ];

  const tabsList = [
    {
      value: "edit-profile",
      label: t("settings.tabs.editProfile"),
      name: t("settings.tabs.editProfile"),
      icon: <User />,
      iconPlacement: "left" as const,
      content: "",
    },
    {
      value: "change-password",
      label: t("settings.tabs.changePassword"),
      name: t("settings.tabs.changePassword"),
      icon: <Lock />,
      iconPlacement: "left" as const,
      content: "",
    },
    {
      value: "billing",
      label: t("settings.tabs.billing"),
      name: t("settings.tabs.billing"),
      icon: <CreditCard />,
      iconPlacement: "left" as const,
      content: "",
    },
    {
      value: "notification",
      label: t("settings.tabs.notification"),
      name: t("settings.tabs.notification"),
      icon: <Bell />,
      iconPlacement: "left" as const,
      content: "",
    },
  ];

  return (
    <Card className="flex flex-col lg:flex-row">
      <Tabs
        defaultValue="edit-profile"
        value={selectedTab}
        onValueChange={setSelectedTab}
        tabsList={tabsList}
      >
        <br />
        <TabsList
          variant="default"
          layout={isMobile ? "horizontal" : "vertical"}
          tabsList={tabsList}
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="h-full px-5"
        />
      </Tabs>

      {selectedTab === "edit-profile" && (
        <div className="md:border-l p-8 space-y-6 lg:w-[60%]">
          <div className="flex items-center gap-4">
            <Avatar src={Brittany} className="md:size-16 size-10 shrink-0" />
            <Button size={isMobile ? "sm" : "default"}>
              {t("settings.editProfile.changeAvatar")}
            </Button>
            <Button size={isMobile ? "sm" : "default"} variant="outline">
              {t("settings.editProfile.remove")}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{t("settings.editProfile.name")}</Label>
              <Input placeholder={t("settings.editProfile.name")} />
            </div>
            <div>
              <Label>{t("settings.editProfile.username")}</Label>
              <Input placeholder={t("settings.editProfile.username")} />
            </div>
            <div>
              <Label>{t("settings.editProfile.email")}</Label>
              <Input
                type="email"
                placeholder={t("settings.editProfile.email")}
              />
            </div>
            <div>
              <Label>{t("settings.editProfile.dob")}</Label>
              <DatePicker
                months={months}
                date={selectedDate}
                onDateSelect={({ from, to }) => {
                  setSelectDate({ from, to });
                }}
                variant="outline"
                closeOnSelect={true}
                numberOfMonths={1}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{t("settings.editProfile.phone")}</Label>
              <InputMask mask="+90 (599) 999 99 99" maskChar={null}>
                {(inputProps) => <Input {...inputProps} />}
              </InputMask>
            </div>
            <div>
              <Label>{t("settings.editProfile.website")}</Label>
              <Input
                type="url"
                placeholder={t("settings.editProfile.website")}
              />
            </div>
          </div>

          <div>
            <Label>{t("settings.editProfile.address")}</Label>
            <Input placeholder={t("settings.editProfile.address")} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{t("settings.editProfile.city")}</Label>
              <Input placeholder={t("settings.editProfile.city")} />
            </div>
            <div>
              <Label>{t("settings.editProfile.postCode")}</Label>
              <Input placeholder={t("settings.editProfile.postCode")} />
            </div>
          </div>

          <div>
            <Button>{t("settings.editProfile.save")}</Button>
          </div>
        </div>
      )}

      {selectedTab === "change-password" && (
        <div className="md:border-l p-8 space-y-6 lg:w-[30%] h-full overflow-auto">
          <Heading headingLevel="h3">
            {t("settings.changePassword.title")}
          </Heading>
          <Input
            type="password"
            label={t("settings.changePassword.current")}
            autoComplete="off"
            defaultValue={"sifre"}
          />
          <Input
            type="password"
            label={t("settings.changePassword.new")}
            autoComplete="off"
          />
          <Input
            type="password"
            label={t("settings.changePassword.confirm")}
            autoComplete="off"
          />
          <Button>{t("settings.changePassword.submit")}</Button>
        </div>
      )}
      {selectedTab === "billing" && (
        <div className="md:border-l p-8 w-full">
          <Heading headingLevel="h3">{t("settings.billing.title")}</Heading>
          <DataTable
            data={methods}
            columns={columns}
            selectionMode="single"
            selectRowOnClick
            paginator={false}
            header
          />
          <div className="flex justify-end mt-2">
            <Button>{t("settings.billing.addNewCard")}</Button>
          </div>
        </div>
      )}
      {selectedTab === "notification" && (
        <div className="md:border-l p-8 w-full">
          <h3 className="text-lg font-semibold mb-4">
            {t("settings.notificationsTitle")}
          </h3>
          {settings.map(({ id, icon, enabled }) => (
            <div
              key={id}
              className="flex items-center justify-between border-b p-6 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div>{icon}</div>
                <div>
                  <p className="text-base font-medium">
                    {t(`settings.${id}.title`)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t(`settings.${id}.description`)}
                  </p>
                </div>
              </div>

              <Switch checked={enabled} onCheckedChange={() => toggle(id)} />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export default Settings;
