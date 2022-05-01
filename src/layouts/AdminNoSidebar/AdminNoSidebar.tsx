import React, { FC, memo } from "react";

import { Box } from "@mui/material";

const AdminNoSidebar: FC = ({ children }) => {
  return (
    <Box
      sx={theme => ({
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: theme.palette.grey[50],
      })}
    >
      {children}
    </Box>
  );
};

export default memo(AdminNoSidebar);
