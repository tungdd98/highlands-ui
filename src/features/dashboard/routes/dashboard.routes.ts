import React from "react";

import { DashboardPathsEnum } from "features/dashboard/dashboard";
import { RouteItem } from "types/routes.types";

const DASHBOARD_SCREEN: RouteItem = {
  id: "home",
  path: DashboardPathsEnum.DASHBOARD,
  component: React.lazy(
    () => import("../screens/DashboardScreen/DashboardScreen")
  ),
  navigationTitle: "Dashboard",
  isPrivateRoute: true,
  isAdminRoute: true,
};

export const DASHBOARD_ROUTES = [DASHBOARD_SCREEN];
