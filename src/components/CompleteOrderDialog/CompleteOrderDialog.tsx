import React, { FC, memo } from "react";

import { ArrowBackIosNewRounded, LocalMallRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import OrderComplete from "assets/images/order-complete.png";
import { removeOrderSuccess } from "features/checkout/checkout";
import { HomePathsEnum } from "features/home/home";
import { ProfilePathsEnum } from "features/profile/profile";
import { useAppDispatch, useAppSelector } from "redux/store";

interface CompleteOrderDialogProps {
  open: boolean;
}

const CompleteOrderDialog: FC<CompleteOrderDialogProps> = ({ open }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const dispatch = useAppDispatch();
  const { orderSuccess } = useAppSelector(state => state.checkout);

  const handleRedirectHomePage = () => {
    dispatch(removeOrderSuccess());
    history.push(HomePathsEnum.HOME);
  };

  const handleRedirectMyOrder = () => {
    dispatch(removeOrderSuccess());
    history.push(ProfilePathsEnum.MY_ORDER);
  };

  if (!orderSuccess) {
    return null;
  }

  return (
    <Dialog open={open} fullScreen keepMounted fullWidth>
      <DialogContent>
        <Typography variant="h5" sx={{ fontWeight: 700, textAlign: "center" }}>
          {t("common.Thank you for your purchase!", { ns: "client" })}
        </Typography>

        <Box sx={{ maxWidth: 400, mx: "auto" }}>
          <img width="100%" src={OrderComplete} alt="logo" />
          <Typography sx={{ mb: 3 }}>
            {t("common.Thanks for placing order", { ns: "client" })}{" "}
            {orderSuccess.id}
          </Typography>
          <Typography sx={{ mb: 3 }}>
            {t(
              "common.We will send you a notification within 5 days when it ships.",
              { ns: "client" }
            )}
          </Typography>
          <Typography sx={{ mb: 3 }}>
            {t(
              "common.If you have any question or queries then fell to get in contact us.",
              { ns: "client" }
            )}
          </Typography>
          <Typography sx={{ mb: 3 }}>
            {t("common.All the best.", { ns: "client" })}
          </Typography>
          <Divider />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button
              variant="text"
              color="inherit"
              startIcon={<ArrowBackIosNewRounded />}
              sx={{ textTransform: "capitalize" }}
              onClick={handleRedirectHomePage}
            >
              {t("button.Continue Shopping", { ns: "client" })}
            </Button>
            <Button
              size="small"
              variant="contained"
              color="success"
              startIcon={<LocalMallRounded />}
              onClick={handleRedirectMyOrder}
            >
              {t("button.Go to my order", { ns: "client" })}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default memo(CompleteOrderDialog);
