import React from "react";

import { PersonRounded } from "@mui/icons-material";

import { UserPathsEnum } from "features/user/user";
import AdminNoSidebar from "layouts/AdminNoSidebar/AdminNoSidebar";
import { RouteItem } from "types/routes.types";

const LIST_SCREEN: RouteItem = {
  id: "user-list-screen",
  path: UserPathsEnum.LIST,
  component: React.lazy(() => import("../screens/admin/ListScreen/ListScreen")),
  navigationTitle: "Users",
  icon: PersonRounded,
  isPrivateRoute: true,
};

const EDIT_SCREEN: RouteItem = {
  id: "user-edit-screen",
  path: UserPathsEnum.EDIT,
  component: React.lazy(() => import("../screens/admin/EditScreen/EditScreen")),
  layout: AdminNoSidebar,
  isPrivateRoute: true,
};

export const USER_ROUTES = [LIST_SCREEN, EDIT_SCREEN];
