import React from "react";

import { RouteItem } from "types/routes.types";

import { ExamplePathsEnum } from "../constants/example.paths";

const EXAMPLE_SCREEN: RouteItem = {
  id: "example-screen",
  path: ExamplePathsEnum.EXAMPLE,
  component: React.lazy(() => import("../screens/ExampleScreen/ExampleScreen")),
};

export const EXAMPLE_ROUTES = [EXAMPLE_SCREEN];
