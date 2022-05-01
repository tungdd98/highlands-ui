import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";

import {
  OrderParams,
  OrderListResponse,
  OrderStatusEnum,
  OrderDetailDef,
} from "features/order/order";

import api from "../api/order.api";

interface OrderState {
  orders: OrderListResponse | null;
}

const initialState: OrderState = {
  orders: null,
};

export const getOrderList = createAsyncThunk<OrderListResponse, OrderParams>(
  "order/getOrderList",
  async params => {
    const response = await api.getOrderListApi(params);
    return response.data;
  }
);

export const patchUpdateStatus = createAsyncThunk<
  { orderId: number; status: OrderStatusEnum },
  { orderId: number; status: OrderStatusEnum }
>(
  "order/patchUpdateStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      await api.patchUpdateStatusApi(orderId, status);
      return {
        orderId,
        status,
      };
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

export const getOrderDetail = createAsyncThunk<OrderDetailDef[], number>(
  "order/getOrderDetail",
  async orderId => {
    const response = await api.getOrderDetailApi(orderId);
    return response.data;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getOrderList.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
    builder.addCase(getOrderList.rejected, state => {
      state.orders = null;
    });
    builder.addCase(patchUpdateStatus.fulfilled, (state, action) => {
      const { orderId, status } = action.payload;
      if (state.orders) {
        state.orders.list = state.orders.list.map(item => {
          if (item.id === orderId) {
            return {
              ...item,
              status,
            };
          }
          return item;
        });
      }
    });
  },
});

export const orderReducer = orderSlice.reducer;
