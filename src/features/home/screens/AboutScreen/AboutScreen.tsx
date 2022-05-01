import React, { FC, memo } from "react";

import { Box, Breadcrumbs, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import CustomLink from "components/CustomLink/CustomLink";
import { useAppSelector } from "redux/store";

const AboutScreen: FC = () => {
  const { t } = useTranslation();

  const { setting } = useAppSelector(state => state.setting);

  return (
    <Container>
      <Box mt={2} mb={4}>
        <Breadcrumbs aria-label="breadcrumb">
          <CustomLink to="/">{t("common.Home", { ns: "client" })}</CustomLink>
          <Typography color="text.primary">
            {t("common.About", { ns: "client" })}
          </Typography>
        </Breadcrumbs>
      </Box>

      {setting?.aboutPage && (
        <Box
          dangerouslySetInnerHTML={{
            __html: setting.aboutPage,
          }}
        />
      )}
    </Container>
  );
};

export default memo(AboutScreen);
