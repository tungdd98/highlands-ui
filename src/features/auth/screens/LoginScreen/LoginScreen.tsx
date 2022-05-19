import React, { FC, memo } from "react";

import { AcUnitRounded } from "@mui/icons-material";
import { Paper, Typography, Box, Button } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { Form, Formik, FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import CustomLink from "components/CustomLink/CustomLink";
import FormikTextField from "components/FormElements/FormikTextField/FormikTextField";
import {
  AuthPathsEnum,
  loginInitialValues,
  LoginRequest,
  loginSchema,
  postLogin,
} from "features/auth/auth";
import { RolesEnum } from "features/user/user";
import { handleErrorResponse } from "helpers/forms/handle-error-response";
import { useAppDispatch } from "redux/store";
import { DASHBOARD_ROUTE, ROOT_ROUTE } from "routes/routes.config";

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
      .then(res => {
        const isAdminUser = res.roles.some(role => role !== RolesEnum.USER);
        history.push(isAdminUser ? DASHBOARD_ROUTE : ROOT_ROUTE);
      })
      .catch(() => handleErrorResponse({ dispatch }))
      .finally(() => setSubmitting(false));
  };

  return (
    <Paper elevation={10} sx={{ px: 3, py: 5, width: "100%" }}>
      <Box sx={{ textAlign: "center" }}>
        <AcUnitRounded fontSize="large" color="primary" />
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
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
            <Box sx={{ mb: 3 }}>
              <FormikTextField
                name="email"
                type="email"
                label="Email"
                placeholder="example@gmail.com"
                fullWidth
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <FormikTextField
                name="password"
                type="password"
                label="Password"
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
              {t("button.Login", { ns: "admin" })}
            </Button>
          </Form>
        )}
      </Formik>

      <CustomLink
        sx={{ mt: 3, color: "primary.main" }}
        to={AuthPathsEnum.REGISTER}
      >
        {t("button.Create new account", { ns: "admin" })}
      </CustomLink>
    </Paper>
  );
};

export default memo(LoginScreen);
