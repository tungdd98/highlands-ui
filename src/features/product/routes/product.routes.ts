import React from "react";

import { AvTimerRounded } from "@mui/icons-material";

import { ProductPathsEnum } from "features/product/product";
import AdminNoSidebar from "layouts/AdminNoSidebar/AdminNoSidebar";
import { RouteItem } from "types/routes.types";

const ClientLayout = React.lazy(
  () => import("../../../layouts/ClientLayout/ClientLayout")
);

const LIST_SCREEN: RouteItem = {
  id: "product-list-screen",
  path: ProductPathsEnum.LIST,
  component: React.lazy(() => import("../screens/admin/ListScreen/ListScreen")),
  navigationTitle: "Products",
  icon: AvTimerRounded,
  isPrivateRoute: true,
};

const EDIT_SCREEN: RouteItem = {
  id: "product-edit-screen",
  path: ProductPathsEnum.EDIT,
  component: React.lazy(() => import("../screens/admin/EditScreen/EditScreen")),
  layout: AdminNoSidebar,
  isPrivateRoute: true,
};

const CLIENT_LIST_SCREEN: RouteItem = {
  id: "product-list-client-screen",
  path: ProductPathsEnum.CLIENT_LIST,
  component: React.lazy(
    () => import("../screens/client/ListScreen/ListScreen")
  ),
  layout: ClientLayout,
};

const CLIENT_DETAIL_SCREEN: RouteItem = {
  id: "product-detail-client-screen",
  path: ProductPathsEnum.CLIENT_DETAIL,
  component: React.lazy(
    () => import("../screens/client/DetailScreen/DetailScreen")
  ),
  layout: ClientLayout,
};

export const PRODUCT_ROUTES = [
  LIST_SCREEN,
  EDIT_SCREEN,
  CLIENT_LIST_SCREEN,
  CLIENT_DETAIL_SCREEN,
];
