import React, { FC, memo } from "react";

import { Box } from "@mui/material";

import AppFooter from "components/AppFooter/AppFooter";
import AppHeader from "components/AppHeader/AppHeader";
import CompleteOrderDialog from "components/CompleteOrderDialog/CompleteOrderDialog";
import DrawerCart from "components/DrawerCart/DrawerCart";
import Navbar from "components/Navbar/Navbar";
import QuickViewDialog from "components/QuickViewDialog/QuickViewDialog";
import { useAppSelector } from "redux/store";

const ClientLayout: FC = ({ children }) => {
  const { orderSuccess } = useAppSelector(state => state.checkout);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppHeader />
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, mb: 10 }}>
        {children}
      </Box>
      <AppFooter />

      <DrawerCart />
      <QuickViewDialog />
      <CompleteOrderDialog open={!!orderSuccess} />
    </Box>
  );
};

export default memo(ClientLayout);
