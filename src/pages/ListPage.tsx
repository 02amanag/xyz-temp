import axios from "axios";
import { useEffect, useState } from "react";
import { Grip, MenuIcon, ShoppingBag } from "lucide-react";
import { isBreakpointAtOrAbove, useBreakpoint } from "@/hooks/useBreakpoint";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, GridList, Label, List, Skeleton, Tabs, TabsList } from "xyz-comp";

const RESOURCE = "https://jsonplaceholder.typicode.com/comments";

export default function ListPage() {
    const breakpoint = useBreakpoint();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedItem, setSelectedItem] = useState([]);
  const [selectedTab, setSelectedTab] = useState("list");

  const tabsList: any[] = [
    {
      name: "List",
      value: "list",
      icon: <MenuIcon />,
      iconPlacement: "left",
    },
    {
      name: "Grid",
      value: "grid",
      icon: <Grip />,
      iconPlacement: "left",
    },

  ];

  useEffect(() => {
    console.log("selectedItem: ", selectedItem);
  }, [selectedItem])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // setData([])
        setLoading(true)
        const response = await axios.get(RESOURCE, {
          params: {
            _page: currentPage,
            _limit: itemsPerPage,
          },
        });
        const total = Number(response.headers["x-total-count"]);
        setTotalElements(total);

        if (total && (currentPage - 1) * itemsPerPage >= total) {
          if (currentPage !== 1) {
            setCurrentPage(1);
          }
        } else {
          setData(response.data);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage, itemsPerPage]);

  return (
    <Card className="p-10 flex flex-col gap-10">
      <div className="flex items-center justify-end w-full">
        <div className="relative max-w-full">
          <Tabs
            defaultValue={selectedTab}
            onValueChange={setSelectedTab}
            value={selectedTab}
          >
            <TabsList
              variant="default"
              layout="horizontal"
              tabsList={tabsList}
              onValueChange={setSelectedTab}
              value={selectedTab}
            ></TabsList>
          </Tabs>
        </div>
      </div>

      {selectedTab === 'list' ?
        (<List
          renderItem={(item) =>
            <div className="flex justify-between h-full">
              <div className="flex gap-3 items-center">
                <img src="https://primefaces.org/cdn/primereact/images/product/bamboo-watch.jpg" alt="" className="w-52" />
                <div className="flex flex-col gap-2">
                  <Label>{item.email}</Label>
                  <Label>{item.name}</Label>
                  <Label>{item.body}</Label>
                </div>
              </div>

              <div className="flex flex-col gap-3 items-center h-full justify-center">
                <Label>$65</Label>
                <ShoppingBag />
              </div>
            </div>
          }
          numberOfSkeletons={itemsPerPage}
          skeletonTemplate={() =>
            <div className="flex flex-col gap-3">
              {new Array(itemsPerPage).fill(null).map((_, i) => (
                <Skeleton key={i} className="w-full h-40" />
              ))}
            </div>
          }
          data={data}
          showCheckbox={true}
          selectionMode="multiple"
          isItemDisabled={(item) => item.email === "Jayne_Kuhic@sydney.com"}
          striped
          loading={loading}
          filterFields={["email", 'name', 'category']}
          onSelectionChange={(selected: any) => setSelectedItem(selected)}
          errorMessage={error}
          pagination={true}
          pageSize={itemsPerPage}
          setPageSize={setItemsPerPage}
          currentPage={currentPage}
          totalElements={totalElements}
          setCurrentPage={setCurrentPage}
        />
        ) :
        (<GridList
          renderItem={(item) => (
            <Card className="w-full border-none shadow-none hover:shadow-none bg-transparent">
              <CardHeader>
                <CardTitle className="text-base text-wrap whitespace-break-spaces">{item.email}</CardTitle>
                <CardDescription>{item.body}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Kategori: {item.name}</p>
              </CardContent>
            </Card>
          )}
          skeletonTemplate={() =>
            <div className="flex flex-col gap-3">
              {new Array(10).fill(null).map((_, i) => (
                <Skeleton key={i} className="w-full h-40" />
              ))}
            </div>
          }
          data={data}
          columns={isBreakpointAtOrAbove(breakpoint, "xl") ? 4 : isBreakpointAtOrAbove(breakpoint, "lg") ? 3 : 1}
          showCheckbox={true}
          selectionMode="multiple"
          isItemDisabled={(item) => item.email === "Jayne_Kuhic@sydney.com"}
          loading={loading}
          filterFields={["email", 'name', 'category']}
          onSelectionChange={(selected: any) => setSelectedItem(selected)}
          errorMessage={error ?? "Data Bulunamadı"}
          pagination={true}
          pageSize={itemsPerPage}
          setPageSize={setItemsPerPage}
          currentPage={currentPage}
          totalElements={totalElements}
          setCurrentPage={setCurrentPage}
        />
        )
      }
    </Card>
  );
}