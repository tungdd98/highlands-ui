import { AxiosResponse } from "axios";

import { api } from "api/api";
import {
  RegisterRequest,
  AuthEndpointsEnum,
  LoginRequest,
} from "features/auth/auth";

const postRegisterApi = (data: RegisterRequest): Promise<AxiosResponse> => {
  return api.post(AuthEndpointsEnum.REGISTER, data);
};

const postLoginApi = (data: LoginRequest): Promise<AxiosResponse> => {
  return api.post(AuthEndpointsEnum.LOGIN, data);
};

const authApi = {
  postRegisterApi,
  postLoginApi,
};

export default authApi;
