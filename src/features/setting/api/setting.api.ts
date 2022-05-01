import { AxiosResponse } from "axios";

import { api } from "api/api";
import {
  SettingEndpointsEnum,
  BasicSettingRequest,
  RoleRequest,
} from "features/setting/setting";

const getSettingPageApi = (): Promise<AxiosResponse> => {
  return api.get(SettingEndpointsEnum.GET_SETTINGS);
};

const postSettingPageApi = (
  data: BasicSettingRequest
): Promise<AxiosResponse> => {
  return api.post(SettingEndpointsEnum.CREATE_SETTINGS, data);
};

const patchSettingPageApi = (
  data: BasicSettingRequest
): Promise<AxiosResponse> => {
  return api.patch(SettingEndpointsEnum.UPDATE_SETTINGS, data);
};

const getListRoleApi = (): Promise<AxiosResponse> => {
  return api.get(SettingEndpointsEnum.GET_ROLES);
};

const postRoleApi = (data: RoleRequest): Promise<AxiosResponse> => {
  return api.post(SettingEndpointsEnum.CREATE_ROLES, data);
};

const settingApi = {
  getSettingPageApi,
  postSettingPageApi,
  patchSettingPageApi,
  getListRoleApi,
  postRoleApi,
};

export default settingApi;
