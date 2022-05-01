import { AxiosResponse } from "axios";

import { api } from "api/api";
import {
  DeliveryEndpointsEnum,
  DeliveryRequest,
  DeliveryParams,
} from "features/delivery/delivery";

const getDeliveryListApi = (params: DeliveryParams): Promise<AxiosResponse> => {
  return api.get(DeliveryEndpointsEnum.GET_ALL, {
    params,
  });
};

const postDeliveryApi = (data: DeliveryRequest): Promise<AxiosResponse> => {
  return api.post(DeliveryEndpointsEnum.CREATE, data);
};

const deleteDeliveryApi = (deliveryId: number): Promise<AxiosResponse> => {
  return api.delete(
    DeliveryEndpointsEnum.DELETE.replace(/:deliveryId/, deliveryId.toString())
  );
};

const getDeliveryDetailApi = (deliveryId: number): Promise<AxiosResponse> => {
  return api.get(
    DeliveryEndpointsEnum.FIND_BY_ID.replace(
      /:deliveryId/,
      deliveryId.toString()
    )
  );
};

const putDeliveryApi = (
  deliveryId: number,
  data: DeliveryRequest
): Promise<AxiosResponse> => {
  return api.put(
    DeliveryEndpointsEnum.UPDATE.replace(/:deliveryId/, deliveryId.toString()),
    data
  );
};

const getAllDeliveryApi = (): Promise<AxiosResponse> => {
  return api.get(DeliveryEndpointsEnum.ALL);
};

const deliveryApi = {
  getDeliveryListApi,
  postDeliveryApi,
  deleteDeliveryApi,
  getDeliveryDetailApi,
  putDeliveryApi,
  getAllDeliveryApi,
};

export default deliveryApi;
