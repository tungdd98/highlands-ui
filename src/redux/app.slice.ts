import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

import { LANGUAGE_OPTIONS } from "constants/common.constants";
import { LanguageOption } from "types/app.types";

interface AppState {
  language: LanguageOption;
}

const initialState: AppState = {
  language: LANGUAGE_OPTIONS[0],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

const appConfig = {
  key: "app",
  storage,
  whitelist: ["language"],
};

export const { setLanguage } = appSlice.actions;

export const appReducer = persistReducer(appConfig, appSlice.reducer);
