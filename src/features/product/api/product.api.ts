import { AxiosResponse } from "axios";

import { api } from "api/api";
import {
  ProductEndpointsEnum,
  ProductRequest,
  ProductParams,
  DEFAULT_PER_PAGE,
} from "features/product/product";

const getProductListApi = (params: ProductParams): Promise<AxiosResponse> => {
  return api.get(ProductEndpointsEnum.GET_ALL, {
    params: {
      ...params,
      perPage: params.perPage || DEFAULT_PER_PAGE,
    },
  });
};

const postProductApi = (data: ProductRequest): Promise<AxiosResponse> => {
  return api.post(ProductEndpointsEnum.CREATE, data);
};

const deleteProductApi = (productId: number): Promise<AxiosResponse> => {
  return api.delete(
    ProductEndpointsEnum.DELETE.replace(/:productId/, productId.toString())
  );
};

const getProductDetailApi = (productId: number): Promise<AxiosResponse> => {
  return api.get(
    ProductEndpointsEnum.FIND_BY_ID.replace(/:productId/, productId.toString())
  );
};

const putProductApi = (
  productId: number,
  data: ProductRequest
): Promise<AxiosResponse> => {
  return api.put(
    ProductEndpointsEnum.UPDATE.replace(/:productId/, productId.toString()),
    data
  );
};

const getTotalProductsApi = (): Promise<AxiosResponse> => {
  return api.get(ProductEndpointsEnum.GET_TOTAL_PRODUCT);
};

const productApi = {
  getProductListApi,
  postProductApi,
  deleteProductApi,
  getProductDetailApi,
  putProductApi,
  getTotalProductsApi,
};

export default productApi;
