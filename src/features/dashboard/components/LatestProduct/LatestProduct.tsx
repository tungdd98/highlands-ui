import React, { FC, memo } from "react";

import { Grid, Typography } from "@mui/material";

import PreviewImage from "components/PreviewImage/PreviewImage";
import { toCurrency } from "helpers/converts/currency";

const LatestProduct: FC = () => {
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={3}>
        <PreviewImage />
      </Grid>
      <Grid item xs={9}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          Small Granite Computer
        </Typography>
        <Typography variant="subtitle2" color="GrayText">
          {toCurrency(100)}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default memo(LatestProduct);
