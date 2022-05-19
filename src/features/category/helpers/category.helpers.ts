import * as yup from "yup";

import { StatusEnum } from "constants/common.constants";
import {
  CategoryTypesEnum,
  CategoryDef,
  CategoryParams,
  CategoryRequest,
} from "features/category/category";

export const searchSchema = yup.object().shape({
  id: yup.string().matches(/^[0-9]*$/g, "validation.number"),
  title: yup.string().max(255),
});

export const searchInitialValues: CategoryParams = {
  id: "",
  title: "",
  type: "",
  status: StatusEnum.DISPLAY,
  page: 1,
  perPage: 5,
};

export const editSchema = yup.object().shape({
  title: yup.string().required("validation.required").max(255),
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
