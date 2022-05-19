import React from "react";

import { NewspaperRounded } from "@mui/icons-material";

import { ArticlePathsEnum } from "features/article/article";
import AdminNoSidebar from "layouts/AdminNoSidebar/AdminNoSidebar";
import { RouteItem } from "types/routes.types";

const LIST_SCREEN: RouteItem = {
  id: "article-list-screen",
  path: ArticlePathsEnum.LIST,
  component: React.lazy(() => import("../screens/admin/ListScreen/ListScreen")),
  navigationTitle: "Articles",
  icon: NewspaperRounded,
  isAdminRoute: true,
};

const EDIT_SCREEN: RouteItem = {
  id: "article-edit-screen",
  path: ArticlePathsEnum.EDIT,
  component: React.lazy(() => import("../screens/admin/EditScreen/EditScreen")),
  layout: AdminNoSidebar,
  isAdminRoute: true,
};

export const ARTICLE_ROUTES = [LIST_SCREEN, EDIT_SCREEN];
