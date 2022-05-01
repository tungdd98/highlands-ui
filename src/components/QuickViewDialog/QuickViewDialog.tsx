import React, { FC, memo, useCallback, useState } from "react";

import {
  AddShoppingCartRounded,
  CloseRounded,
  ExpandMoreRounded,
} from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid,
  Typography,
  Button,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import PreviewImage from "components/PreviewImage/PreviewImage";
import QuantityInput from "components/QuantityInput/QuantityInput";
import { AspectRatioEnum } from "constants/common.constants";
import { MessagesEnum } from "constants/message.constants";
import {
  addProductToCart,
  setIsOpenDrawerCart,
} from "features/checkout/checkout";
import { setQuickProduct } from "features/product/product";
import { toCurrency } from "helpers/converts/currency";
import { displaySnackbar } from "redux/snackbar.slice";
import { useAppDispatch, useAppSelector } from "redux/store";

const QuickViewDialog: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    product: { productQuickView },
    checkout: { carts },
  } = useAppSelector(state => state);

  const [value, setValue] = useState(1);

  const handleCloseDialog = useCallback(() => {
    dispatch(setQuickProduct(null));
  }, [dispatch]);

  const handleAddProductToCart = useCallback(() => {
    if (!productQuickView) return;
    if (
      productQuickView.id in carts &&
      carts[productQuickView.id].quantity >= productQuickView.quantity
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
          product: productQuickView,
        })
      );
      dispatch(setIsOpenDrawerCart(true));
      handleCloseDialog();
      dispatch(
        displaySnackbar({
          message: MessagesEnum.ADD_PRODUCT_SUCCESS,
        })
      );
    }
  }, [carts, dispatch, handleCloseDialog, productQuickView]);

  if (!productQuickView) {
    return null;
  }

  const { thumbnail, title, price, include, quantity, description, content } =
    productQuickView;

  return (
    <Dialog open={!!productQuickView} maxWidth="md" keepMounted fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <IconButton
          onClick={handleCloseDialog}
          aria-label="close"
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseRounded />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <PreviewImage
              aspectRatio={AspectRatioEnum.THREE_TO_FOUR}
              src={thumbnail}
              alt={title}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" fontWeight={600} noWrap mb={2}>
              {title}
            </Typography>
            <Typography
              variant="h4"
              color="primary.main"
              fontWeight={600}
              mb={2}
            >
              {toCurrency(price)}
            </Typography>
            <Typography sx={{ mb: 0.5 }}>
              {t("common.Tax excluded", { ns: "client" })}
            </Typography>
            <Typography sx={{ mb: 0.5 }}>
              {t("common.Include", { ns: "client" })}: {include}
            </Typography>
            <Typography>
              {t("common.Available", { ns: "client" })}: {quantity}
            </Typography>
            <Box my={3}>
              <QuantityInput
                maxQuantity={quantity}
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
          </Grid>
        </Grid>

        <Accordion sx={{ mt: 3 }}>
          <AccordionSummary expandIcon={<ExpandMoreRounded />}>
            <Typography fontWeight={500}>
              {t("common.Description", { ns: "client" })}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{description}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreRounded />}>
            <Typography fontWeight={500}>
              {t("common.Content", { ns: "client" })}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{content}</Typography>
          </AccordionDetails>
        </Accordion>
      </DialogContent>
    </Dialog>
  );
};

export default memo(QuickViewDialog);
