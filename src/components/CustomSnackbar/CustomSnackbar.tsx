import React, { FC, memo } from "react";

import { CloseRounded } from "@mui/icons-material";
import { IconButton, Snackbar } from "@mui/material";
import { useTranslation } from "react-i18next";

import { hideSnackbar } from "redux/snackbar.slice";
import { useAppDispatch, useAppSelector } from "redux/store";

const CustomSnackbar: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { open, message, autoHideDuration } = useAppSelector(
    state => state.snackbar
  );

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideSnackbar());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      onClose={handleClose}
      message={t(`common.${message}`, { ns: "admin" })}
      autoHideDuration={autoHideDuration}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          sx={{ p: 0.5 }}
          onClick={handleClose}
        >
          <CloseRounded />
        </IconButton>
      }
    />
  );
};

export default memo(CustomSnackbar);
