import React, { FC, memo, useMemo } from "react";

import { EditRounded } from "@mui/icons-material";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { CheckoutPathsEnum } from "features/checkout/checkout";
import { toCurrency } from "helpers/converts/currency";
import { useAppSelector } from "redux/store";

interface OrderSummaryProps {
  hasEditButton?: boolean;
}

const OrderSummary: FC<OrderSummaryProps> = ({ hasEditButton }) => {
  const { t } = useTranslation();

  const {
    checkout: { totalMoney, deliveryId },
    delivery: { allDelivery },
  } = useAppSelector(state => state);

  const deliverySelected = useMemo(() => {
    return allDelivery?.find(item => item.id === deliveryId);
  }, [allDelivery, deliveryId]);

  return (
    <Paper elevation={6} sx={{ p: 2, mb: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h6">
          {t("common.Order Summary", { ns: "client" })}
        </Typography>
        {hasEditButton && (
          <Button
            size="small"
            variant="contained"
            startIcon={<EditRounded />}
            component={Link}
            to={CheckoutPathsEnum.CART}
          >
            {t("button.Edit", { ns: "client" })}
          </Button>
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography>{t("common.Sub Total", { ns: "client" })}</Typography>
        <Typography sx={{ fontWeight: 600 }}>
          {toCurrency(totalMoney)}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography>{t("common.Discount", { ns: "client" })}</Typography>
        <Typography sx={{ fontWeight: 600 }}>{toCurrency(0)}</Typography>
      </Box>
      {deliverySelected && (
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography>{t("common.Shipping", { ns: "client" })}</Typography>
          <Typography sx={{ fontWeight: 600 }}>
            {deliverySelected.price
              ? toCurrency(deliverySelected.price)
              : "Free"}
          </Typography>
        </Box>
      )}
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
          mb: 1,
        }}
      >
        <Typography sx={{ fontWeight: 600 }}>
          {t("common.Total", { ns: "client" })}
        </Typography>
        <Typography sx={{ fontWeight: 600 }} color="primary">
          {toCurrency(
            totalMoney + (deliverySelected ? deliverySelected.price : 0)
          )}
        </Typography>
      </Box>
      <Typography
        variant="caption"
        sx={{ textAlign: "right", display: "block" }}
      >
        ({t("common.VAT included if applicable", { ns: "client" })})
      </Typography>
    </Paper>
  );
};

export default memo(OrderSummary);
