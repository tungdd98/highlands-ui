import React from "react";

import { PaymentRounded } from "@mui/icons-material";

import { PaymentPathsEnum } from "features/payment/payment";
import AdminNoSidebar from "layouts/AdminNoSidebar/AdminNoSidebar";
import { RouteItem } from "types/routes.types";

const LIST_SCREEN: RouteItem = {
  id: "payment-list-screen",
  path: PaymentPathsEnum.LIST,
  component: React.lazy(() => import("../screens/admin/ListScreen/ListScreen")),
  navigationTitle: "Payments",
  icon: PaymentRounded,
  isPrivateRoute: true,
  isAdminRoute: true,
};

const EDIT_SCREEN: RouteItem = {
  id: "category-edit-screen",
  path: PaymentPathsEnum.EDIT,
  component: React.lazy(() => import("../screens/admin/EditScreen/EditScreen")),
  layout: AdminNoSidebar,
  isPrivateRoute: true,
  isAdminRoute: true,
};

export const PAYMENT_ROUTES = [LIST_SCREEN, EDIT_SCREEN];
