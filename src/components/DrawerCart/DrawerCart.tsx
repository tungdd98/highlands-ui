import React, { FC, useMemo } from "react";

import { Box, Button, Divider, Drawer, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import {
  CheckoutPathsEnum,
  setIsOpenDrawerCart,
} from "features/checkout/checkout";
import { toCurrency } from "helpers/converts/currency";
import { useAppDispatch, useAppSelector } from "redux/store";

import CartItem from "./CartItem";

const DrawerCart: FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const dispatch = useAppDispatch();
  const { isOpenDrawerCart, totalMoney, carts } = useAppSelector(
    state => state.checkout
  );

  const listCart = useMemo(() => Object.values(carts), [carts]);

  const handleClose = () => {
    dispatch(setIsOpenDrawerCart(false));
  };

  const handleRedirectCheckoutPage = () => {
    dispatch(setIsOpenDrawerCart(false));
    history.push(CheckoutPathsEnum.CART);
  };

  return (
    <Drawer
      anchor="right"
      open={isOpenDrawerCart}
      onClose={handleClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        width: 380,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 380,
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Typography sx={{ p: 2, fontWeight: 600 }} variant="h5">
          {t("common.Shopping Cart", { ns: "client" })}
        </Typography>
        <Divider />
        <Box sx={{ flex: 1, p: 2 }}>
          {listCart.length ? (
            listCart.map(item => <CartItem key={item.product.id} {...item} />)
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img
                src="https://cartsy.redq.io/wp-content/themes/cartsy/assets/images/not-found-alt.svg"
                alt="no products"
              />
              <Typography sx={{ mt: 2 }}>
                {t("common.No products", { ns: "client" })}
              </Typography>
            </Box>
          )}
        </Box>
        <Box sx={{ p: 2 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={!listCart.length}
            onClick={handleRedirectCheckoutPage}
          >
            {t("common.Proceed To Checkout", { ns: "client" })} |{" "}
            {toCurrency(totalMoney)}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default DrawerCart;
