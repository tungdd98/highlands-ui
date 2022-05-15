import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";

import {
  UserDef,
  UserRequest,
  UserListResponse,
  UserParams,
} from "features/user/user";

import api from "../api/user.api";

interface UserState {
  users: UserListResponse | null;
  userDetail: UserDef | null;
  totalUsers: number;
}

const initialState: UserState = {
  users: null,
  userDetail: null,
  totalUsers: 0,
};

export const getUserList = createAsyncThunk<UserListResponse, UserParams>(
  "user/getUserList",
  async params => {
    const response = await api.getUserListApi(params);
    return response.data;
  }
);

export const postUser = createAsyncThunk<null, UserRequest>(
  "user/postUser",
  async (data, { rejectWithValue }) => {
    try {
      await api.postUserApi(data);
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

export const deleteUser = createAsyncThunk<number, number>(
  "user/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await api.deleteUserApi(userId);
      return userId;
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

export const getUserDetail = createAsyncThunk<UserDef, number>(
  "user/getUserDetail",
  async userId => {
    const response = await api.getUserDetailApi(userId);
    return response.data;
  }
);

export const putUser = createAsyncThunk<
  null,
  { userId: number; data: UserRequest }
>("user/putUser", async ({ userId, data }, { rejectWithValue }) => {
  try {
    await api.putUserApi(userId, data);
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

export const getTotalUsers = createAsyncThunk<number>(
  "user/getTotalUsers",
  async () => {
    const response = await api.getTotalUsersApi();
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUserList.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getUserList.rejected, state => {
      state.users = null;
    });
    builder.addCase(getUserDetail.fulfilled, (state, action) => {
      state.userDetail = action.payload;
    });
    builder.addCase(getUserDetail.rejected, state => {
      state.userDetail = null;
    });
    builder.addCase(getTotalUsers.fulfilled, (state, action) => {
      state.totalUsers = action.payload || 0;
    });
  },
});

export const userReducer = userSlice.reducer;
