import * as yup from "yup";

import {
  CategoryTypesEnum,
  CategoryDef,
  CategoryParams,
  CategoryRequest,
} from "features/category/category";

export const searchSchema = yup.object().shape({
  id: yup.number(),
  title: yup.string().max(255),
});

export const searchInitialValues: CategoryParams = {
  id: "",
  title: "",
  type: "",
  page: 1,
  perPage: 5,
};

export const editSchema = yup.object().shape({
  title: yup.string().required().max(255),
  description: yup.string().max(255),
});

export const editInitialValues: CategoryRequest = {
  title: "",
  description: "",
  type: CategoryTypesEnum.PRODUCT,
};

export const convertResponseToFormData = (
  category: CategoryDef
): CategoryRequest => {
  return { ...category };
};
