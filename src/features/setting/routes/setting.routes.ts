import React from "react";

import { SettingsRounded } from "@mui/icons-material";

import { SettingPathsEnum } from "features/setting/setting";
import AdminNoSidebar from "layouts/AdminNoSidebar/AdminNoSidebar";
import { RouteItem } from "types/routes.types";

const DETAIL_SCREEN: RouteItem = {
  id: "setting-detail-screen",
  path: SettingPathsEnum.DETAIL,
  component: React.lazy(
    () => import("../screens/SettingDetailScreen/SettingDetailScreen")
  ),
  navigationTitle: "Settings",
  icon: SettingsRounded,
  isPrivateRoute: true,
  isAdminRoute: true,
};

const BASIC_SETTING_SCREEN: RouteItem = {
  id: "setting-basic-screen",
  path: SettingPathsEnum.BASIC_SETTING,
  component: React.lazy(
    () => import("../screens/BasicSettingScreen/BasicSettingScreen")
  ),
  isPrivateRoute: true,
  layout: AdminNoSidebar,
  isAdminRoute: true,
};

const ABOUT_PAGE_SCREEN: RouteItem = {
  id: "about-page-screen",
  path: SettingPathsEnum.ABOUT_PAGE,
  component: React.lazy(
    () => import("../screens/AboutPageScreen/AboutPageScreen")
  ),
  isPrivateRoute: true,
  layout: AdminNoSidebar,
  isAdminRoute: true,
};

const DELIVERY_PAGE_SCREEN: RouteItem = {
  id: "delivery-page-screen",
  path: SettingPathsEnum.DELIVERY_PAGE,
  component: React.lazy(
    () => import("../screens/DeliveryPageScreen/DeliveryPageScreen")
  ),
  isPrivateRoute: true,
  layout: AdminNoSidebar,
  isAdminRoute: true,
};

const RETURN_PAGE_SCREEN: RouteItem = {
  id: "return-page-screen",
  path: SettingPathsEnum.RETURN_PAGE,
  component: React.lazy(
    () => import("../screens/ReturnPageScreen/ReturnPageScreen")
  ),
  isPrivateRoute: true,
  layout: AdminNoSidebar,
  isAdminRoute: true,
};

export const SETTING_ROUTES = [
  DETAIL_SCREEN,
  BASIC_SETTING_SCREEN,
  ABOUT_PAGE_SCREEN,
  DELIVERY_PAGE_SCREEN,
  RETURN_PAGE_SCREEN,
];
