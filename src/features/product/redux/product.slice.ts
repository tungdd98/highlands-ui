import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { get } from "lodash";

import {
  ProductDef,
  ProductRequest,
  ProductListResponse,
  ProductParams,
} from "features/product/product";

import api from "../api/product.api";

interface ProductState {
  products: ProductListResponse | null;
  productDetail: ProductDef | null;
  productQuickView: ProductDef | null;
  totalProducts: number;
}

const initialState: ProductState = {
  products: null,
  productDetail: null,
  productQuickView: null,
  totalProducts: 0,
};

export const getProductList = createAsyncThunk<
  ProductListResponse,
  ProductParams
>("product/getProductList", async params => {
  const response = await api.getProductListApi(params);
  return response.data;
});

export const postProduct = createAsyncThunk<null, ProductRequest>(
  "product/postProduct",
  async (data, { rejectWithValue }) => {
    try {
      await api.postProductApi(data);
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

export const deleteProduct = createAsyncThunk<number, number>(
  "product/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await api.deleteProductApi(productId);
      return productId;
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

export const getProductDetail = createAsyncThunk<ProductDef, number>(
  "product/getProductDetail",
  async productId => {
    const response = await api.getProductDetailApi(productId);
    return response.data;
  }
);

export const putProduct = createAsyncThunk<
  null,
  { productId: number; data: ProductRequest }
>("product/putProduct", async ({ productId, data }, { rejectWithValue }) => {
  try {
    await api.putProductApi(productId, data);
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

export const getTotalProducts = createAsyncThunk<number>(
  "product/getTotalProducts",
  async () => {
    const response = await api.getTotalProductsApi();
    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setQuickProduct: (state, action: PayloadAction<ProductDef | null>) => {
      state.productQuickView = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getProductList.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(getProductList.rejected, state => {
      state.products = null;
    });
    builder.addCase(getProductDetail.fulfilled, (state, action) => {
      state.productDetail = action.payload;
    });
    builder.addCase(getProductDetail.rejected, state => {
      state.productDetail = null;
    });
    builder.addCase(getTotalProducts.fulfilled, (state, action) => {
      state.totalProducts = action.payload || 0;
    });
  },
});

export const { setQuickProduct } = productSlice.actions;
export const productReducer = productSlice.reducer;
