import React, { FC, memo } from "react";

import { Box, Paper, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface StickyHeaderProps {
  linkBack: string;
  isSubmitting: boolean;
}

const StickyHeader: FC<StickyHeaderProps> = ({ linkBack, isSubmitting }) => {
  const { t } = useTranslation();

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{ px: 2, position: "sticky", top: 0, zIndex: 9 }}
    >
      <Box
        sx={theme => ({
          maxWidth: theme.breakpoints.values.md,
          width: "100%",
          mx: "auto",
          py: 1.25,
          display: "flex",
          justifyContent: "space-between",
        })}
      >
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to={linkBack}
        >
          {t("button.Back", { ns: "admin" })}
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting}
        >
          {t("button.Save changes", { ns: "admin" })}
        </Button>
      </Box>
    </Box>
  );
};

export default memo(StickyHeader);
