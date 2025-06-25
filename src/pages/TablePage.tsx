import { treeTableData } from "@/utils/constants";
import axios from "axios";
import { CheckCircle2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TreeTable,
  TreeTableColumn,
  TreeTableNode
} from "xyz-comp";

interface MyData {
  name: string;
  body: string;
  email: string;
}

const clientSideColumn: TreeTableColumn<MyData>[] = [
  {
    field: "name", // Bu "field" tablo içi mantıksal isim. 
    header: "Dosya Adı",
    treeColumn: true,
    // asıl ekranda gösterilen veriyi, node.data.name'den alacağız
    render: (node, level) => {
      const isActive = node.data.name === "Folder 1";
      if (level === 0)
        return (
          <div className="flex items-center gap-2">
            {isActive ? (
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            ) : (
              <XCircle className="w-4 h-4 text-red-600" />
            )}
            <span>{isActive ? "Aktif" : "Pasif"}</span>
          </div>
        );
      else
        return node.data.name
    },
    sortable: true,
    filterable: true,
    frozen: true
  },
  {
    field: "size",
    header: "Boyut",
    sortable: true,
    filterable: true,
  },
  {
    field: "type",
    header: "Tip",
    sortable: true,
    filterable: true,
  },
  {
    field: "size",
    header: "Boyut",
    sortable: true,
    filterable: true,
  },
  {
    field: "type",
    header: "Tip",
    sortable: true,
    filterable: true,
  }
];

const columns: TreeTableColumn<MyData>[] = [
  {
    field: "name", // Bu "field" tablo içi mantıksal isim. 
    header: "Name",
    treeColumn: true,
    sortable: true,
    filterable: true,
  },
  {
    field: "email",
    header: "Email",
    sortable: true,
    filterable: true,
  },
  {
    field: "body",
    header: "Body",
    sortable: true,
    filterable: true,
  },
];

function TablePage() {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedItem, setSelectedItem] = useState<TreeTableNode<MyData>[]>([]);

  const RESOURCE = "https://jsonplaceholder.typicode.com/comments";

  useEffect(() => {
    console.log("selectedItem", selectedItem);
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


  const treeTableTexts = {
    globalSearch: t("treetable.globalSearch"),
    columns: t("treetable.columns"),
    filterPlaceholder: t("treetable.filterPlaceholder"),
    operations: t("treetable.operations"),
    edit: t("treetable.edit"),
    delete: t("treetable.delete"),
    show: t("treetable.show"),
    inputPlaceholder: t("treetable.inputPlaceholder"),
    item: t("treetable.item"),
    goTo: t("treetable.goTo"),
    total: t("treetable.total"),
    loading: t("treetable.loading"),
  };


  const users = [
    { id: 1, name: "Ali Yılmaz", email: "ali@example.com" },
    { id: 2, name: "Ayşe Demir", email: "ayse@example.com" },
    { id: 3, name: "Mehmet Kara", email: "mehmet@example.com" },
    { id: 4, name: "Ali Yılmaz", email: "ali@example.com" },
    { id: 5, name: "Ayşe Demir", email: "ayse@example.com" },
    { id: 6, name: "Mehmet Kara", email: "mehmet@example.com" },
    { id: 7, name: "Ali Yılmaz", email: "ali@example.com" },
    { id: 8, name: "Ayşe Demir", email: "ayse@example.com" },
    { id: 9, name: "Mehmet Kara", email: "mehmet@example.com" },
    { id: 10, name: "Ali Yılmaz", email: "ali@example.com" },
  ];

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader>
          <CardTitle>Table Page</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>İsim</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Toplam {users.length} kullanıcı</TableCell>
              </TableRow>
            </TableFooter>
          </Table>

          {/* Saf pagination örneği burada kullanılmıştır */}
          <Pagination
            currentPage={page}
            itemsPerPage={5}
            pageIndex={pageIndex}
            setPage={(page) => setPage(page)}
            setPageIndex={(index) => setPageIndex(index)}
            totalElements={100}
            displayGoToPage
            pagesToShow={5}
            paginationText={{
              go: "Git",
              inputPlaceholder: "Test",
              item: "Nesne",
              show: "Göster"
            }}
            selectItemsPerPage
            setItemsPerPage={(index) => console.log(index)}
          />
        </CardContent>
      </Card>


      <Card>
        <CardHeader>
          <CardTitle>Treetable Page</CardTitle>
        </CardHeader>
        <CardContent>
          {/* ClientSide */}
          <TreeTable
            editable
            pagination
            columns={clientSideColumn}
            data={treeTableData}
            texts={treeTableTexts}
            selectionMode="multiple"
            onSelectionChange={(selected) => setSelectedItem(selected)}
            onRowEditSave={(rowKey, newData) => {
              console.log(rowKey)
              console.log(newData)
            }}
            onRowDelete={(item) => console.log(item)}
          />

          {/* Serverside */}
          {/* <TreeTable
          editable
          pagination
          data={data}
          columns={columns}
          isLoading={loading}
          texts={treeTableTexts}
          pageSize={itemsPerPage}
          selectionMode="multiple"
          currentPage={currentPage}
          totalElements={totalElements}
          setPageSize={setItemsPerPage}
          setCurrentPage={setCurrentPage}
        /> */}
        </CardContent>
      </Card>

    </div>
  );
}

export default TablePage;
