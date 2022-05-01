import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";

import {
  CategoryTypesEnum,
  CategoryDef,
  CategoryRequest,
  CategoryListResponse,
  CategoryParams,
} from "features/category/category";

import api from "../api/category.api";

interface CategoryState {
  categories: CategoryListResponse | null;
  categoryDetail: CategoryDef | null;
  allCategory: CategoryDef[] | null;
}

const initialState: CategoryState = {
  categories: null,
  categoryDetail: null,
  allCategory: null,
};

export const getCategoryList = createAsyncThunk<
  CategoryListResponse,
  CategoryParams
>("category/getCategoryList", async params => {
  const response = await api.getCategoryListApi(params);
  return response.data;
});

export const postCategory = createAsyncThunk<null, CategoryRequest>(
  "category/postCategory",
  async (data, { rejectWithValue }) => {
    try {
      await api.postCategoryApi(data);
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

export const deleteCategory = createAsyncThunk<number, number>(
  "category/deleteCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      await api.deleteCategoryApi(categoryId);
      return categoryId;
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

export const getCategoryDetail = createAsyncThunk<CategoryDef, number>(
  "category/getCategoryDetail",
  async categoryId => {
    const response = await api.getCategoryDetailApi(categoryId);
    return response.data;
  }
);

export const putCategory = createAsyncThunk<
  null,
  { categoryId: number; data: CategoryRequest }
>("category/putCategory", async ({ categoryId, data }, { rejectWithValue }) => {
  try {
    await api.putCategoryApi(categoryId, data);
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

export const getAllCategory = createAsyncThunk<
  CategoryDef[],
  { type?: CategoryTypesEnum }
>("category/getAllCategory", async ({ type }) => {
  const response = await api.getAllCategoryApi(type);
  return response.data;
});

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCategoryList.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(getCategoryList.rejected, state => {
      state.categories = null;
    });
    builder.addCase(getCategoryDetail.fulfilled, (state, action) => {
      state.categoryDetail = action.payload;
    });
    builder.addCase(getCategoryDetail.rejected, state => {
      state.categoryDetail = null;
    });
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      state.allCategory = action.payload;
    });
    builder.addCase(getAllCategory.rejected, state => {
      state.allCategory = null;
    });
  },
});

export const categoryReducer = categorySlice.reducer;
