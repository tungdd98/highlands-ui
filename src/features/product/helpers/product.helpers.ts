import * as yup from "yup";

import {
  ProductStatusEnum,
  ProductIsHotEnum,
  ProductDef,
  ProductParams,
  ProductRequest,
  DEFAULT_SEARCH_PRICE,
} from "features/product/product";

export const searchSchema = yup.object().shape({
  id: yup.string().matches(/^[0-9]*$/g, "validation.number"),
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
  title: yup.string().required("validation.required").max(255),
  description: yup.string().max(255),
  include: yup.string().max(255),
  content: yup.string().max(255),
  price: yup
    .string()
    .matches(/^[0-9]*$/g, "validation.number")
    .min(0, "validation.price"),
  quantity: yup
    .string()
    .matches(/^[0-9]*$/g, "validation.number")
    .min(0, "validation.quantity"),
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

export const initialQueries: ProductParams = {
  page: 1,
};

export const initialQueriesSearchPrice: number[] = [
  DEFAULT_SEARCH_PRICE.MIN,
  DEFAULT_SEARCH_PRICE.DEFAULT,
];
