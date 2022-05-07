import React, { FC, memo, useState } from "react";

import { AddShoppingCartRounded, SearchRounded } from "@mui/icons-material";
import {
  Box,
  Chip,
  Fade,
  IconButton,
  Paper,
  Rating,
  Stack,
  styled,
  Tooltip,
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

const ProductItemControlStyled = styled("div")({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 9,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: `rgba(0, 0, 0, 0.5)`,
});

type ProductItemGridProps = ProductDef;

const ProductItemGrid: FC<ProductItemGridProps> = props => {
  const { t } = useTranslation();

  const { thumbnail, title, price, id, quantity, createdAt } = props;

  const dispatch = useAppDispatch();
  const { carts } = useAppSelector(state => state.checkout);

  const [isShowControl, setIsShowControl] = useState(false);

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
    <Box
      sx={{ position: "relative", overflow: "hidden" }}
      onMouseEnter={() => setIsShowControl(true)}
      onMouseLeave={() => setIsShowControl(false)}
      component={Paper}
      elevation={6}
    >
      <Box sx={{ position: "relative" }}>
        <PreviewImage
          aspectRatio={AspectRatioEnum.THREE_TO_FOUR}
          src={thumbnail}
          alt={title}
          borderRadius="4px 4px 0 0"
        />
        <Fade in={isShowControl}>
          <ProductItemControlStyled>
            <Stack spacing={2}>
              <Box
                sx={{ bgcolor: "background.default", p: 1, borderRadius: 1 }}
              >
                <Tooltip
                  title={t("button.Add To Cart", { ns: "client" }) || ""}
                  placement="left-start"
                >
                  <IconButton color="primary" onClick={handleAddProductToCart}>
                    <AddShoppingCartRounded />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box
                sx={{ bgcolor: "background.default", p: 1, borderRadius: 1 }}
              >
                <Tooltip
                  title={t("button.Quick View", { ns: "client" }) || ""}
                  placement="left-start"
                >
                  <IconButton color="primary" onClick={handleSetQuickProduct}>
                    <SearchRounded />
                  </IconButton>
                </Tooltip>
              </Box>
            </Stack>
          </ProductItemControlStyled>
        </Fade>
        {isNewProduct && (
          <Box sx={{ position: "absolute", zIndex: 99, top: 10, left: 10 }}>
            <Chip label="New" color="primary" size="small" />
          </Box>
        )}
      </Box>

      <Box sx={{ px: 2, pb: 1 }}>
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

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Rating value={5} readOnly size="small" />
          <Typography fontWeight={600} color="primary.main" fontSize={20}>
            {toCurrency(price)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(ProductItemGrid);
