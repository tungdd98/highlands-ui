import React, { FC, memo } from "react";

import { Grid, Typography } from "@mui/material";

import PreviewImage from "components/PreviewImage/PreviewImage";
import { OrderDetailDef } from "features/order/order";
import { toCurrency } from "helpers/converts/currency";

type LatestProductProps = OrderDetailDef;

const LatestProduct: FC<LatestProductProps> = ({ product }) => {
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={3}>
        <PreviewImage src={product.thumbnail} />
      </Grid>
      <Grid item xs={9}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {product.title}
        </Typography>
        <Typography variant="subtitle2" color="GrayText">
          {toCurrency(product.price)}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default memo(LatestProduct);
