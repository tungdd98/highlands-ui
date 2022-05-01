import React from "react";

import { CategoryRounded } from "@mui/icons-material";

import { CategoryPathsEnum } from "features/category/category";
import AdminNoSidebar from "layouts/AdminNoSidebar/AdminNoSidebar";
import { RouteItem } from "types/routes.types";

const LIST_SCREEN: RouteItem = {
  id: "category-list-screen",
  path: CategoryPathsEnum.LIST,
  component: React.lazy(() => import("../screens/admin/ListScreen/ListScreen")),
  navigationTitle: "Categories",
  icon: CategoryRounded,
  isPrivateRoute: true,
};

const EDIT_SCREEN: RouteItem = {
  id: "category-edit-screen",
  path: CategoryPathsEnum.EDIT,
  component: React.lazy(() => import("../screens/admin/EditScreen/EditScreen")),
  layout: AdminNoSidebar,
  isPrivateRoute: true,
};

export const CATEGORY_ROUTES = [LIST_SCREEN, EDIT_SCREEN];
