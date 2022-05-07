import React, { FC, memo } from "react";

import {
  Box,
  Button,
  Chip,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { differenceInDays } from "date-fns";
import { compile } from "path-to-regexp";
import { useTranslation } from "react-i18next";

import CustomLink from "components/CustomLink/CustomLink";
import PreviewImage from "components/PreviewImage/PreviewImage";
import { AspectRatioEnum } from "constants/common.constants";
import { MessagesEnum } from "constants/message.constants";
import {
  addProductToCart,
  setIsOpenDrawerCart,
} from "features/checkout/checkout";
import {
  ProductPathsEnum,
  ProductDef,
  setQuickProduct,
  DAYS_NEW_PRODUCT,
} from "features/product/product";
import { toCurrency } from "helpers/converts/currency";
import { displaySnackbar } from "redux/snackbar.slice";
import { useAppDispatch, useAppSelector } from "redux/store";

type ProductItemListProps = ProductDef;

const ProductItemList: FC<ProductItemListProps> = props => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const { carts } = useAppSelector(state => state.checkout);

  const { thumbnail, title, price, include, id, quantity, createdAt } = props;

  const isNewProduct =
    differenceInDays(new Date(), new Date(createdAt)) <= DAYS_NEW_PRODUCT;

  const handleSetQuickProduct = () => {
    dispatch(setQuickProduct(props));
  };

  const handleAddProductToCart = () => {
    if (id in carts && carts[id].quantity >= quantity) {
      dispatch(
        displaySnackbar({
          message: MessagesEnum.OVER_PRODUCT_IN_CART,
        })
      );
    } else {
      dispatch(
        addProductToCart({
          quantity: 1,
          product: props,
        })
      );
      dispatch(setIsOpenDrawerCart(true));
      dispatch(
        displaySnackbar({
          message: MessagesEnum.ADD_PRODUCT_SUCCESS,
        })
      );
    }
  };

  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      <Grid item xs={12} md={4}>
        <Box sx={{ position: "relative", width: "100%" }}>
          <PreviewImage
            aspectRatio={AspectRatioEnum.THREE_TO_FOUR}
            src={thumbnail}
            alt={title}
          />
          {isNewProduct && (
            <Box sx={{ position: "absolute", zIndex: 99, top: 10, left: 10 }}>
              <Chip label="New" color="primary" size="small" />
            </Box>
          )}
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <CustomLink
          to={compile(ProductPathsEnum.CLIENT_DETAIL)({
            productId: id,
          })}
          mt={2}
          mb={1}
          fontWeight={600}
          noWrap
        >
          {title}
        </CustomLink>
        <Rating value={5} readOnly size="small" />
        <Typography fontWeight={600} color="primary.main" fontSize={20} mb={2}>
          {toCurrency(price)}
        </Typography>
        <Typography color="grey.500" mb={2}>
          {include}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddProductToCart}
          >
            {t("button.Add To Cart", { ns: "client" })}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleSetQuickProduct}
          >
            {t("button.Quick View", { ns: "client" })}
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default memo(ProductItemList);
