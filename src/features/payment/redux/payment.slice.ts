import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";

import {
  PaymentDef,
  PaymentRequest,
  PaymentListResponse,
  PaymentParams,
} from "features/payment/payment";

import api from "../api/payment.api";

interface PaymentState {
  payments: PaymentListResponse | null;
  paymentDetail: PaymentDef | null;
  allPayment: PaymentDef[] | null;
}

const initialState: PaymentState = {
  payments: null,
  paymentDetail: null,
  allPayment: null,
};

export const getPaymentList = createAsyncThunk<
  PaymentListResponse,
  PaymentParams
>("payment/getPaymentList", async params => {
  const response = await api.getPaymentListApi(params);
  return response.data;
});

export const postPayment = createAsyncThunk<null, PaymentRequest>(
  "payment/postPayment",
  async (data, { rejectWithValue }) => {
    try {
      await api.postPaymentApi(data);
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

export const deletePayment = createAsyncThunk<number, number>(
  "payment/deletePayment",
  async (paymentId, { rejectWithValue }) => {
    try {
      await api.deletePaymentApi(paymentId);
      return paymentId;
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

export const getPaymentDetail = createAsyncThunk<PaymentDef, number>(
  "payment/getPaymentDetail",
  async paymentId => {
    const response = await api.getPaymentDetailApi(paymentId);
    return response.data;
  }
);

export const putPayment = createAsyncThunk<
  null,
  { paymentId: number; data: PaymentRequest }
>("payment/putPayment", async ({ paymentId, data }, { rejectWithValue }) => {
  try {
    await api.putPaymentApi(paymentId, data);
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

export const getAllPayment = createAsyncThunk<PaymentDef[]>(
  "payment/getAllPayment",
  async () => {
    const response = await api.getAllPaymentApi();
    return response.data;
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPaymentList.fulfilled, (state, action) => {
      state.payments = action.payload;
    });
    builder.addCase(getPaymentList.rejected, state => {
      state.payments = null;
    });
    builder.addCase(getPaymentDetail.fulfilled, (state, action) => {
      state.paymentDetail = action.payload;
    });
    builder.addCase(getPaymentDetail.rejected, state => {
      state.paymentDetail = null;
    });
    builder.addCase(getAllPayment.fulfilled, (state, action) => {
      state.allPayment = action.payload;
    });
    builder.addCase(getAllPayment.rejected, state => {
      state.allPayment = null;
    });
  },
});

export const paymentReducer = paymentSlice.reducer;
