import React, { FC, memo } from "react";

import { AcUnitRounded } from "@mui/icons-material";
import { Paper, Typography, Box, Button } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { Form, Formik, FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import FormikTextField from "components/FormElements/FormikTextField/FormikTextField";
import {
  loginInitialValues,
  LoginRequest,
  loginSchema,
  postLogin,
} from "features/auth/auth";
import { handleErrorResponse } from "helpers/forms/handle-error-response";
import { useAppDispatch } from "redux/store";
import { ROOT_ROUTE } from "routes/routes.config";

const LoginScreen: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleSubmit = (
    values: LoginRequest,
    { setSubmitting }: FormikHelpers<LoginRequest>
  ) => {
    dispatch(postLogin(values))
      .then(unwrapResult)
      .then(() => history.push(ROOT_ROUTE))
      .catch(() => handleErrorResponse({ dispatch }))
      .finally(() => setSubmitting(false));
  };

  return (
    <Paper elevation={10} sx={{ px: 3, py: 5, width: "100%" }}>
      <Box textAlign="center">
        <AcUnitRounded fontSize="large" color="primary" />
        <Typography variant="h5" fontWeight={600}>
          {t("common.Login", { ns: "admin" })}
        </Typography>
      </Box>
      <Formik
        initialValues={loginInitialValues}
        validationSchema={loginSchema}
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
                name="password"
                type="password"
                label="Password"
                placeholder="********"
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
              {t("button.Login", { ns: "admin" })}
            </Button>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default memo(LoginScreen);
