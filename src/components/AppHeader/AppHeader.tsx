import React, { FC } from "react";

import { Box, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import SelectLanguage from "components/SelectLanguage/SelectLanguage";

const AppHeader: FC = () => {
  const { t } = useTranslation();

  return (
    <Box
      component="header"
      sx={{ borderBottom: 1, borderColor: "divider", py: 0.5 }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography color="primary">
            {t("common.Freeshipping on all order over $ 2000", {
              ns: "client",
            })}
          </Typography>
          <SelectLanguage />
        </Box>
      </Container>
    </Box>
  );
};

export default AppHeader;
