import * as yup from "yup";

import { UserDef, UserParams, UserRequest } from "features/user/user";

export const searchSchema = yup.object().shape({
  id: yup.number(),
  email: yup.string().email().max(255),
  name: yup.string().max(255),
});

export const searchInitialValues: UserParams = {
  id: "",
  email: "",
  name: "",
  page: 1,
  perPage: 5,
};

export const editSchema = yup.object().shape({
  email: yup.string().email().required().max(255),
  name: yup.string().required().max(255),
  phone: yup.string().max(255),
  address: yup.string().max(255),
});

export const editInitialValues: UserRequest = {
  email: "",
  name: "",
};

export const convertResponseToFormData = ({
  email,
  name,
  roles,
}: UserDef): UserRequest => {
  return {
    email,
    name,
    roles,
  };
};
