import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";

import { toCamel } from "helpers/transforms/convert-object-keys";
import { trimValue } from "helpers/transforms/trim-values";

/**
 * Adds authorization headers to API calls
 * @param {AxiosRequestConfig} request
 */
const authInterceptor = (request: AxiosRequestConfig) => {
  const requestConfig = trimValue(request);
  requestConfig.params = toCamel(requestConfig.params);
  requestConfig.data = toCamel(requestConfig.data, true);

  const token = "";
  if (token) {
    requestConfig.headers.Authorization = `Bearer ${token}`;
  }

  return requestConfig;
};

/**
 * Axios response interceptors
 * @param {AxiosResponse} response
 */
const responseInterceptor = (response: AxiosResponse) => {
  response.data = toCamel(response.data);
  return response;
};

/**
 * Axios error interceptor
 * @param {AxiosError} axiosError
 */
const errorInterceptor = (axiosError: AxiosError) => {
  if (axiosError && axiosError.response) {
    // TODO: Handle error here
    return Promise.reject(axiosError.response);
  }
  return Promise.reject(axiosError);
};
/** Setup an API instance */
export const api = axios.create({
  baseURL: process.env.REACT_APP_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

/** Add interceptor */
api.interceptors.request.use(authInterceptor);
api.interceptors.response.use(responseInterceptor, errorInterceptor);
