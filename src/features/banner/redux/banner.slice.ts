import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";

import {
  BannerDef,
  BannerRequest,
  BannerListResponse,
  BannerParams,
} from "features/banner/banner";

import api from "../api/banner.api";

interface BannerState {
  banners: BannerListResponse | null;
  bannerDetail: BannerDef | null;
  allBanner: BannerDef[] | null;
}

const initialState: BannerState = {
  banners: null,
  bannerDetail: null,
  allBanner: null,
};

export const getBannerList = createAsyncThunk<BannerListResponse, BannerParams>(
  "banner/getBannerList",
  async params => {
    const response = await api.getBannerListApi(params);
    return response.data;
  }
);

export const postBanner = createAsyncThunk<null, BannerRequest>(
  "banner/postBanner",
  async (data, { rejectWithValue }) => {
    try {
      await api.postBannerApi(data);
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

export const deleteBanner = createAsyncThunk<number, number>(
  "banner/deleteBanner",
  async (bannerId, { rejectWithValue }) => {
    try {
      await api.deleteBannerApi(bannerId);
      return bannerId;
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

export const getBannerDetail = createAsyncThunk<BannerDef, number>(
  "banner/getBannerDetail",
  async bannerId => {
    const response = await api.getBannerDetailApi(bannerId);
    return response.data;
  }
);

export const putBanner = createAsyncThunk<
  null,
  { bannerId: number; data: BannerRequest }
>("banner/putBanner", async ({ bannerId, data }, { rejectWithValue }) => {
  try {
    await api.putBannerApi(bannerId, data);
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

export const getAllBanner = createAsyncThunk<BannerDef[]>(
  "banner/getAllBanner",
  async () => {
    const response = await api.getAllBannerApi();
    return response.data;
  }
);

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getBannerList.fulfilled, (state, action) => {
      state.banners = action.payload;
    });
    builder.addCase(getBannerList.rejected, state => {
      state.banners = null;
    });
    builder.addCase(getBannerDetail.fulfilled, (state, action) => {
      state.bannerDetail = action.payload;
    });
    builder.addCase(getBannerDetail.rejected, state => {
      state.bannerDetail = null;
    });
    builder.addCase(getAllBanner.fulfilled, (state, action) => {
      state.allBanner = action.payload;
    });
    builder.addCase(getAllBanner.rejected, state => {
      state.allBanner = null;
    });
  },
});

export const bannerReducer = bannerSlice.reducer;
