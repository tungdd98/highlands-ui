import React, { FC } from "react";

import {
  FacebookRounded,
  GTranslateRounded,
  InsertChartRounded,
  ShopRounded,
  ThumbUpAltRounded,
} from "@mui/icons-material";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Copyright from "components/Copyright/Copyright";
import CustomLink from "components/CustomLink/CustomLink";
import { HomePathsEnum } from "features/home/home";
import { useAppSelector } from "redux/store";

const AppFooter: FC = () => {
  const { t } = useTranslation();

  const { setting } = useAppSelector(state => state.setting);

  return (
    <Box component="footer">
      <Box sx={{ bgcolor: "primary.main" }}>
        <Container maxWidth="lg">
          <Stack direction="row" spacing={3} justifyContent="center" p={2}>
            <CustomLink
              to="/social-facebook"
              disabledHover
              color="primary.contrastText"
            >
              <FacebookRounded />
            </CustomLink>
            <CustomLink
              to="/social-insta"
              disabledHover
              color="primary.contrastText"
            >
              <InsertChartRounded />
            </CustomLink>
            <CustomLink
              to="/social-youtube"
              disabledHover
              color="primary.contrastText"
            >
              <ShopRounded />
            </CustomLink>
            <CustomLink
              to="/social-google"
              disabledHover
              color="primary.contrastText"
            >
              <ThumbUpAltRounded />
            </CustomLink>
            <CustomLink
              to="/social-twitter"
              disabledHover
              color="primary.contrastText"
            >
              <GTranslateRounded />
            </CustomLink>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={3} sx={{ my: 4 }}>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h5" sx={{ fontWeight: 500, mb: 2 }}>
              {t("footer.Store Information", { ns: "client" })}
            </Typography>
            <Typography
              variant="body1"
              sx={{ wordBreak: "break-all", whiteSpace: "pre-line" }}
            >
              {setting?.address}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h5" sx={{ fontWeight: 500, mb: 2 }}>
              {t("footer.Information", { ns: "client" })}
            </Typography>
            <Stack direction="column" spacing={2}>
              <Typography variant="body1">
                {t("footer.My Account", { ns: "client" })}
              </Typography>
              <Typography
                variant="body1"
                component={Link}
                to={HomePathsEnum.ABOUT}
                sx={{ textDecoration: "none" }}
              >
                {t("footer.About Us", { ns: "client" })}
              </Typography>
              <Typography variant="body1">
                {t("footer.Contact Us", { ns: "client" })}
              </Typography>
              <Typography variant="body1">
                {t("footer.Checkout", { ns: "client" })}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h5" sx={{ fontWeight: 500, mb: 2 }}>
              {t("footer.Support", { ns: "client" })}
            </Typography>
            <Stack direction="column" spacing={2}>
              <Typography variant="body1">
                {t("footer.Address", { ns: "client" })}
              </Typography>
              <Typography variant="body1">
                {t("footer.Discount", { ns: "client" })}
              </Typography>
              <Typography
                variant="body1"
                component={Link}
                to={HomePathsEnum.DELIVERY}
                sx={{ textDecoration: "none" }}
              >
                {t("footer.Delivery", { ns: "client" })}
              </Typography>
              <Typography
                variant="body1"
                component={Link}
                to={HomePathsEnum.RETURN}
                sx={{ textDecoration: "none" }}
              >
                {t("footer.Privacy", { ns: "client" })}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ bgcolor: "secondary.main", p: 2 }}>
        <Copyright />
      </Box>
    </Box>
  );
};

export default AppFooter;
