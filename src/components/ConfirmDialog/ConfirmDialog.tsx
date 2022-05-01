import React, { FC, memo } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  subTitle?: string;
  textCancel?: string;
  textAgree?: string;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  open,
  onClose,
  title,
  subTitle,
  onSubmit,
  textCancel = "Cancel",
  textAgree = "Agree",
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" keepMounted>
      <DialogTitle>{title}</DialogTitle>
      {subTitle && (
        <DialogContent>
          <DialogContentText>{subTitle}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={onClose}>
          {t(`button.${textCancel}`, { ns: "admin" })}
        </Button>
        <Button onClick={onSubmit} autoFocus variant="contained">
          {t(`button.${textAgree}`, { ns: "admin" })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(ConfirmDialog);
