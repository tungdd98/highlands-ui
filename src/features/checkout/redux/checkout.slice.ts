import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { get } from "lodash";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

import {
  CartDef,
  calculateTotal,
  LocationRequest,
} from "features/checkout/checkout";
import { ProductDef } from "features/product/product";
import { LocationDef } from "features/user/user";

import api from "../api/checkout.api";
import { OrderRequest, OrderDetail } from "../types/checkout.types";

interface CheckoutState {
  isOpenDrawerCart: boolean;
  carts: Record<number, CartDef>;
  totalQuantity: number;
  totalMoney: number;
  deliveryId: number | null;
  paymentId: number | null;
  location: LocationDef | null;
  orderSuccess: OrderDetail | null;
}

const initialState: CheckoutState = {
  isOpenDrawerCart: false,
  carts: {},
  totalQuantity: 0,
  totalMoney: 0,
  deliveryId: null,
  paymentId: null,
  location: null,
  orderSuccess: null,
};

export const postUserLocation = createAsyncThunk<LocationDef, LocationRequest>(
  "checkout/postUserLocation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.postUserLocationApi(data);
      return response.data;
    } catch (error) {
      const err = get(error, "data.error");
      if (!err) {
        throw err;
      } else {
        return rejectWithValue(err);
      }
    }
  }
);

export const deleteUserLocation = createAsyncThunk<number, number>(
  "checkout/deleteUserLocation",
  async (deliveryId, { rejectWithValue }) => {
    try {
      await api.deleteUserLocationApi(deliveryId);
      return deliveryId;
    } catch (error) {
      const err = get(error, "data.error");
      if (!err) {
        throw err;
      } else {
        return rejectWithValue(err);
      }
    }
  }
);

export const postOrder = createAsyncThunk<null, OrderRequest>(
  "checkout/postOrder",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.postOrderApi(data);
      return response.data;
    } catch (error) {
      const err = get(error, "data.error");
      if (!err) {
        throw err;
      } else {
        return rejectWithValue(err);
      }
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setIsOpenDrawerCart: (state, action) => {
      state.isOpenDrawerCart = action.payload;
    },
    addProductToCart: (
      state,
      action: PayloadAction<{ quantity: number; product: ProductDef }>
    ) => {
      const { quantity, product } = action.payload;
      if (product.id in state.carts) {
        const cart = state.carts[product.id];
        state.carts = {
          ...state.carts,
          [product.id]: {
            ...cart,
            quantity: cart.quantity + quantity,
          },
        };
      } else {
        state.carts = {
          ...state.carts,
          [product.id]: action.payload,
        };
      }
      const { totalQuantity, totalMoney } = calculateTotal(state.carts);
      state.totalQuantity = totalQuantity;
      state.totalMoney = totalMoney;
    },
    deleteCart: (state, action: PayloadAction<number>) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [action.payload]: value, ...newCarts } = state.carts;
      state.carts = { ...newCarts };
      const { totalQuantity, totalMoney } = calculateTotal(newCarts);
      state.totalQuantity = totalQuantity;
      state.totalMoney = totalMoney;
    },
    changeQuantityProduct: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const cart = state.carts[id];
      state.carts = {
        ...state.carts,
        [id]: {
          ...cart,
          quantity: cart.quantity + quantity,
        },
      };
      const { totalQuantity, totalMoney } = calculateTotal(state.carts);
      state.totalQuantity = totalQuantity;
      state.totalMoney = totalMoney;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setDeliveryId: (state, action) => {
      state.deliveryId = action.payload;
    },
    setPaymentId: (state, action) => {
      state.paymentId = action.payload;
    },
    removeOrderSuccess: state => {
      state.orderSuccess = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.deliveryId = null;
      state.location = null;
      state.paymentId = null;
      state.carts = {};
      state.totalMoney = 0;
      state.totalQuantity = 0;
      state.orderSuccess = action.payload;
    });
  },
});

const checkoutConfig = {
  key: "checkout",
  storage,
};

export const {
  setIsOpenDrawerCart,
  addProductToCart,
  deleteCart,
  changeQuantityProduct,
  setLocation,
  setDeliveryId,
  setPaymentId,
  removeOrderSuccess,
} = checkoutSlice.actions;

export const checkoutReducer = persistReducer(
  checkoutConfig,
  checkoutSlice.reducer
);
