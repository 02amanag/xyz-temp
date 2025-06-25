// src/redux/slices/productsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import BlueJacket from "../../assets/images/BlueJacket.jpg";
import WhiteBackpack from "../../assets/images/WhiteBackpack.jpg";
import BlackSneaker from "../../assets/images/BlackSneaker.jpg";
import GrayHoodies from "../../assets/images/GrayHoodies.jpg";
import BlueBackpack from "../../assets/images/BlueBackpack.jpg";
import WhiteSneaker from "../../assets/images/WhiteSneaker.jpg";
import StripAnalogWatch from "../../assets/images/StripAnalogWatch.jpg";
import RedBeatHeadphone from "../../assets/images/RedBeatHeadphone.jpg";
import AppleMacbookPro from "../../assets/images/AppleMacbookPro.jpg";
import BronzeAnalogWatch from "../../assets/images/BronzeAnalogWatch.jpg";

interface Product {
  id: string;
  nameKey: string;
  image: string;
  category: string;
  price: string;
  stock: number;
  status: string;
}

interface ProductsState {
  list: Product[];
  selectedProductId: string | null;
}

const initialState: ProductsState = {
  list: [
    {
      id: "12",
      nameKey: "blueJacket",
      image: BlueJacket,
      category: "cloths",
      price: "$77.00",
      stock: 46,
      status: "inStock",
    },
    {
      id: "13",
      nameKey: "whiteBackpack",
      image: WhiteBackpack,
      category: "bags",
      price: "$139.00",
      stock: 28,
      status: "inStock",
    },
    {
      id: "14",
      nameKey: "blackSneaker",
      image: BlackSneaker,
      category: "shoes",
      price: "$99.00",
      stock: 52,
      status: "inStock",
    },
    {
      id: "15",
      nameKey: "grayHoodies",
      image: GrayHoodies,
      category: "cloths",
      price: "$68.00",
      stock: 92,
      status: "inStock",
    },
    {
      id: "16",
      nameKey: "blueBackpack",
      image: BlueBackpack,
      category: "bags",
      price: "$70.00",
      stock: 0,
      status: "outOfStock",
    },
    {
      id: "17",
      nameKey: "whiteSneaker",
      image: WhiteSneaker,
      category: "shoes",
      price: "$29.00",
      stock: 18,
      status: "inStock",
    },
    {
      id: "18",
      nameKey: "stripAnalogWatch",
      image: StripAnalogWatch,
      category: "watches",
      price: "$389.00",
      stock: 7,
      status: "limitedStock",
    },
    {
      id: "19",
      nameKey: "redBeatHeadphone",
      image: RedBeatHeadphone,
      category: "devices",
      price: "$86.00",
      stock: 0,
      status: "outOfStock",
    },
    {
      id: "20",
      nameKey: "appleMacbookPro",
      image: AppleMacbookPro,
      category: "devices",
      price: "$1,599.00",
      stock: 27,
      status: "inStock",
    },
    {
      id: "21",
      nameKey: "bronzeAnalogWatch",
      image: BronzeAnalogWatch,
      category: "watches",
      price: "$729.00",
      stock: 6,
      status: "limitedStock",
    },
  ],
  selectedProductId: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.list.push(action.payload);
    },
    viewProductDetail(state, action: PayloadAction<string>) {
      state.selectedProductId = action.payload;
    },
    deleteProduct(state, action: PayloadAction<string>) {
      state.list = state.list.filter((p) => p.id !== action.payload);
      if (state.selectedProductId === action.payload) {
        state.selectedProductId = null;
      }
    },
  },
});

export const { addProduct, viewProductDetail, deleteProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
