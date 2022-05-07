import React, { FC, memo, useCallback } from "react";

import { AddRounded, RemoveRounded } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { changeQuantityProduct } from "features/checkout/checkout";
import { useAppDispatch, useAppSelector } from "redux/store";

interface QuantityInputProps {
  maxQuantity?: number;
  hideQuantityText?: boolean;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  productId?: number;
}

const QuantityInput: FC<QuantityInputProps> = ({
  maxQuantity,
  hideQuantityText,
  value,
  setValue,
  productId,
}) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const { carts } = useAppSelector(state => state.checkout);

  const handleIncreaseValue = useCallback(() => {
    if (value === maxQuantity) return;

    setValue(value + 1);
    if (productId && productId in carts) {
      dispatch(changeQuantityProduct({ id: productId, quantity: 1 }));
    }
  }, [carts, dispatch, maxQuantity, productId, setValue, value]);

  const handleDecreaseValue = useCallback(() => {
    if (value === 1) return;

    setValue(value - 1);
    if (productId && productId in carts) {
      dispatch(changeQuantityProduct({ id: productId, quantity: -1 }));
    }
  }, [carts, dispatch, productId, setValue, value]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {!hideQuantityText && (
        <Typography variant="overline" sx={{ mr: 2 }}>
          {t("common.Quantity", { ns: "client" })}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 0.5,
          border: 1,
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        <IconButton size="small" onClick={handleDecreaseValue}>
          <RemoveRounded fontSize="small" />
        </IconButton>
        <Typography sx={{ minWidth: 40, textAlign: "center" }}>
          {value}
        </Typography>
        <IconButton size="small" onClick={handleIncreaseValue}>
          <AddRounded fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default memo(QuantityInput);
