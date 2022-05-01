import { AxiosResponse } from "axios";

import { api } from "api/api";
import {
  CheckoutEndpointsEnum,
  LocationRequest,
  OrderRequest,
} from "features/checkout/checkout";

const postUserLocationApi = (data: LocationRequest): Promise<AxiosResponse> => {
  return api.post(CheckoutEndpointsEnum.LOCATION, data);
};

const deleteUserLocationApi = (locationId: number): Promise<AxiosResponse> => {
  return api.delete(
    CheckoutEndpointsEnum.DELETE_LOCATION.replace(
      /:locationId/,
      locationId.toString()
    )
  );
};

const postOrderApi = (data: OrderRequest): Promise<AxiosResponse> => {
  return api.post(CheckoutEndpointsEnum.CREATE_ORDER, data);
};

const checkoutApi = {
  postUserLocationApi,
  deleteUserLocationApi,
  postOrderApi,
};

export default checkoutApi;
