import React from "react";

import { AccountCircleRounded } from "@mui/icons-material";

import { ProfilePathsEnum } from "features/profile/profile";
import { RouteItem } from "types/routes.types";

const ClientLayout = React.lazy(
  () => import("../../../layouts/ClientLayout/ClientLayout")
);

const DETAIL_SCREEN: RouteItem = {
  id: "profile-screen",
  path: ProfilePathsEnum.PROFILE,
  component: React.lazy(
    () => import("../screens/admin/ProfileScreen/ProfileScreen")
  ),
  navigationTitle: "Profile",
  icon: AccountCircleRounded,
  isPrivateRoute: true,
};

const MY_ORDER_SCREEN: RouteItem = {
  id: "my-order-screen",
  path: ProfilePathsEnum.MY_ORDER,
  component: React.lazy(
    () => import("../screens/client/MyOrderScreen/MyOrderScreen")
  ),
  isPrivateRoute: true,
  layout: ClientLayout,
};

export const PROFILE_ROUTES = [DETAIL_SCREEN, MY_ORDER_SCREEN];
