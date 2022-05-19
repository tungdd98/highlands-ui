import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { get } from "lodash";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import {
  RegisterRequest,
  LoginRequest,
  LoginResponse,
} from "features/auth/auth";
import { LocationDef, RolesEnum } from "features/user/user";

import api from "../api/auth.api";

interface AuthState {
  userInfo:
    | (LoginResponse & {
        isAdminUser: boolean;
      })
    | null;
}

const initialState: AuthState = {
  userInfo: null,
};

export const postRegister = createAsyncThunk<null, RegisterRequest>(
  "auth/postRegister",
  async (data, { rejectWithValue }) => {
    try {
      await api.postRegisterApi(data);
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

export const postLogin = createAsyncThunk<LoginResponse, LoginRequest>(
  "auth/postLogin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.postLoginApi(data);
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: state => {
      state.userInfo = null;
    },
    addUserLocation: (state, action: PayloadAction<LocationDef>) => {
      if (state.userInfo) {
        state.userInfo.locations.push(action.payload);
      }
    },
    removeUserLocation: (state, action: PayloadAction<number>) => {
      if (state.userInfo) {
        state.userInfo.locations = state.userInfo.locations.filter(
          item => item.id !== action.payload
        );
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(postLogin.fulfilled, (state, action) => {
      const isAdminUser = action.payload.roles.some(
        role => role !== RolesEnum.USER
      );
      state.userInfo = {
        ...action.payload,
        isAdminUser,
      };
    });
    builder.addCase(postLogin.rejected, state => {
      state.userInfo = null;
    });
  },
});

const authConfig = {
  key: "auth",
  storage,
  whitelist: ["userInfo"],
};

export const { logout, addUserLocation, removeUserLocation } =
  authSlice.actions;
export const authReducer = persistReducer(authConfig, authSlice.reducer);
