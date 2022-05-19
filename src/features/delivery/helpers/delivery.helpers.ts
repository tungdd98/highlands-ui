import * as yup from "yup";

import {
  DeliveryDef,
  DeliveryParams,
  DeliveryRequest,
} from "features/delivery/delivery";

export const searchSchema = yup.object().shape({
  id: yup.string().matches(/^[0-9]*$/g, "validation.number"),
  title: yup.string().max(255),
});

export const searchInitialValues: DeliveryParams = {
  id: "",
  title: "",
  page: 1,
  perPage: 5,
};

export const editSchema = yup.object().shape({
  title: yup.string().required("validation.required").max(255),
  price: yup.string().required("validation.required"),
});

export const editInitialValues: DeliveryRequest = {
  title: "",
  price: "",
};

export const convertResponseToFormData = (
  delivery: DeliveryDef
): DeliveryRequest => {
  return { ...delivery };
};
