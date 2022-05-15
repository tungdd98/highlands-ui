import { AxiosResponse } from "axios";

import { api } from "api/api";
import { UserEndpointsEnum, UserRequest, UserParams } from "features/user/user";

const getUserListApi = (params: UserParams): Promise<AxiosResponse> => {
  return api.get(UserEndpointsEnum.GET_ALL, {
    params,
  });
};

const postUserApi = (data: UserRequest): Promise<AxiosResponse> => {
  return api.post(UserEndpointsEnum.CREATE, data);
};

const deleteUserApi = (userId: number): Promise<AxiosResponse> => {
  return api.delete(
    UserEndpointsEnum.DELETE.replace(/:userId/, userId.toString())
  );
};

const getUserDetailApi = (userId: number): Promise<AxiosResponse> => {
  return api.get(
    UserEndpointsEnum.FIND_BY_ID.replace(/:userId/, userId.toString())
  );
};

const putUserApi = (
  userId: number,
  data: UserRequest
): Promise<AxiosResponse> => {
  return api.put(
    UserEndpointsEnum.UPDATE.replace(/:userId/, userId.toString()),
    data
  );
};

const getTotalUsersApi = (): Promise<AxiosResponse> => {
  return api.get(UserEndpointsEnum.GET_TOTAL_USERS);
};

const userApi = {
  getUserListApi,
  postUserApi,
  deleteUserApi,
  getUserDetailApi,
  putUserApi,
  getTotalUsersApi,
};

export default userApi;
