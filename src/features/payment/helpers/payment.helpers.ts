import * as yup from "yup";

import {
  PaymentDef,
  PaymentParams,
  PaymentRequest,
} from "features/payment/payment";

export const searchSchema = yup.object().shape({
  id: yup.number(),
  title: yup.string().max(255),
});

export const searchInitialValues: PaymentParams = {
  id: "",
  title: "",
  page: 1,
  perPage: 5,
};

export const editSchema = yup.object().shape({
  title: yup.string().required().max(255),
  description: yup.string().max(255),
});

export const editInitialValues: PaymentRequest = {
  title: "",
  description: "",
};

export const convertResponseToFormData = (
  payment: PaymentDef
): PaymentRequest => {
  return { ...payment };
};
