import { AxiosResponse } from "axios";

import { api } from "api/api";
import {
  PaymentEndpointsEnum,
  PaymentRequest,
  PaymentParams,
} from "features/payment/payment";

const getPaymentListApi = (params: PaymentParams): Promise<AxiosResponse> => {
  return api.get(PaymentEndpointsEnum.GET_ALL, {
    params,
  });
};

const postPaymentApi = (data: PaymentRequest): Promise<AxiosResponse> => {
  return api.post(PaymentEndpointsEnum.CREATE, data);
};

const deletePaymentApi = (paymentId: number): Promise<AxiosResponse> => {
  return api.delete(
    PaymentEndpointsEnum.DELETE.replace(/:paymentId/, paymentId.toString())
  );
};

const getPaymentDetailApi = (paymentId: number): Promise<AxiosResponse> => {
  return api.get(
    PaymentEndpointsEnum.FIND_BY_ID.replace(/:paymentId/, paymentId.toString())
  );
};

const putPaymentApi = (
  paymentId: number,
  data: PaymentRequest
): Promise<AxiosResponse> => {
  return api.put(
    PaymentEndpointsEnum.UPDATE.replace(/:paymentId/, paymentId.toString()),
    data
  );
};

const getAllPaymentApi = (): Promise<AxiosResponse> => {
  return api.get(PaymentEndpointsEnum.ALL);
};

const paymentApi = {
  getPaymentListApi,
  postPaymentApi,
  deletePaymentApi,
  getPaymentDetailApi,
  putPaymentApi,
  getAllPaymentApi,
};

export default paymentApi;
