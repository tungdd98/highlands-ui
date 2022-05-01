import React from "react";

import { CheckoutPathsEnum } from "features/checkout/checkout";
import { RouteItem } from "types/routes.types";

const ClientLayout = React.lazy(
  () => import("../../../layouts/ClientLayout/ClientLayout")
);

const CART_SCREEN: RouteItem = {
  id: "cart-screen",
  path: CheckoutPathsEnum.CART,
  component: React.lazy(() => import("../screens/CartScreen/CartScreen")),
  layout: ClientLayout,
};

const BILLING_ADDRESS_SCREEN: RouteItem = {
  id: "billing-address-screen",
  path: CheckoutPathsEnum.BILLING_AND_ADDRESS,
  component: React.lazy(
    () => import("../screens/BillingAddressScreen/BillingAddressScreen")
  ),
  layout: ClientLayout,
};

const PAYMENT_SCREEN: RouteItem = {
  id: "payment-screen",
  path: CheckoutPathsEnum.PAYMENT,
  component: React.lazy(() => import("../screens/PaymentScreen/PaymentScreen")),
  layout: ClientLayout,
};

export const CHECKOUT_ROUTES = [
  CART_SCREEN,
  BILLING_ADDRESS_SCREEN,
  PAYMENT_SCREEN,
];
