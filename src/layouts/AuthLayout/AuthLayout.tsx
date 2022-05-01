import React, { FC, memo } from "react";

import { Box, Container } from "@mui/material";

import Copyright from "components/Copyright/Copyright";

const AuthLayout: FC = ({ children }) => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
          {children}
        </Box>
        <Box sx={{ p: 2 }}>
          <Copyright />
        </Box>
      </Box>
    </Container>
  );
};

export default memo(AuthLayout);
