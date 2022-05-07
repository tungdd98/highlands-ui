import React, { FC, useState } from "react";

import { AddRounded, ArrowBackIosNewRounded } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link, Redirect } from "react-router-dom";

import CustomLink from "components/CustomLink/CustomLink";
import { CheckoutPathsEnum, CHECKOUT_STEPS } from "features/checkout/checkout";
import { useAppSelector } from "redux/store";

import BillingAddress from "../../components/BillingAddress/BillingAddress";
import LocationDialog from "../../components/LocationDialog/LocationDialog";
import OrderSummary from "../../components/OrderSummary/OrderSummary";

const BillingAddressScreen: FC = () => {
  const { t } = useTranslation();

  const {
    auth: { userInfo },
    checkout: { totalQuantity },
  } = useAppSelector(state => state);

  const [isOpenLocationDialog, setIsOpenLocationDialog] = useState(false);

  const handleCloseLocationDialog = () => {
    setIsOpenLocationDialog(false);
  };

  const handleOpenLocationDialog = () => {
    setIsOpenLocationDialog(true);
  };

  if (!totalQuantity) {
    return <Redirect to={CheckoutPathsEnum.CART} />;
  }

  return (
    <Container>
      <Box sx={{ mt: 2, mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <CustomLink to="/">
            <StepLabel>{t("common.Home", { ns: "client" })}</StepLabel>
          </CustomLink>
          <Typography color="text.primary">
            {t("common.Checkout - Billing and address", { ns: "client" })}
          </Typography>
        </Breadcrumbs>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Stepper activeStep={1} alternativeLabel>
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
          {userInfo && userInfo.locations.length ? (
            userInfo.locations.map(item => (
              <BillingAddress location={item} key={item.id} />
            ))
          ) : (
            <Typography sx={{ mb: 2 }}>
              {t("common.No address setting", { ns: "client" })}
            </Typography>
          )}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="text"
              color="inherit"
              startIcon={<ArrowBackIosNewRounded />}
              component={Link}
              to={CheckoutPathsEnum.CART}
              sx={{ textTransform: "capitalize" }}
            >
              {t("button.Back", { ns: "client" })}
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="success"
              startIcon={<AddRounded />}
              onClick={handleOpenLocationDialog}
            >
              {t("button.Add New Address", { ns: "client" })}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <OrderSummary />
        </Grid>
      </Grid>

      <LocationDialog
        open={isOpenLocationDialog}
        onClose={handleCloseLocationDialog}
      />
    </Container>
  );
};

export default BillingAddressScreen;
