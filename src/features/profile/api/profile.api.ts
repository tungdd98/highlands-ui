import { AxiosResponse } from "axios";

import { api } from "api/api";
import { ProfileEndpointsEnum } from "features/profile/profile";

const getMyOrderApi = (userId: number): Promise<AxiosResponse> => {
  return api.get(
    ProfileEndpointsEnum.MY_ORDER.replace(/:userId/, userId.toString())
  );
};

const profileApi = {
  getMyOrderApi,
};

export default profileApi;
