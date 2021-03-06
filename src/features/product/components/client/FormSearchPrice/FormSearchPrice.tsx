import React, { FC, memo, useState } from "react";

import { Box, Button, Slider, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import {
  DEFAULT_SEARCH_PRICE,
  initialQueriesSearchPrice,
} from "features/product/product";
import { toCurrency } from "helpers/converts/currency";

interface FormSearchPriceProps {
  searchByPrice: (startPrice: number, endPrice: number) => void;
}

const FormSearchPrice: FC<FormSearchPriceProps> = ({ searchByPrice }) => {
  const { t } = useTranslation();

  const [prices, setPrices] = useState<number[]>(initialQueriesSearchPrice);

  const [minPrice, maxPrice] = prices;

  const handleSearchByPrice = () => {
    searchByPrice(minPrice, maxPrice);
  };

  const changePriceSearch = (event: Event, value: number | number[]) => {
    setPrices(value as number[]);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography sx={{ fontWeight: 600 }}>
        {t("common.Price", { ns: "client" })}
      </Typography>

      <Slider
        getAriaLabel={() => "Temperature range"}
        value={prices}
        onChange={changePriceSearch}
        valueLabelDisplay="auto"
        getAriaValueText={() => `${prices}VND`}
        max={DEFAULT_SEARCH_PRICE.MAX}
        step={DEFAULT_SEARCH_PRICE.STEP}
      />

      <Stack direction="row" spacing={1}>
        <Typography>{toCurrency(minPrice)}</Typography>
        <Typography>~</Typography>
        <Typography>{toCurrency(maxPrice)}</Typography>
      </Stack>

      <Button
        variant="contained"
        size="small"
        sx={{ mt: 2 }}
        onClick={handleSearchByPrice}
      >
        {t("button.Search By Price", { ns: "client" })}
      </Button>
    </Box>
  );
};

export default memo(FormSearchPrice);
