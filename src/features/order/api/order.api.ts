import { AxiosResponse } from "axios";

import { api } from "api/api";
import {
  OrderEndpointsEnum,
  OrderParams,
  OrderStatusEnum,
} from "features/order/order";

const getOrderListApi = (params: OrderParams): Promise<AxiosResponse> => {
  return api.get(OrderEndpointsEnum.GET_ALL, {
    params,
  });
};

const patchUpdateStatusApi = (
  orderId: number,
  status: OrderStatusEnum
): Promise<AxiosResponse> => {
  return api.patch(
    OrderEndpointsEnum.UPDATE_STATUS.replace(/:orderId/, orderId.toString()),
    {
      status,
    }
  );
};

const getOrderDetailApi = (orderId: number): Promise<AxiosResponse> => {
  return api.get(
    OrderEndpointsEnum.GET_ORDER_DETAIL.replace(/:orderId/, orderId.toString())
  );
};

const orderApi = {
  getOrderListApi,
  patchUpdateStatusApi,
  getOrderDetailApi,
};

export default orderApi;
