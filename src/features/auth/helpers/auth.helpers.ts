import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().required().max(255),
  password: yup.string().required(),
});

export const loginInitialValues = {
  email: "admin@gmail.com",
  password: "123456789",
};

export const registerSchema = yup.object().shape({
  email: yup.string().email().required().max(255),
  name: yup.string().required().max(255),
  password: yup.string().required(),
});

export const registerInitialValues = {
  email: "",
  name: "",
  password: "",
  confirmPassword: "",
};
