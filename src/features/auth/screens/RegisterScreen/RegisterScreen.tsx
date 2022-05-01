import React, { FC, memo } from "react";

import { AcUnitRounded } from "@mui/icons-material";
import { Box, Paper, Typography, Button } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { Form, Formik, FormikHelpers } from "formik";
import { omit } from "lodash";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import FormikTextField from "components/FormElements/FormikTextField/FormikTextField";
import {
  AuthPathsEnum,
  registerInitialValues,
  registerSchema,
  postRegister,
  RegisterForm,
} from "features/auth/auth";
import { handleErrorResponse } from "helpers/forms/handle-error-response";
import { useAppDispatch } from "redux/store";

const RegisterScreen: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleSubmit = (
    values: RegisterForm,
    { setSubmitting }: FormikHelpers<RegisterForm>
  ) => {
    dispatch(postRegister(omit(values, "confirmPassword")))
      .then(unwrapResult)
      .then(() => {
        history.push(AuthPathsEnum.LOGIN);
      })
      .catch(() => handleErrorResponse({ dispatch }))
      .finally(() => setSubmitting(false));
  };

  return (
    <Paper elevation={10} sx={{ px: 3, py: 5, width: "100%" }}>
      <Box textAlign="center">
        <AcUnitRounded fontSize="large" color="primary" />
        <Typography variant="h5" fontWeight={600}>
          {t("label.Register", { ns: "admin" })}
        </Typography>
      </Box>
      <Formik
        initialValues={registerInitialValues}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mb={3}>
              <FormikTextField
                name="email"
                type="email"
                label="Email"
                placeholder="example@gmail.com"
                fullWidth
              />
            </Box>
            <Box mb={3}>
              <FormikTextField
                name="name"
                label="Name"
                placeholder="example"
                fullWidth
              />
            </Box>
            <Box mb={3}>
              <FormikTextField
                name="password"
                type="password"
                label="Password"
                placeholder="Password"
                fullWidth
              />
            </Box>
            <Box mb={3}>
              <FormikTextField
                name="confirmPassword"
                type="password"
                label="Confirm password"
                placeholder="Password"
                fullWidth
              />
            </Box>
            <Button
              variant="contained"
              size="large"
              fullWidth
              type="submit"
              disabled={isSubmitting}
              sx={{ textTransform: "uppercase" }}
            >
              {t("button.Create new account", { ns: "admin" })}
            </Button>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default memo(RegisterScreen);
