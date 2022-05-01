import { AxiosResponse } from "axios";

import { api } from "api/api";
import {
  BannerEndpointsEnum,
  BannerRequest,
  BannerParams,
} from "features/banner/banner";

const getBannerListApi = (params: BannerParams): Promise<AxiosResponse> => {
  return api.get(BannerEndpointsEnum.GET_ALL, {
    params,
  });
};

const postBannerApi = (data: BannerRequest): Promise<AxiosResponse> => {
  return api.post(BannerEndpointsEnum.CREATE, data);
};

const deleteBannerApi = (bannerId: number): Promise<AxiosResponse> => {
  return api.delete(
    BannerEndpointsEnum.DELETE.replace(/:bannerId/, bannerId.toString())
  );
};

const getBannerDetailApi = (bannerId: number): Promise<AxiosResponse> => {
  return api.get(
    BannerEndpointsEnum.FIND_BY_ID.replace(/:bannerId/, bannerId.toString())
  );
};

const putBannerApi = (
  bannerId: number,
  data: BannerRequest
): Promise<AxiosResponse> => {
  return api.put(
    BannerEndpointsEnum.UPDATE.replace(/:bannerId/, bannerId.toString()),
    data
  );
};

const getAllBannerApi = (): Promise<AxiosResponse> => {
  return api.get(BannerEndpointsEnum.ALL);
};

const bannerApi = {
  getBannerListApi,
  postBannerApi,
  deleteBannerApi,
  getBannerDetailApi,
  putBannerApi,
  getAllBannerApi,
};

export default bannerApi;
