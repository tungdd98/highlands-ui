import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("validation.email")
    .required("validation.required")
    .max(255),
  password: yup.string().required("validation.required"),
});

export const loginInitialValues = {
  email: "",
  password: "",
};

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("validation.email")
    .required("validation.required")
    .max(255),
  name: yup.string().required("validation.required").max(255),
  password: yup.string().required("validation.required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "validation.confirmPassword"),
});

export const registerInitialValues = {
  email: "",
  name: "",
  password: "",
  confirmPassword: "",
};
