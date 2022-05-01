import { AxiosResponse } from "axios";

import { api } from "api/api";
import {
  ProductEndpointsEnum,
  ProductRequest,
  ProductParams,
} from "features/product/product";

const getProductListApi = (params: ProductParams): Promise<AxiosResponse> => {
  return api.get(ProductEndpointsEnum.GET_ALL, {
    params,
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

const productApi = {
  getProductListApi,
  postProductApi,
  deleteProductApi,
  getProductDetailApi,
  putProductApi,
};

export default productApi;
