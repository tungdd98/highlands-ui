import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";

import {
  DeliveryDef,
  DeliveryRequest,
  DeliveryListResponse,
  DeliveryParams,
} from "features/delivery/delivery";

import api from "../api/delivery.api";

interface DeliveryState {
  deliveries: DeliveryListResponse | null;
  deliveryDetail: DeliveryDef | null;
  allDelivery: DeliveryDef[] | null;
}

const initialState: DeliveryState = {
  deliveries: null,
  deliveryDetail: null,
  allDelivery: null,
};

export const getDeliveryList = createAsyncThunk<
  DeliveryListResponse,
  DeliveryParams
>("delivery/getDeliveryList", async params => {
  const response = await api.getDeliveryListApi(params);
  return response.data;
});

export const postDelivery = createAsyncThunk<null, DeliveryRequest>(
  "delivery/postDelivery",
  async (data, { rejectWithValue }) => {
    try {
      await api.postDeliveryApi(data);
      return null;
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

export const deleteDelivery = createAsyncThunk<number, number>(
  "delivery/deleteDelivery",
  async (deliveryId, { rejectWithValue }) => {
    try {
      await api.deleteDeliveryApi(deliveryId);
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

export const getDeliveryDetail = createAsyncThunk<DeliveryDef, number>(
  "delivery/getDeliveryDetail",
  async deliveryId => {
    const response = await api.getDeliveryDetailApi(deliveryId);
    return response.data;
  }
);

export const putDelivery = createAsyncThunk<
  null,
  { deliveryId: number; data: DeliveryRequest }
>("delivery/putDelivery", async ({ deliveryId, data }, { rejectWithValue }) => {
  try {
    await api.putDeliveryApi(deliveryId, data);
    return null;
  } catch (error) {
    const err = get(error, "data.error");
    if (!err) {
      throw err;
    } else {
      return rejectWithValue(err);
    }
  }
});

export const getAllDelivery = createAsyncThunk<DeliveryDef[]>(
  "delivery/getAllDelivery",
  async () => {
    const response = await api.getAllDeliveryApi();
    return response.data;
  }
);

const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getDeliveryList.fulfilled, (state, action) => {
      state.deliveries = action.payload;
    });
    builder.addCase(getDeliveryList.rejected, state => {
      state.deliveries = null;
    });
    builder.addCase(getDeliveryDetail.fulfilled, (state, action) => {
      state.deliveryDetail = action.payload;
    });
    builder.addCase(getDeliveryDetail.rejected, state => {
      state.deliveryDetail = null;
    });
    builder.addCase(getAllDelivery.fulfilled, (state, action) => {
      state.allDelivery = action.payload;
    });
    builder.addCase(getAllDelivery.rejected, state => {
      state.allDelivery = null;
    });
  },
});

export const deliveryReducer = deliverySlice.reducer;
