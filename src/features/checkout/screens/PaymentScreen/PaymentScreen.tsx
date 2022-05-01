import React, { FC, memo, useState, useMemo, useEffect } from "react";

import { ArrowBackIosNewRounded } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Paper,
  RadioGroup,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { Form, Formik, FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { Link, Redirect } from "react-router-dom";

import CustomLink from "components/CustomLink/CustomLink";
import Loader from "components/Loader/Loader";
import {
  CheckoutPathsEnum,
  CHECKOUT_STEPS,
  PaymentAndDeliveryForm,
  setInitialValuesPayment,
  setDeliveryId,
  setPaymentId,
  OrderRequest,
  postOrder,
} from "features/checkout/checkout";
import { getAllDelivery } from "features/delivery/delivery";
import { getAllPayment } from "features/payment/payment";
import { handleErrorResponse } from "helpers/forms/handle-error-response";
import { useAppDispatch, useAppSelector } from "redux/store";

import BillingAddress from "../../components/BillingAddress/BillingAddress";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import RadioPayment from "../../components/RadioPayment/RadioPayment";

const PaymentScreen: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    checkout: {
      location,
      paymentId,
      deliveryId,
      totalQuantity,
      totalMoney,
      carts,
    },
    delivery: { allDelivery },
    payment: { allPayment },
    auth: { userInfo },
  } = useAppSelector(state => state);

  const [isLoading, setIsLoading] = useState(true);

  const initialValues = useMemo(() => {
    return setInitialValuesPayment(allDelivery, allPayment, {
      deliveryId,
      paymentId,
    });
  }, [allDelivery, allPayment, deliveryId, paymentId]);

  const deliverySelected = useMemo(() => {
    return allDelivery?.find(item => item.id === deliveryId);
  }, [allDelivery, deliveryId]);

  const handleSubmit = (
    values: PaymentAndDeliveryForm,
    { setSubmitting }: FormikHelpers<PaymentAndDeliveryForm>
  ) => {
    if (!userInfo || !location || !paymentId || !deliveryId) {
      setSubmitting(false);
      return;
    }

    const order: OrderRequest = {
      userId: userInfo.id,
      locationId: location.id,
      paymentId,
      deliveryId,
      totalQuantity,
      totalMoney: totalMoney + (deliverySelected ? deliverySelected.price : 0),
      carts: Object.values(carts).map(cart => ({
        product: {
          id: cart.product.id,
          price: cart.product.price,
          quantity: cart.product.quantity,
        },
        quantity: cart.quantity,
      })),
    };
    dispatch(postOrder(order))
      .then(unwrapResult)
      .catch(() => handleErrorResponse({ dispatch }))
      .finally(() => {
        setSubmitting(false);
      });
  };

  useEffect(() => {
    if (!isLoading) return;

    dispatch(getAllDelivery())
      .then(unwrapResult)
      .then(resDelivery => {
        dispatch(setDeliveryId(resDelivery.length ? resDelivery[0].id : ""));
      })
      .finally(() => {
        dispatch(getAllPayment())
          .then(unwrapResult)
          .then(resPayment => {
            dispatch(setPaymentId(resPayment.length ? resPayment[0].id : ""));
          })
          .finally(() => setIsLoading(false));
      });
  }, [dispatch, isLoading]);

  if (!totalQuantity) {
    return <Redirect to={CheckoutPathsEnum.CART} />;
  }

  if (!location) {
    return <Redirect to={CheckoutPathsEnum.BILLING_AND_ADDRESS} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <Box mt={2} mb={4}>
        <Breadcrumbs aria-label="breadcrumb">
          <CustomLink to="/">{t("common.Home", { ns: "client" })}</CustomLink>
          <Typography color="text.primary">
            {t("common.Checkout - Payment", { ns: "client" })}
          </Typography>
        </Breadcrumbs>
      </Box>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={8}>
          <Stepper activeStep={2} alternativeLabel>
            {CHECKOUT_STEPS.map(label => (
              <Step key={label}>
                <StepLabel>{t(`common.${label}`, { ns: "client" })}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
      </Grid>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, handleChange, isSubmitting }) => {
          return (
            <Form>
              <Grid container spacing={3} mb={3}>
                <Grid item xs={12} md={8}>
                  <Paper elevation={6} sx={{ p: 2, mb: 3 }}>
                    <Typography variant="h6" fontWeight={600} mb={3}>
                      {t("common.Delivery options", { ns: "client" })}
                    </Typography>
                    <RadioGroup
                      name="deliveryId"
                      value={values.deliveryId}
                      onChange={e => {
                        handleChange(e);
                        dispatch(setDeliveryId(Number(e.target.value)));
                      }}
                    >
                      <Grid container spacing={2}>
                        {allDelivery?.map(item => (
                          <Grid item xs={12} md={6} key={item.id}>
                            <RadioPayment
                              value={item.id}
                              title={item.title}
                              subTitle="Delivered on Monday, August 12"
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </RadioGroup>
                  </Paper>
                  <Paper elevation={6} sx={{ p: 2, mb: 3 }}>
                    <Typography variant="h6" fontWeight={600} mb={3}>
                      {t("common.Payment options", { ns: "client" })}
                    </Typography>
                    <RadioGroup
                      name="paymentId"
                      value={values.paymentId}
                      onChange={e => {
                        handleChange(e);
                        dispatch(setPaymentId(Number(e.target.value)));
                      }}
                    >
                      <Grid container spacing={2}>
                        {allPayment?.map(item => (
                          <Grid item xs={12} key={item.id}>
                            <RadioPayment
                              value={item.id}
                              title={item.title}
                              subTitle={item.description}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </RadioGroup>
                  </Paper>
                  <Button
                    variant="text"
                    color="inherit"
                    startIcon={<ArrowBackIosNewRounded />}
                    component={Link}
                    to={CheckoutPathsEnum.BILLING_AND_ADDRESS}
                    sx={{ textTransform: "capitalize" }}
                  >
                    {t("button.Back", { ns: "client" })}
                  </Button>
                </Grid>
                <Grid item xs={12} md={4}>
                  {location && (
                    <BillingAddress
                      location={location}
                      hiddenAction
                      hasEditButton
                    />
                  )}
                  <OrderSummary hasEditButton />
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {t("button.Complete Order", { ns: "client" })}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default memo(PaymentScreen);
