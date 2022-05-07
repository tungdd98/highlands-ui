import React, { FC, memo } from "react";

import { Box, Breadcrumbs, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import CustomLink from "components/CustomLink/CustomLink";
import { useAppSelector } from "redux/store";

const DeliveryScreen: FC = () => {
  const { t } = useTranslation();

  const { setting } = useAppSelector(state => state.setting);

  return (
    <Container>
      <Box sx={{ mt: 2, mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <CustomLink to="/">{t("common.Home", { ns: "client" })}</CustomLink>
          <Typography color="text.primary">
            {t("footer.Delivery", { ns: "client" })}
          </Typography>
        </Breadcrumbs>
      </Box>

      {setting?.deliveryPocily && (
        <Box
          dangerouslySetInnerHTML={{
            __html: setting.deliveryPocily,
          }}
        />
      )}
    </Container>
  );
};

export default memo(DeliveryScreen);
