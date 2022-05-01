import { combineReducers } from "@reduxjs/toolkit";

import { articleReducer } from "features/article/article";
import { authReducer } from "features/auth/auth";
import { bannerReducer } from "features/banner/banner";
import { categoryReducer } from "features/category/category";
import { checkoutReducer } from "features/checkout/checkout";
import { deliveryReducer } from "features/delivery/delivery";
import { orderReducer } from "features/order/order";
import { paymentReducer } from "features/payment/payment";
import { productReducer } from "features/product/product";
import { profileReducer } from "features/profile/profile";
import { settingReducer } from "features/setting/setting";
import { userReducer } from "features/user/user";

import { appReducer } from "./app.slice";
import { snackbarReducer } from "./snackbar.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  category: categoryReducer,
  product: productReducer,
  banner: bannerReducer,
  article: articleReducer,
  snackbar: snackbarReducer,
  checkout: checkoutReducer,
  payment: paymentReducer,
  delivery: deliveryReducer,
  profile: profileReducer,
  order: orderReducer,
  app: appReducer,
  setting: settingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
