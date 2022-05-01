import React, { FC, memo } from "react";

import { Box, Paper } from "@mui/material";

interface ContentWrapperProps {
  children: React.ReactNode;
}

const ContentWrapper: FC<ContentWrapperProps> = ({ children }) => {
  return (
    <Box
      component={Paper}
      sx={theme => ({
        maxWidth: theme.breakpoints.values.md,
        width: "100%",
        mx: "auto",
        px: 3,
        py: 3,
        my: 5,
      })}
      elevation={3}
    >
      {children}
    </Box>
  );
};

export default memo(ContentWrapper);
