import React from "react";

import { HomePathsEnum } from "features/home/home";
import { RouteItem } from "types/routes.types";

const ClientLayout = React.lazy(
  () => import("../../../layouts/ClientLayout/ClientLayout")
);

const HOME_SCREEN: RouteItem = {
  id: "home-screen",
  path: HomePathsEnum.HOME,
  component: React.lazy(() => import("../screens/HomeScreen/HomeScreen")),
  layout: ClientLayout,
};

const ABOUT_SCREEN: RouteItem = {
  id: "about-screen",
  path: HomePathsEnum.ABOUT,
  component: React.lazy(() => import("../screens/AboutScreen/AboutScreen")),
  layout: ClientLayout,
};

const RETURN_SCREEN: RouteItem = {
  id: "return-screen",
  path: HomePathsEnum.RETURN,
  component: React.lazy(() => import("../screens/ReturnScreen/ReturnScreen")),
  layout: ClientLayout,
};

const DELIVERY_SCREEN: RouteItem = {
  id: "delivery-screen",
  path: HomePathsEnum.DELIVERY,
  component: React.lazy(
    () => import("../screens/DeliveryScreen/DeliveryScreen")
  ),
  layout: ClientLayout,
};

export const HOME_ROUTES = [
  HOME_SCREEN,
  ABOUT_SCREEN,
  RETURN_SCREEN,
  DELIVERY_SCREEN,
];
