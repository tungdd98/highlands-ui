import React, { FC, memo } from "react";

import {
  Box,
  CircularProgress,
  CircularProgressProps,
  Typography,
} from "@mui/material";

interface SalesOverviewProps extends CircularProgressProps {
  title: string;
  total: number;
}

const SalesOverview: FC<SalesOverviewProps> = props => {
  const { total, title } = props;

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        size={180}
        variant="determinate"
        value={100}
        thickness={2}
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          {Math.round(total)}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default memo(SalesOverview);
