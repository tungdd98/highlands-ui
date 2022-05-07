import React, { FC, memo, useState } from "react";

import { EditRounded } from "@mui/icons-material";
import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";

import { removeUserLocation } from "features/auth/auth";
import {
  CheckoutPathsEnum,
  deleteUserLocation,
  setLocation,
} from "features/checkout/checkout";
import { LocationDef } from "features/user/user";
import { handleErrorResponse } from "helpers/forms/handle-error-response";
import { useAppDispatch, useAppSelector } from "redux/store";

interface BillingAddressProps {
  hiddenAction?: boolean;
  hasEditButton?: boolean;
  location: LocationDef;
}

const BillingAddress: FC<BillingAddressProps> = ({
  hiddenAction,
  hasEditButton,
  location,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  const dispatch = useAppDispatch();
  const { location: locationStore } = useAppSelector(state => state.checkout);

  const [isDeleting, setIsDeleting] = useState(false);

  const isLocationSelected = locationStore?.id === location.id;

  const handleDeleteLocation = () => {
    setIsDeleting(true);
    dispatch(deleteUserLocation(location.id))
      .then(unwrapResult)
      .then(() => {
        dispatch(removeUserLocation(location.id));
      })
      .catch(() => handleErrorResponse({ dispatch }))
      .finally(() => setIsDeleting(false));
  };

  const handleSetLocation = () => {
    dispatch(setLocation(location));
    history.push(CheckoutPathsEnum.PAYMENT);
  };

  return (
    <Paper elevation={6} sx={{ p: 2, mb: 2 }}>
      {hasEditButton && (
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {t("common.Billing Address", { ns: "client" })}
          </Typography>
          <Button
            size="small"
            variant="contained"
            startIcon={<EditRounded />}
            component={Link}
            to={CheckoutPathsEnum.BILLING_AND_ADDRESS}
          >
            {t("button.Edit", { ns: "client" })}
          </Button>
        </Box>
      )}
      <Stack direction="row" spacing={1} alignItems="flex-end">
        <Typography sx={{ fontWeight: 600 }} variant="body1">
          {location.name}
        </Typography>
        <Typography variant="caption">
          ({t("common.Home address", { ns: "client" })})
        </Typography>
        {isLocationSelected && (
          <Chip
            label={t("common.Selected", { ns: "client" })}
            color="primary"
            size="small"
          />
        )}
      </Stack>
      <Typography variant="body2" sx={{ mt: 1 }}>
        {location.address}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        <Typography color="grey.600">{location.phone}</Typography>
        {!hiddenAction && (
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant="outlined"
              color="inherit"
              onClick={handleDeleteLocation}
              disabled={isDeleting}
            >
              {t("button.Delete", { ns: "client" })}
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="success"
              onClick={handleSetLocation}
            >
              {t("button.Deliver To This Address", { ns: "client" })}
            </Button>
          </Stack>
        )}
      </Box>
    </Paper>
  );
};

export default memo(BillingAddress);
