import React, { FC, memo } from "react";

import { Box, Breadcrumbs, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import CustomLink from "components/CustomLink/CustomLink";
import { useAppSelector } from "redux/store";

const ReturnScreen: FC = () => {
  const { t } = useTranslation();

  const { setting } = useAppSelector(state => state.setting);

  return (
    <Container>
      <Box sx={{ mt: 2, mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <CustomLink to="/">{t("common.Home", { ns: "client" })}</CustomLink>
          <Typography color="text.primary">
            {t("footer.Privacy", { ns: "client" })}
          </Typography>
        </Breadcrumbs>
      </Box>

      {setting?.returnPolicy && (
        <Box
          dangerouslySetInnerHTML={{
            __html: setting.returnPolicy,
          }}
        />
      )}
    </Container>
  );
};

export default memo(ReturnScreen);
