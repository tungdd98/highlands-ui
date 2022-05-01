import { AxiosResponse } from "axios";

import { api } from "api/api";
import {
  CategoryEndpointsEnum,
  CategoryTypesEnum,
  CategoryRequest,
  CategoryParams,
} from "features/category/category";

const getCategoryListApi = (params: CategoryParams): Promise<AxiosResponse> => {
  return api.get(CategoryEndpointsEnum.GET_ALL, {
    params,
  });
};

const postCategoryApi = (data: CategoryRequest): Promise<AxiosResponse> => {
  return api.post(CategoryEndpointsEnum.CREATE, data);
};

const deleteCategoryApi = (categoryId: number): Promise<AxiosResponse> => {
  return api.delete(
    CategoryEndpointsEnum.DELETE.replace(/:categoryId/, categoryId.toString())
  );
};

const getCategoryDetailApi = (categoryId: number): Promise<AxiosResponse> => {
  return api.get(
    CategoryEndpointsEnum.FIND_BY_ID.replace(
      /:categoryId/,
      categoryId.toString()
    )
  );
};

const putCategoryApi = (
  categoryId: number,
  data: CategoryRequest
): Promise<AxiosResponse> => {
  return api.put(
    CategoryEndpointsEnum.UPDATE.replace(/:categoryId/, categoryId.toString()),
    data
  );
};

const getAllCategoryApi = (
  type?: CategoryTypesEnum
): Promise<AxiosResponse> => {
  return api.get(CategoryEndpointsEnum.ALL, {
    params: {
      type,
    },
  });
};

const categoryApi = {
  getCategoryListApi,
  postCategoryApi,
  deleteCategoryApi,
  getCategoryDetailApi,
  putCategoryApi,
  getAllCategoryApi,
};

export default categoryApi;
