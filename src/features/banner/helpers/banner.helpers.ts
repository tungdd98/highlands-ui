import * as yup from "yup";

import {
  BannerStatusEnum,
  BannerDef,
  BannerParams,
  BannerRequest,
} from "features/banner/banner";

export const searchSchema = yup.object().shape({
  id: yup.number(),
  title: yup.string().max(255),
});

export const searchInitialValues: BannerParams = {
  id: "",
  title: "",
  status: "",
  page: 1,
  perPage: 5,
};

export const editSchema = yup.object().shape({
  title: yup.string().max(255),
  link: yup.string().max(255),
  thumbnail: yup.mixed().required(),
});

export const editInitialValues: BannerRequest = {
  title: "",
  link: "",
  thumbnail: "",
  status: BannerStatusEnum.DISPLAY,
};

export const convertResponseToFormData = (banner: BannerDef): BannerRequest => {
  return { ...banner };
};
