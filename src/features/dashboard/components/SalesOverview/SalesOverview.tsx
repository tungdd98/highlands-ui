import React, { FC, memo } from "react";

import {
  Box,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from "@mui/material";

import { toCurrency } from "helpers/converts/currency";

interface SalesOverviewProps extends LinearProgressProps {
  title: string;
  total: number;
}

const SalesOverview: FC<SalesOverviewProps> = ({ title, total, color }) => {
  return (
    <Box sx={{ width: "100%", mb: 1 }}>
      <Box
        sx={{
          mb: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="subtitle2" sx={{ display: "inline", mr: 1 }}>
          {toCurrency(total)}
        </Typography>
      </Box>
      <LinearProgress variant="determinate" value={total} color={color} />
    </Box>
  );
};

export default memo(SalesOverview);
