import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  MenuIcon,
  Grip,
  EllipsisVertical,
  Paperclip,
  CircleCheck,
  Clock,
  Plus,
  Trash,
  Pen,
  Eye,
} from "lucide-react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  GridList,
  List,
  Progress,
  Tabs,
  TabsList,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  BadgeCard,
} from "xyz-comp";
import { isBreakpointAtOrAbove, useBreakpoint } from "@/hooks/useBreakpoint";

import Frederick from "../assets/avatars/Frederick.jpg";
import Joyce from "../assets/avatars/Joyce.jpg";
import Luke from "../assets/avatars/Luke.jpg";
import Eileen from "../assets/avatars/Eileen.jpg";
import Gabriella from "../assets/avatars/Gabriella.jpg";
import Ron from "../assets/avatars/Ron.jpg";
import Thumb20 from "../assets/avatars/thumb-20.jpg";
import Thumb120 from "../assets/avatars/thumb-120.jpg";
import Lloyd from "../assets/avatars/Lloyd.jpg";
import Carolyn from "../assets/avatars/Carolyn.jpg";
import Brittany from "../assets/avatars/Brittany.jpg";
import Samantha from "../assets/avatars/Samantha.jpg";

interface Project {
  id: string;
  name: string;
  type: string;
  attachments: number;
  tasksCompleted: string;
  timeLeft: number;
  progress: number;
  avatars: string[];
}

