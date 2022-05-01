import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { OrderDef, OrderStatusEnum } from "features/order/order";

import api from "../api/profile.api";

interface ProfileState {
  orders: OrderDef[] | null;
}

const initialState: ProfileState = {
  orders: null,
};

export const getMyOrder = createAsyncThunk<OrderDef[], number>(
  "profile/getMyOrder",
  async userId => {
    const response = await api.getMyOrderApi(userId);
    return response.data;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    cancelOrder: (state, action) => {
      const orderId = action.payload;
      if (state.orders) {
        state.orders = state.orders.map(item => {
          if (item.id === orderId) {
            return {
              ...item,
              status: OrderStatusEnum.CANCELING,
            };
          }
          return item;
        });
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(getMyOrder.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
    builder.addCase(getMyOrder.rejected, state => {
      state.orders = null;
    });
  },
});

export const { cancelOrder } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
