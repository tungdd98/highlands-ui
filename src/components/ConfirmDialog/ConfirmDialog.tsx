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
  title: string;
  subTitle?: string;
  textCancel?: string;
  textAgree?: string;
  onClose: () => void;
  onSubmit: () => void;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  open,
  title,
  subTitle,
  textCancel = "Cancel",
  textAgree = "Agree",
  onClose,
  onSubmit,
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
