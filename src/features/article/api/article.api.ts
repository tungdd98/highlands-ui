import { AxiosResponse } from "axios";

import { api } from "api/api";
import {
  ArticleEndpointsEnum,
  ArticleRequest,
  ArticleParams,
} from "features/article/article";

const getArticleListApi = (params: ArticleParams): Promise<AxiosResponse> => {
  return api.get(ArticleEndpointsEnum.GET_ALL, {
    params,
  });
};

const postArticleApi = (data: ArticleRequest): Promise<AxiosResponse> => {
  return api.post(ArticleEndpointsEnum.CREATE, data);
};

const deleteArticleApi = (articleId: number): Promise<AxiosResponse> => {
  return api.delete(
    ArticleEndpointsEnum.DELETE.replace(/:articleId/, articleId.toString())
  );
};

const getArticleDetailApi = (articleId: number): Promise<AxiosResponse> => {
  return api.get(
    ArticleEndpointsEnum.FIND_BY_ID.replace(/:articleId/, articleId.toString())
  );
};

const putArticleApi = (
  articleId: number,
  data: ArticleRequest
): Promise<AxiosResponse> => {
  return api.put(
    ArticleEndpointsEnum.UPDATE.replace(/:articleId/, articleId.toString()),
    data
  );
};

const articleApi = {
  getArticleListApi,
  postArticleApi,
  deleteArticleApi,
  getArticleDetailApi,
  putArticleApi,
};

export default articleApi;
