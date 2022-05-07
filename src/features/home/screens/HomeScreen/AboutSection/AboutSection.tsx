import React, { FC, memo } from "react";

import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import PreviewImage from "components/PreviewImage/PreviewImage";
import { HomePathsEnum } from "features/home/home";

const AboutSection: FC = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        backgroundImage:
          "url(https://images.pexels.com/photos/7254227/pexels-photo-7254227.jpeg?cs=srgb&dl=pexels-cottonbro-7254227.jpg&fm=jpg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        py: 5,
        mb: 5,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 5, textAlign: "center" }}>
          <Typography
            sx={{ fontWeight: 600 }}
            variant="h4"
            color="primary.contrastText"
          >
            {t("common.About Us", { ns: "client" })}
          </Typography>
          <Typography variant="body2" color="grey.500" sx={{ mb: 3 }}>
            {t("common.Text dummy 2", { ns: "client" })}
          </Typography>
        </Box>
        <Box component={Paper} sx={{ mt: 4 }} elevation={4}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <PreviewImage src="https://images.pexels.com/photos/635409/pexels-photo-635409.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ p: 5 }}>
                <Typography
                  sx={{ fontWeight: 600, mb: 2, textTransform: "uppercase" }}
                  variant="h5"
                >
                  {t("common.Title about us", { ns: "client" })}
                </Typography>
                <Typography color="grey.500" mb={4}>
                  {t("common.Text dummy 3", { ns: "client" })}
                </Typography>
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  to={HomePathsEnum.ABOUT}
                >
                  {t("button.Read more", { ns: "client" })}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default memo(AboutSection);
