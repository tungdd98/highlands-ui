import React, { FC, memo, useEffect, useState } from "react";

import { Box, Container, Grid, Typography } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";

import ProductItemGrid from "components/ProductItem/ProductItemGrid";
import { getProductList, ProductDef } from "features/product/product";
import { ProductIsHotEnum } from "features/product/types/product.enums";
import { useAppDispatch } from "redux/store";

const HotDealsSection: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [products, setProducts] = useState<ProductDef[]>([]);

  const firstProduct = products.length > 0 ? products[0] : null;
  const productList = products.length > 0 ? products.slice(1) : [];

  useEffect(() => {
    dispatch(
      getProductList({ page: 1, perPage: 8, isHot: ProductIsHotEnum.HOT })
    )
      .then(unwrapResult)
      .then(res => {
        setProducts(res.list);
      });
  }, [dispatch]);

  return (
    <Box mb={5}>
      <Container maxWidth="lg">
        <Box mb={5} textAlign="center">
          <Typography variant="h4" fontWeight={600}>
            {t("common.Hot Deals", { ns: "client" })}
          </Typography>
          <Typography variant="body2" color="grey.500">
            {t("common.Text dummy 2", { ns: "client" })}
          </Typography>
        </Box>

        {products.length > 0 ? (
          <Grid container spacing={3}>
            {firstProduct && (
              <Grid item xs={12} md={6}>
                <ProductItemGrid {...firstProduct} />
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                {productList.map(item => (
                  <Grid key={item.id} item xs={12} md={6}>
                    <ProductItemGrid {...item} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Typography textAlign="center">
            {t("common.No products", { ns: "client" })}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default memo(HotDealsSection);
