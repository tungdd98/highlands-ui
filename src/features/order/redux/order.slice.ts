import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";

import {
  OrderParams,
  OrderListResponse,
  OrderStatusEnum,
  OrderDetailDef,
  StatisticalParams,
} from "features/order/order";

import api from "../api/order.api";

interface OrderState {
  orders: OrderListResponse | null;
  completed: {
    totalQuantityOrders: number;
    totalMoneyOrders: number;
    totalOrders: number;
    percentQuantity: number;
    percentMoney: number;
    percentOrder: number;
  };
  totalOrders: number;
}

const initialState: OrderState = {
  orders: null,
  completed: {
    totalQuantityOrders: 0,
    totalMoneyOrders: 0,
    totalOrders: 0,
    percentQuantity: 0,
    percentMoney: 0,
    percentOrder: 0,
  },
  totalOrders: 0,
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

export const getTotalQuantityOrdersCompleted = createAsyncThunk<
  number,
  StatisticalParams
>("order/getTotalQuantityOrdersCompleted", async params => {
  const response = await api.getTotalQuantityOrdersCompletedApi(params);
  return response.data;
});

export const getTotalMoneyOrdersCompleted = createAsyncThunk<
  number,
  StatisticalParams
>("order/getTotalMoneyOrdersCompleted", async params => {
  const response = await api.getTotalMoneyOrdersCompletedApi(params);
  return response.data;
});

export const getTotalOrdersCompleted = createAsyncThunk<
  number,
  StatisticalParams
>("order/getTotalOrdersCompleted", async params => {
  const response = await api.getTotalOrdersCompletedApi(params);
  return response.data;
});

export const getTotalOrders = createAsyncThunk<number>(
  "order/getTotalOrders",
  async () => {
    const response = await api.getTotalOrdersApi();
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
    builder.addCase(
      getTotalQuantityOrdersCompleted.fulfilled,
      (state, action) => {
        const { endTime } = action.meta.arg;
        const totalQuantityOrders = action.payload || 0;

        if (endTime) {
          state.completed.percentQuantity = totalQuantityOrders
            ? +(
                ((state.completed.totalQuantityOrders - totalQuantityOrders) /
                  totalQuantityOrders) *
                100
              ).toFixed(2)
            : 100;
        } else {
          state.completed.totalQuantityOrders = totalQuantityOrders;
        }
      }
    );
    builder.addCase(getTotalMoneyOrdersCompleted.fulfilled, (state, action) => {
      const { endTime } = action.meta.arg;
      const totalMoneyOrders = action.payload || 0;

      if (endTime) {
        state.completed.percentMoney = totalMoneyOrders
          ? +(
              ((state.completed.totalMoneyOrders - totalMoneyOrders) /
                totalMoneyOrders) *
              100
            ).toFixed(2)
          : 100;
      } else {
        state.completed.totalMoneyOrders = totalMoneyOrders;
      }
    });
    builder.addCase(getTotalOrdersCompleted.fulfilled, (state, action) => {
      const { endTime } = action.meta.arg;
      const totalOrders = action.payload || 0;

      if (endTime) {
        state.completed.percentOrder = totalOrders
          ? +(
              ((state.completed.totalOrders - totalOrders) / totalOrders) *
              100
            ).toFixed(2)
          : 100;
      } else {
        state.completed.totalOrders = totalOrders;
      }
    });
    builder.addCase(getTotalOrders.fulfilled, (state, action) => {
      state.totalOrders = action.payload;
    });
  },
});

export const orderReducer = orderSlice.reducer;
