import React, { FC, memo } from "react";

import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const WhyChooseUsSection: FC = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        backgroundImage:
          "url(https://images.pexels.com/photos/162769/ear-cereals-infructescence-staple-food-162769.jpeg?cs=srgb&dl=pexels-pixabay-162769.jpg&fm=jpg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        py: 5,
        mb: 5,
      }}
    >
      <Container maxWidth="lg">
        <Box component={Paper} elevation={4} p={5}>
          <Box mb={5}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
              {t("common.Why Choose Us", { ns: "client" })}
            </Typography>
            <Typography variant="body2" color="grey.500" sx={{ mb: 3 }}>
              {t("common.Text dummy 4", { ns: "client" })}
            </Typography>
          </Box>
          <Stack>
            <Box
              sx={{
                borderBottom: 1,
                borderTop: 1,
                borderColor: "divider",
                py: 2,
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>
                {t("common.100% Organic!", { ns: "client" })}
              </Typography>
            </Box>
            <Box
              sx={{
                borderBottom: 1,
                borderTop: 1,
                borderColor: "divider",
                py: 2,
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>
                {t("common.Fast Free Delivery", { ns: "client" })}
              </Typography>
            </Box>
            <Box
              sx={{
                borderBottom: 1,
                borderTop: 1,
                borderColor: "divider",
                py: 2,
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>
                {t("common.Best Shopping Startegies", { ns: "client" })}
              </Typography>
            </Box>
            <Box
              sx={{
                borderBottom: 1,
                borderTop: 1,
                borderColor: "divider",
                py: 2,
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>
                {t("common.More than 15 Years in the business", {
                  ns: "client",
                })}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default memo(WhyChooseUsSection);
