import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TreeTableNode } from "xyz-comp";

interface MyData {
  name: string;
  size: string;
  type: string;
}

interface TreeTableState {
  data: TreeTableNode<MyData>[];
}

const initialState: TreeTableState = {
  data: [
    {
      id: "1",
      data: { name: "Folder 1", size: "1 MB", type: "Folder" },
      children: [
        {
          id: "1-1",
          data: { name: "File 1-1", size: "200 KB", type: "Folder" },
          children: [
            {
              id: "1-1-1",
              data: { name: "File 2-1", size: "300 KB", type: "File" },
            },
          ],
        },
        {
          id: "1-2",
          data: { name: "File 1-2", size: "150 KB", type: "File" },
        },
      ],
    },
    {
      id: "2",
      data: { name: "Folder 2", size: "2 MB", type: "Folder" },
      children: [
        {
          id: "2-1",
          data: { name: "File 2-1", size: "300 KB", type: "File" },
        },
      ],
    },
    {
      id: "3",
      data: { name: "File 3", size: "400 KB", type: "File" },
      children: [
        {
          id: "3-1",
          data: { name: "File 3-1", size: "300 KB", type: "File" },
        },
      ],
    },
    {
      id: "4",
      data: { name: "Folder 4", size: "800 KB", type: "Folder" },
      children: [
        {
          id: "4-1",
          data: { name: "File 4-1", size: "350 KB", type: "File" },
        },
      ],
    },
    {
      id: "5",
      data: { name: "File 5", size: "450 KB", type: "File" },
      children: [
        {
          id: "5-1",
          data: { name: "File 5-1", size: "320 KB", type: "File" },
        },
      ],
    },
    {
      id: "6",
      data: { name: "Folder 6", size: "1.2 MB", type: "Folder" },
      children: [
        {
          id: "6-1",
          data: { name: "File 6-1", size: "400 KB", type: "File" },
        },
        {
          id: "6-2",
          data: { name: "File 6-2", size: "350 KB", type: "File" },
        },
      ],
    },
    {
      id: "7",
      data: { name: "File 7", size: "500 KB", type: "File" },
      children: [],
    },
    {
      id: "8",
      data: { name: "Folder 8", size: "900 KB", type: "Folder" },
      children: [
        {
          id: "8-1",
          data: { name: "File 8-1", size: "400 KB", type: "File" },
        },
      ],
    },
    {
      id: "9",
      data: { name: "File 9", size: "550 KB", type: "File" },
    },
    {
      id: "10",
      data: { name: "Folder 10", size: "1 MB", type: "Folder" },
      children: [
        {
          id: "10-1",
          data: { name: "File 10-1", size: "300 KB", type: "File" },
        },
        {
          id: "10-2",
          data: { name: "File 10-2", size: "350 KB", type: "File" },
        },
      ],
    },
    {
      id: "11",
      data: { name: "File 11", size: "600 KB", type: "File" },
    },
    {
      id: "12",
      data: { name: "Folder 12", size: "1.1 MB", type: "Folder" },
      children: [
        {
          id: "12-1",
          data: { name: "File 12-1", size: "400 KB", type: "File" },
        },
      ],
    },
    {
      id: "13",
      data: { name: "File 13", size: "650 KB", type: "File" },
    },
    {
      id: "14",
      data: { name: "Folder 14", size: "1.3 MB", type: "Folder" },
      children: [
        {
          id: "14-1",
          data: { name: "File 14-1", size: "500 KB", type: "File" },
        },
      ],
    },
    {
      id: "15",
      data: { name: "File 15", size: "700 KB", type: "File" },
    },
    {
      id: "16",
      data: { name: "Folder 16", size: "1.4 MB", type: "Folder" },
      children: [
        {
          id: "16-1",
          data: { name: "File 16-1", size: "550 KB", type: "File" },
        },
        {
          id: "16-2",
          data: { name: "File 16-2", size: "500 KB", type: "File" },
        },
      ],
    },
    {
      id: "17",
      data: { name: "File 17", size: "750 KB", type: "File" },
    },
    {
      id: "18",
      data: { name: "Folder 18", size: "1.5 MB", type: "Folder" },
      children: [
        {
          id: "18-1",
          data: { name: "File 18-1", size: "600 KB", type: "File" },
        },
      ],
    },
    {
      id: "19",
      data: { name: "File 19", size: "800 KB", type: "File" },
    },
    {
      id: "20",
      data: { name: "Folder 20", size: "1.6 MB", type: "Folder" },
      children: [
        {
          id: "20-1",
          data: { name: "File 20-1", size: "650 KB", type: "File" },
        },
        {
          id: "20-2",
          data: { name: "File 20-2", size: "600 KB", type: "File" },
        },
      ],
    },
  ],
};

const treeTableSlice = createSlice({
  name: "treeTable",
  initialState,
  reducers: {
    updateRow(state, action: PayloadAction<{ id: string; newData: MyData }>) {
      const updateNode = (nodes: TreeTableNode<MyData>[]) => {
        for (const node of nodes) {
          if (node.id === action.payload.id) {
            node.data = action.payload.newData;
            return true;
          }
          if (node.children && node.children.length > 0) {
            const found = updateNode(node.children);
            if (found) return true;
          }
        }
        return false;
      };

      updateNode(state.data);
    },
    deleteRow(state, action: PayloadAction<{ id: string }>) {
      const deleteNode = (
        nodes: TreeTableNode<MyData>[]
      ): TreeTableNode<MyData>[] => {
        return nodes.filter((node) => {
          if (node.id === action.payload.id) return false;
          if (node.children && node.children.length > 0) {
            node.children = deleteNode(node.children);
          }
          return true;
        });
      };

      state.data = deleteNode(state.data);
    },
  },
});

export const { updateRow, deleteRow } = treeTableSlice.actions;
export default treeTableSlice.reducer;
