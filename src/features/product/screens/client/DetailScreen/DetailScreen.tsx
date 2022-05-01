import React, { FC, memo, useState, useEffect, useCallback } from "react";

import {
  AddShoppingCartRounded,
  CompareArrowsRounded,
  FacebookRounded,
  GTranslateRounded,
  InsertChartRounded,
  LocalCarWashRounded,
  ShopRounded,
  ThumbUpAltRounded,
  VerifiedUserRounded,
} from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { compile } from "path-to-regexp";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import CustomLink from "components/CustomLink/CustomLink";
import Loader from "components/Loader/Loader";
import PreviewImage from "components/PreviewImage/PreviewImage";
import QuantityInput from "components/QuantityInput/QuantityInput";
import TabPanel from "components/TabPanel/TabPanel";
import { AspectRatioEnum } from "constants/common.constants";
import { MessagesEnum } from "constants/message.constants";
import { getCategoryDetail } from "features/category/category";
import {
  addProductToCart,
  setIsOpenDrawerCart,
} from "features/checkout/checkout";
import { getProductDetail, ProductPathsEnum } from "features/product/product";
import { toCurrency } from "helpers/converts/currency";
import { displaySnackbar } from "redux/snackbar.slice";
import { useAppDispatch, useAppSelector } from "redux/store";

const DetailScreen: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { productId } = useParams<{ productId: string }>();
  const {
    product: { productDetail },
    category: { categoryDetail },
    checkout: { carts },
  } = useAppSelector(state => state);

  const [tabIndex, setTabIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState(1);

  const handleChangeTab = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      setTabIndex(newValue);
    },
    []
  );

  const handleAddProductToCart = useCallback(() => {
    if (!productDetail) return;
    if (
      productDetail.id in carts &&
      carts[productDetail.id].quantity >= productDetail.quantity
    ) {
      dispatch(
        displaySnackbar({
          message: MessagesEnum.OVER_PRODUCT_IN_CART,
        })
      );
    } else {
      dispatch(
        addProductToCart({
          quantity: 1,
          product: productDetail,
        })
      );
      dispatch(setIsOpenDrawerCart(true));
      dispatch(
        displaySnackbar({
          message: MessagesEnum.ADD_PRODUCT_SUCCESS,
        })
      );
    }
  }, [carts, dispatch, productDetail]);

  useEffect(() => {
    dispatch(getProductDetail(Number(productId)))
      .then(unwrapResult)
      .then(res => {
        if (res.categoryId) {
          dispatch(getCategoryDetail(Number(res.categoryId)));
        }
      })
      .finally(() => setIsLoading(false));
  }, [dispatch, productId]);

  if (isLoading) {
    return <Loader />;
  }

  if (!productDetail) {
    return <Box>Error</Box>;
  }

  return (
    <Container>
      <Box mt={2} mb={4}>
        <Breadcrumbs aria-label="breadcrumb">
          <CustomLink to="/">{t("common.Home", { ns: "client" })}</CustomLink>
          {categoryDetail && (
            <CustomLink
              to={compile(ProductPathsEnum.CLIENT_LIST)({
                categoryId: categoryDetail.id,
              })}
            >
              {categoryDetail.title}
            </CustomLink>
          )}
          <Typography color="text.primary">{productDetail.title}</Typography>
        </Breadcrumbs>
      </Box>
      <Grid container spacing={3} mb={5}>
        <Grid item xs={12} md={6}>
          <PreviewImage
            aspectRatio={AspectRatioEnum.THREE_TO_FOUR}
            src={productDetail.thumbnail}
            alt={productDetail.title}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" fontWeight={700} mb={2}>
            {productDetail.title}
          </Typography>
          <Stack direction="row" spacing={3} mb={2}>
            <CustomLink to="/social-facebook" color="grey.500">
              <FacebookRounded />
            </CustomLink>
            <CustomLink to="/social-insta" color="grey.500">
              <InsertChartRounded />
            </CustomLink>
            <CustomLink to="/social-youtube" color="grey.500">
              <ShopRounded />
            </CustomLink>
            <CustomLink to="/social-google" color="grey.500">
              <ThumbUpAltRounded />
            </CustomLink>
            <CustomLink to="/social-twitter" color="grey.500">
              <GTranslateRounded />
            </CustomLink>
          </Stack>
          <Typography
            variant="h4"
            fontWeight={600}
            color="primary"
            sx={{ mb: 1 }}
          >
            {toCurrency(productDetail.price)}
          </Typography>
          <Typography sx={{ mb: 0.5 }}>
            {t("common.Tax excluded", { ns: "client" })}
          </Typography>
          <Typography sx={{ mb: 0.5 }}>
            {t("common.Include", { ns: "client" })}: {productDetail.include}
          </Typography>
          <Typography sx={{ mt: 0.5 }}>
            {t("common.Available", { ns: "client" })} : {productDetail.quantity}
          </Typography>
          <Box my={3}>
            <QuantityInput
              maxQuantity={productDetail.quantity}
              value={value}
              setValue={setValue}
            />
          </Box>
          <Button
            size="large"
            variant="contained"
            startIcon={<AddShoppingCartRounded />}
            onClick={handleAddProductToCart}
          >
            {t("button.Add To Cart", { ns: "client" })}
          </Button>
          <Stack
            sx={{
              mt: 3,
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
            }}
          >
            <Box
              borderBottom={1}
              borderColor="divider"
              p={2}
              display="flex"
              alignItems="center"
            >
              <LocalCarWashRounded />
              <Typography fontWeight={500} color="grey.600" ml={2}>
                {t("common.Security policy", { ns: "client" })}
              </Typography>
            </Box>
            <Box
              borderBottom={1}
              borderColor="divider"
              p={2}
              display="flex"
              alignItems="center"
            >
              <VerifiedUserRounded />
              <Typography fontWeight={500} color="grey.600" ml={2}>
                {t("common.Delivery policy", { ns: "client" })}
              </Typography>
            </Box>
            <Box p={2} display="flex" alignItems="center">
              <CompareArrowsRounded />
              <Typography fontWeight={500} color="grey.600" ml={2}>
                {t("common.Return policy", { ns: "client" })}
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>

      <Box sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabIndex} onChange={handleChangeTab} centered>
          <Tab label={t("common.Description", { ns: "client" })} />
          <Tab label={t("common.Product details", { ns: "client" })} />
          <Tab label={t("common.Reviews", { ns: "client" })} />
        </Tabs>
      </Box>
      <Box mb={5}>
        <TabPanel value={tabIndex} index={0}>
          {productDetail.description}
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          {productDetail.content}
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          {t("common.Update", { ns: "client" })}...
        </TabPanel>
      </Box>
    </Container>
  );
};

export default memo(DetailScreen);
