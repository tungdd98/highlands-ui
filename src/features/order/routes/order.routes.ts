import React from "react";

import { LocalMallRounded } from "@mui/icons-material";

import { OrderPathsEnum } from "features/order/order";
import { RouteItem } from "types/routes.types";

const LIST_SCREEN: RouteItem = {
  id: "order-list-screen",
  path: OrderPathsEnum.LIST,
  component: React.lazy(() => import("../screens/admin/ListScreen/ListScreen")),
  navigationTitle: "Orders",
  icon: LocalMallRounded,
  isPrivateRoute: true,
  isAdminRoute: true,
};

export const ORDER_ROUTES = [LIST_SCREEN];
