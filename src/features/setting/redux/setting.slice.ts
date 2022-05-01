import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";

import {
  SettingDef,
  BasicSettingRequest,
  RoleDef,
} from "features/setting/setting";

import api from "../api/setting.api";
import { INIT_CREATE_ROLES } from "../constants/setting.constants";
import { RoleRequest } from "../types/setting.types";

interface SettingState {
  setting: SettingDef | null;
  roles: RoleDef[] | null;
}

const initialState: SettingState = {
  setting: null,
  roles: null,
};

export const getSettingPage = createAsyncThunk<SettingDef>(
  "setting/getSettingPage",
  async () => {
    const response = await api.getSettingPageApi();
    return response.data;
  }
);

export const postSettingPage = createAsyncThunk<null, BasicSettingRequest>(
  "setting/postSettingPage",
  async (data, { rejectWithValue }) => {
    try {
      await api.postSettingPageApi(data);
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

export const patchSettingPage = createAsyncThunk<null, BasicSettingRequest>(
  "setting/patchSettingPage",
  async (data, { rejectWithValue }) => {
    try {
      await api.patchSettingPageApi(data);
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

export const getRoles = createAsyncThunk<RoleDef[]>(
  "setting/getRoles",
  async () => {
    const response = await api.getListRoleApi();
    return response.data;
  }
);

export const postRoles = createAsyncThunk<null, RoleRequest[]>(
  "setting/postRoles",
  async (data, { rejectWithValue }) => {
    try {
      await Promise.all(data.map(role => api.postRoleApi(role)));
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

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getSettingPage.fulfilled, (state, action) => {
      if (action.payload) {
        state.setting = action.payload;
      }
    });
    builder.addCase(getSettingPage.rejected, state => {
      state.setting = null;
    });
    builder.addCase(getRoles.fulfilled, (state, action) => {
      if (action.payload) {
        state.roles = action.payload;
      }
    });
    builder.addCase(getRoles.rejected, state => {
      state.roles = null;
    });
    builder.addCase(postRoles.fulfilled, state => {
      state.roles = INIT_CREATE_ROLES;
    });
  },
});

export const settingReducer = settingSlice.reducer;
