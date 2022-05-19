import * as yup from "yup";

import {
  UserDef,
  UserFormData,
  UserParams,
  UserRequest,
} from "features/user/user";

export const searchSchema = yup.object().shape({
  id: yup.string().matches(/^[0-9]*$/g, "validation.number"),
  email: yup.string().email("validation.email").max(255),
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
  email: yup
    .string()
    .email("validation.email")
    .required("validation.required")
    .max(255),
  name: yup.string().required("validation.required").max(255),
  phone: yup.string().max(255),
  address: yup.string().max(255),
});

export const editInitialValues: UserFormData = {
  email: "",
  name: "",
  roles: [],
};

export const convertResponseToFormData = ({
  email,
  name,
  roles,
}: UserDef): UserFormData => {
  return {
    email,
    name,
    roles: roles.map(role => role.toString()),
  };
};

export const convertFormDataToRequestBody = (
  data: UserFormData
): UserRequest => {
  return {
    ...data,
    roles: data.roles.map(role => +role),
  };
};
