import * as yup from "yup";

import {
  ProductStatusEnum,
  ProductIsHotEnum,
  ProductDef,
  ProductParams,
  ProductRequest,
} from "features/product/product";

export const searchSchema = yup.object().shape({
  id: yup.number(),
  title: yup.string().max(255),
});

export const searchInitialValues: ProductParams = {
  id: "",
  title: "",
  isHot: "",
  status: "",
  categoryId: "",
  page: 1,
  perPage: 5,
};

export const editSchema = yup.object().shape({
  title: yup.string().required().max(255),
  description: yup.string().max(255),
  include: yup.string().max(255),
  content: yup.string().max(255),
  price: yup.number().min(0),
  quantity: yup.number().min(0),
});

export const editInitialValues: ProductRequest = {
  title: "",
  description: "",
  content: "",
  include: "",
  thumbnail: "",
  price: "",
  quantity: "",
  categoryId: "",
  isHot: ProductIsHotEnum.NORMAL,
  status: ProductStatusEnum.DISPLAY,
};

export const convertResponseToFormData = (
  product: ProductDef
): ProductRequest => {
  return { ...product };
};

export const initialValuesSort = {
  categoryIds: [""],
  sizes: [""],
  brands: [""],
  price: 0,
};
