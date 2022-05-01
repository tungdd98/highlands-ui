import React from "react";

import { ViewCarouselRounded } from "@mui/icons-material";

import { BannerPathsEnum } from "features/banner/banner";
import AdminNoSidebar from "layouts/AdminNoSidebar/AdminNoSidebar";
import { RouteItem } from "types/routes.types";

const LIST_SCREEN: RouteItem = {
  id: "banner-list-screen",
  path: BannerPathsEnum.LIST,
  component: React.lazy(() => import("../screens/admin/ListScreen/ListScreen")),
  navigationTitle: "Banners",
  icon: ViewCarouselRounded,
  isPrivateRoute: true,
};

const EDIT_SCREEN: RouteItem = {
  id: "banner-edit-screen",
  path: BannerPathsEnum.EDIT,
  component: React.lazy(() => import("../screens/admin/EditScreen/EditScreen")),
  layout: AdminNoSidebar,
  isPrivateRoute: true,
};

export const BANNER_ROUTES = [LIST_SCREEN, EDIT_SCREEN];
