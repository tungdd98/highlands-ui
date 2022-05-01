import React, { FC, memo, useMemo, useCallback } from "react";

import { ArrowBackIosNewRounded } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableHeadClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import CustomLink from "components/CustomLink/CustomLink";
import {
  CheckoutPathsEnum,
  CHECKOUT_STEPS,
  deleteCart,
} from "features/checkout/checkout";
import { HomePathsEnum } from "features/home/home";
import { useAppDispatch, useAppSelector } from "redux/store";

import CartItem from "../../components/CartItem/CartItem";
import OrderSummary from "../../components/OrderSummary/OrderSummary";

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  [`&.${tableHeadClasses.root}`]: {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.common.black,
  },
}));

const CartScreen: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { carts, totalQuantity } = useAppSelector(state => state.checkout);

  const listCart = useMemo(() => Object.values(carts), [carts]);

  const handleDeleteCart = useCallback(
    (id: number) => {
      dispatch(deleteCart(id));
    },
    [dispatch]
  );

  return (
    <Container>
      <Box mt={2} mb={4}>
        <Breadcrumbs aria-label="breadcrumb">
          <CustomLink to="/">{t("common.Home", { ns: "client" })}</CustomLink>
          <Typography color="text.primary">
            {t("common.Checkout - Cart", { ns: "client" })}
          </Typography>
        </Breadcrumbs>
      </Box>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={8}>
          <Stepper activeStep={0} alternativeLabel>
            {CHECKOUT_STEPS.map(label => (
              <Step key={label}>
                <StepLabel>{t(`common.${label}`, { ns: "client" })}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={6} sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                {t("common.Cart", { ns: "client" })}&nbsp;
              </Typography>
              <Typography>
                ({totalQuantity} {t("common.item", { ns: "client" })})
              </Typography>
            </Box>
            <TableContainer>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <StyledTableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>{t("common.Price", { ns: "client" })}</TableCell>
                    <TableCell>
                      {t("common.Quantity", { ns: "client" })}
                    </TableCell>
                    <TableCell>{t("common.Total", { ns: "client" })}</TableCell>
                    <TableCell align="center" />
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                  {listCart.length ? (
                    listCart.map(item => (
                      <CartItem
                        cart={item}
                        key={item.product.id}
                        handleDeleteCart={handleDeleteCart}
                      />
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5}>
                        {t("common.No products", { ns: "client" })}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Button
            variant="text"
            color="inherit"
            startIcon={<ArrowBackIosNewRounded />}
            component={Link}
            to={HomePathsEnum.HOME}
            sx={{ textTransform: "capitalize" }}
          >
            {t("button.Continue Shopping", { ns: "client" })}
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <OrderSummary />
          <Button
            variant="contained"
            size="large"
            fullWidth
            component={Link}
            to={CheckoutPathsEnum.BILLING_AND_ADDRESS}
            disabled={!totalQuantity}
          >
            {t("button.Check out", { ns: "client" })}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default memo(CartScreen);
