import { AxiosResponse } from "axios";

import { api } from "api/api";
import {
  OrderEndpointsEnum,
  OrderParams,
  OrderStatusEnum,
  StatisticalParams,
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

const getTotalQuantityOrdersCompletedApi = (
  params: StatisticalParams
): Promise<AxiosResponse> => {
  return api.get(OrderEndpointsEnum.GET_TOTAL_QUANTITY_COMPLETED, {
    params,
  });
};

const getTotalMoneyOrdersCompletedApi = (
  params: StatisticalParams
): Promise<AxiosResponse> => {
  return api.get(OrderEndpointsEnum.GET_TOTAL_MONEY_COMPLETED, {
    params,
  });
};

const getTotalOrdersCompletedApi = (
  params: StatisticalParams
): Promise<AxiosResponse> => {
  return api.get(OrderEndpointsEnum.GET_TOTAL_ORDER_COMPLETED, {
    params,
  });
};

const getTotalOrdersApi = (): Promise<AxiosResponse> => {
  return api.get(OrderEndpointsEnum.GET_TOTAL_ORDER);
};

const orderApi = {
  getOrderListApi,
  patchUpdateStatusApi,
  getOrderDetailApi,
  getTotalQuantityOrdersCompletedApi,
  getTotalMoneyOrdersCompletedApi,
  getTotalOrdersCompletedApi,
  getTotalOrdersApi,
};

export default orderApi;
