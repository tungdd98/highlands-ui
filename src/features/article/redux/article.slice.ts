import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";

import {
  ArticleDef,
  ArticleRequest,
  ArticleListResponse,
  ArticleParams,
} from "features/article/article";

import api from "../api/article.api";

interface ArticleState {
  articles: ArticleListResponse | null;
  articleDetail: ArticleDef | null;
}

const initialState: ArticleState = {
  articles: null,
  articleDetail: null,
};

export const getArticleList = createAsyncThunk<
  ArticleListResponse,
  ArticleParams
>("article/getArticleList", async params => {
  const response = await api.getArticleListApi(params);
  return response.data;
});

export const postArticle = createAsyncThunk<null, ArticleRequest>(
  "article/postArticle",
  async (data, { rejectWithValue }) => {
    try {
      await api.postArticleApi(data);
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

export const deleteArticle = createAsyncThunk<number, number>(
  "article/deleteArticle",
  async (articleId, { rejectWithValue }) => {
    try {
      await api.deleteArticleApi(articleId);
      return articleId;
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

export const getArticleDetail = createAsyncThunk<ArticleDef, number>(
  "article/getArticleDetail",
  async articleId => {
    const response = await api.getArticleDetailApi(articleId);
    return response.data;
  }
);

export const putArticle = createAsyncThunk<
  null,
  { articleId: number; data: ArticleRequest }
>("article/putArticle", async ({ articleId, data }, { rejectWithValue }) => {
  try {
    await api.putArticleApi(articleId, data);
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

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getArticleList.fulfilled, (state, action) => {
      state.articles = action.payload;
    });
    builder.addCase(getArticleList.rejected, state => {
      state.articles = null;
    });
    builder.addCase(getArticleDetail.fulfilled, (state, action) => {
      state.articleDetail = action.payload;
    });
    builder.addCase(getArticleDetail.rejected, state => {
      state.articleDetail = null;
    });
  },
});

export const articleReducer = articleSlice.reducer;
