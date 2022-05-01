import React, { FC, memo, useCallback, useEffect, useState } from "react";

import { DeleteForeverRounded } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { compile } from "path-to-regexp";

import CustomLink from "components/CustomLink/CustomLink";
import PreviewImage from "components/PreviewImage/PreviewImage";
import QuantityInput from "components/QuantityInput/QuantityInput";
import { AspectRatioEnum } from "constants/common.constants";
import { CartDef, deleteCart } from "features/checkout/checkout";
import { ProductPathsEnum } from "features/product/product";
import { toCurrency } from "helpers/converts/currency";
import { useAppDispatch } from "redux/store";

type CartItemProps = CartDef;

const CartItem: FC<CartItemProps> = props => {
  const dispatch = useAppDispatch();
  const {
    product: { thumbnail, title, id, price, quantity: quantityProduct },
    quantity,
  } = props;

  const [value, setValue] = useState(quantity);

  const handleDeleteCart = useCallback(() => {
    dispatch(deleteCart(id));
  }, [dispatch, id]);

  useEffect(() => {
    setValue(quantity);
  }, [quantity]);

  return (
    <Box sx={{ mb: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <PreviewImage
            aspectRatio={AspectRatioEnum.THREE_TO_FOUR}
            src={thumbnail}
            alt={title}
          />
        </Grid>
        <Grid
          item
          xs={9}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <CustomLink
              to={compile(ProductPathsEnum.CLIENT_DETAIL)({
                productId: id,
              })}
              mb={1}
              fontWeight={600}
              noWrap
            >
              {title}
            </CustomLink>
            <Typography fontWeight={600} color="primary.main" mb={1}>
              {toCurrency(price)}
            </Typography>
            <Box mb={3}>
              <QuantityInput
                maxQuantity={quantityProduct}
                value={value}
                setValue={setValue}
                hideQuantityText
                productId={id}
              />
            </Box>
          </Box>
          <IconButton color="error" onClick={handleDeleteCart}>
            <DeleteForeverRounded />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(CartItem);
