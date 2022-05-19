import React from "react";

import { LocalShippingRounded } from "@mui/icons-material";

import { DeliveryPathsEnum } from "features/delivery/delivery";
import AdminNoSidebar from "layouts/AdminNoSidebar/AdminNoSidebar";
import { RouteItem } from "types/routes.types";

const LIST_SCREEN: RouteItem = {
  id: "delivery-list-screen",
  path: DeliveryPathsEnum.LIST,
  component: React.lazy(() => import("../screens/admin/ListScreen/ListScreen")),
  navigationTitle: "Deliveries",
  icon: LocalShippingRounded,
  isPrivateRoute: true,
  isAdminRoute: true,
};

const EDIT_SCREEN: RouteItem = {
  id: "category-edit-screen",
  path: DeliveryPathsEnum.EDIT,
  component: React.lazy(() => import("../screens/admin/EditScreen/EditScreen")),
  layout: AdminNoSidebar,
  isPrivateRoute: true,
  isAdminRoute: true,
};

export const DELIVERY_ROUTES = [LIST_SCREEN, EDIT_SCREEN];