export default function Analytic() {
  const [selectedTab, setSelectedTab] = useState<"list" | "grid">("grid");
  const { t } = useTranslation();
  const breakpoint = useBreakpoint();

  const projects: Project[] = [
    {
      id: "finance-reviewer-app",
      name: t("projectList.finance-reviewer-app"),
      type: t("projectList.Mobile Application"),
      attachments: 3,
      tasksCompleted: "19/26",
      timeLeft: 14,
      progress: 67,
      avatars: [Frederick, Joyce, Luke, Brittany],
    },
    {
      id: "eMenu-web",
      name: t("projectList.eMenu-web"),
      type: t("projectList.Frontend Web Application"),
      attachments: 6,
      tasksCompleted: "9/18",
      timeLeft: 6,
      progress: 50,
      avatars: [Eileen, Gabriella],
    },
    {
      id: "octonine-pos",
      name: t("projectList.octonine-pos"),
      type: t("projectList.Backend Application"),
      attachments: 8,
      tasksCompleted: "23/78",
      timeLeft: 52,
      progress: 21,
      avatars: [Thumb20, Thumb120, Ron, Samantha, Samantha, Samantha],
    },
    {
      id: "wind-chill-api",
      name: t("projectList.wind-chill-api"),
      type: t("projectList.Backend Services"),
      attachments: 2,
      tasksCompleted: "13/15",
      timeLeft: 2,
      progress: 87,
      avatars: [Lloyd, Carolyn],
    },
    {
      id: "iop-web",
      name: t("projectList.iop-web"),
      type: t("projectList.Web Backend Application"),
      attachments: 8,
      tasksCompleted: "19/27",
      timeLeft: 6,
      progress: 73,
      avatars: [Brittany, Frederick, Samantha, Luke, Luke],
    },
    {
      id: "wind-chill-app",
      name: t("projectList.wind-chill-app"),
      type: t("projectList.Mobile Application"),
      attachments: 5,
      tasksCompleted: "15/36",
      timeLeft: 19,
      progress: 45,
      avatars: [Gabriella, Thumb20, Thumb120],
    },
    {
      id: "eastern-saas",
      name: t("projectList.eastern-saas"),
      type: t("projectList.Web Application"),
      attachments: 12,
      tasksCompleted: "27/32",
      timeLeft: 21,
      progress: 80,
      avatars: [Thumb120, Thumb20],
    },
  ];

  const progressTexts = {
    error: t(""),
    complete: t(""),
    loading: t(""),
  };

  const commonProps = {
    data: projects,
    showCheckbox: true,
    selectionMode: "multiple" as const,
    isItemDisabled: () => false,
    loading: false,
    errorMessage: "",
    pagination: false,
    filterFields: ["name", "type"],
  };

  const tabsList = [
    {
      name: t("view.list"),
      value: "list",
      icon: <MenuIcon />,
      iconPlacement: "left",
    },
    {
      name: t("view.grid"),
      value: "grid",
      icon: <Grip />,
      iconPlacement: "left",
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{t("projectList.projects")}</h2>
        <div className="flex items-center justify-center">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList
              variant="default"
              layout="horizontal"
              // @ts-ignore
              tabsList={tabsList}
            />
          </Tabs>
          <Button size="sm">
            <Plus />
            {t("projectList.new")}
          </Button>
        </div>
      </div>

      {selectedTab === "list" ? (
        <List
          {...commonProps}
          selectionMode="none"
          renderItem={(proj) => (
            <Card className="w-full border-none shadow-none hover:shadow-none bg-transparent !p-0 !m-0 gap-5">
              <CardContent className="!p-0 !m-0 grid grid-cols-12 flex-wrap gap-4">
                <div className="md:col-span-4 col-span-12">
                  <CardTitle className="text-base shrink-0 block">
                    {proj.name}
                  </CardTitle>
                  <CardDescription className="shrink-0">
                    {proj.type}
                  </CardDescription>
                </div>
                <div className="md:col-span-8 col-span-12 flex gap-3 items-center flex-wrap">
                  <div className="flex gap-3 w-[110px] items-center">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Paperclip className="w-4 h-4" />
                      <span>{proj.attachments}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <CircleCheck className="w-4 h-4" />
                      <span>{proj.tasksCompleted}</span>
                    </div>
                  </div>
                  {(() => {
                    let colorClasses: string = "";
                    if (proj.timeLeft < 5) {
                      colorClasses = "error";
                    } else if (proj.timeLeft < 15) {
                      colorClasses = "warning";
                    } else if (proj.timeLeft < 30) {
                      colorClasses = "pending";
                    } else {
                      colorClasses = "success";
                    }
                    return (
                      <BadgeCard
                        status={colorClasses as any}
                        className="shrink-0 w-[130px] max-w-[180px]"
                      >
                        <Clock className="shrink-0" />
                        <span>
                          {proj.timeLeft} {t("projectList.daysLeft")}
                        </span>
                      </BadgeCard>
                    );
                  })()}
                  <div className="md:flex-1 w-full">
                    <Progress
                      value={proj.progress}
                      // @ts-ignore
                      className="h-[6px]"
                      texts={progressTexts}
                    />
                  </div>
                  <div className="flex items-center gap-3 md:w-[150px] w-full justify-end">
                    <TooltipProvider>
                      <div className="flex items-center -space-x-3">
                        {proj.avatars.slice(0, 3).map((src, idx) => (
                          <Tooltip key={idx}>
                            <TooltipTrigger asChild>
                              <Avatar className="w-8 h-8" src={src} />
                            </TooltipTrigger>
                            <TooltipContent side="top" align="center">
                              {t("projectList.user")}
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </div>

                      {proj.avatars.length > 3 ? (
                        (() => {
                          const remaining = proj.avatars.length - 3;
                          return (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center justify-center w-6 h-6 rounded-full border-muted-foreground/10 border-[1px] text-xs font-medium text-muted-foreground cursor-pointer">
                                  +{remaining}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent side="top" align="center">
                                {remaining} {t("projectList.more")}
                              </TooltipContent>
                            </Tooltip>
                          );
                        })()
                      ) : (
                        <div className="w-6 h-6"></div>
                      )}
                    </TooltipProvider>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <EllipsisVertical />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuCheckboxItem className="!m-0 !p-2">
                          <span className="mr-2">
                            <Eye className="w-4 h-4" />
                          </span>{" "}
                          {t("projectList.new")}
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem className="!m-0 !p-2">
                          <span className="mr-2">
                            <Pen className="w-4 h-4" />{" "}
                          </span>{" "}
                          {t("projectList.edit")}
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem className="!m-0 !p-2 border-t-[1px] rounded-none">
                          <span className="mr-2">
                            <Trash className="w-4 h-4" />{" "}
                          </span>{" "}
                          {t("projectList.deleteProject")}
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        />
      ) : (
        <GridList
          {...commonProps}
          columns={
            isBreakpointAtOrAbove(breakpoint, "xl")
              ? 4
              : isBreakpointAtOrAbove(breakpoint, "lg")
              ? 3
              : 1
          }
          selectionMode="none"
          renderItem={(proj) => (
            <Card className="w-full border-none shadow-none hover:shadow-none bg-transparent !p-0 !m-0">
              <CardHeader className="!flex-row justify-between !p-0 mb-4">
                <div>
                  <CardTitle className="text-base">{proj.name}</CardTitle>
                  <CardDescription>{proj.type}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      <EllipsisVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuCheckboxItem className="!m-0 !p-2">
                      <span className="mr-2">
                        <Eye className="w-4 h-4" />
                      </span>{" "}
                      {t("projectList.new")}
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem className="!m-0 !p-2">
                      <span className="mr-2">
                        <Pen className="w-4 h-4" />{" "}
                      </span>{" "}
                      {t("projectList.edit")}
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem className="!m-0 !p-2 border-t-[1px] rounded-none">
                      <span className="mr-2">
                        <Trash className="w-4 h-4" />{" "}
                      </span>{" "}
                      {t("projectList.deleteProject")}
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>

              <CardContent className="!p-0 !m-0">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Paperclip className="w-4 h-4" />
                    <span>{proj.attachments}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <CircleCheck className="w-4 h-4" />
                    <span>{proj.tasksCompleted}</span>
                  </div>
                  <BadgeCard
                    status={
                      proj.timeLeft < 5
                        ? "error"
                        : proj.timeLeft < 15
                        ? "warning"
                        : "success"
                    }
                  >
                    <Clock className="w-4 h-4" />
                    {`${proj.timeLeft} ${t("projectList.daysLeft")}`}
                  </BadgeCard>
                </div>
                <div className="w-full mt-6 p-2">
                  <Progress
                    value={proj.progress}
                    // @ts-ignore
                    className="h-[6px]"
                    texts={progressTexts}
                  />
                </div>
                <TooltipProvider>
                  <div className="flex items-center gap-2 p-2">
                    {proj.avatars.slice(0, 3).map((src, idx) => (
                      <Tooltip key={idx}>
                        <TooltipTrigger asChild>
                          <Avatar className="w-8 h-8" src={src} />
                        </TooltipTrigger>
                        <TooltipContent side="top" align="center">
                          {t("projectList.user")}
                        </TooltipContent>
                      </Tooltip>
                    ))}

                    {proj.avatars.length > 3 &&
                      (() => {
                        const remaining = proj.avatars.length - 3;
                        return (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center justify-center w-6 h-6 rounded-full border-muted-foreground/10 border-[1px] text-xs font-medium text-muted-foreground cursor-pointer">
                                +{remaining}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="top" align="center">
                              {remaining} {t("projectList.more")}
                            </TooltipContent>
                          </Tooltip>
                        );
                      })()}
                  </div>
                </TooltipProvider>
              </CardContent>
            </Card>
          )}
        />
      )}
    </>
  );
}
