import React from "react";

import { RouteItem } from "types/routes.types";

import { AuthPathsEnum } from "../constants/auth.paths";

const AuthLayout = React.lazy(
  () => import("../../../layouts/AuthLayout/AuthLayout")
);

const LOGIN_SCREEN: RouteItem = {
  id: "login-screen",
  path: AuthPathsEnum.LOGIN,
  component: React.lazy(() => import("../screens/LoginScreen/LoginScreen")),
  layout: AuthLayout,
  isAuthRoute: true,
};

const REGISTER_SCREEN: RouteItem = {
  id: "register-screen",
  path: AuthPathsEnum.REGISTER,
  component: React.lazy(
    () => import("../screens/RegisterScreen/RegisterScreen")
  ),
  layout: AuthLayout,
  isAuthRoute: true,
};

export const AUTH_ROUTES = [LOGIN_SCREEN, REGISTER_SCREEN];
