import { ARTICLE_ROUTES } from "features/article/article";
import { AuthPathsEnum, AUTH_ROUTES } from "features/auth/auth";
import { BANNER_ROUTES } from "features/banner/banner";
import { CATEGORY_ROUTES } from "features/category/category";
import { CHECKOUT_ROUTES } from "features/checkout/checkout";
import { DASHBOARD_ROUTES } from "features/dashboard/dashboard";
import { DELIVERY_ROUTES } from "features/delivery/delivery";
import { EXAMPLE_ROUTES } from "features/example/example";
import { HOME_ROUTES } from "features/home/home";
import { ORDER_ROUTES } from "features/order/order";
import { PAYMENT_ROUTES } from "features/payment/payment";
import { PRODUCT_ROUTES } from "features/product/product";
import { PROFILE_ROUTES } from "features/profile/profile";
import { SETTING_ROUTES } from "features/setting/setting";
import { USER_ROUTES } from "features/user/user";

export const ROOT_ROUTE = "/";
export const AUTH_ROUTE = AuthPathsEnum.LOGIN;

export const ROUTE_LIST = [
  ...DASHBOARD_ROUTES,
  ...USER_ROUTES,
  ...CATEGORY_ROUTES,
  ...PRODUCT_ROUTES,
  ...BANNER_ROUTES,
  ...ARTICLE_ROUTES,
  ...ORDER_ROUTES,
  ...PROFILE_ROUTES,
  ...EXAMPLE_ROUTES,
  ...HOME_ROUTES,
  ...AUTH_ROUTES,
  ...CHECKOUT_ROUTES,
  ...PAYMENT_ROUTES,
  ...DELIVERY_ROUTES,
  ...SETTING_ROUTES,
];
