import { ComponentType, FC } from "react";

import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { RouteComponentProps } from "react-router-dom";

export type RouteItem = {
  /**
   * Unique id for the path
   */
  id: string;
  /**
   * The URL path for when the component should be rendered
   */
  path: string;
  component: ComponentType<RouteComponentProps>;
  /**
   * Layout used for this route
   */
  layout?: FC;
  /**
   * Determine authenticated route
   */
  isPrivateRoute?: boolean;
  /**
   * Determine auth route (login, register, ...)
   */
  isAuthRoute?: boolean;
  /**
   * Navigation title
   */
  navigationTitle?: string;
  /**
   * Icon sidebar
   */
  icon?: OverridableComponent<SvgIconTypeMap> | FC;
  isAdminRoute?: boolean;
};
