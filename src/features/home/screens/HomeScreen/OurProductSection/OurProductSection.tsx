/* eslint-disable import/no-unresolved */
import React, { FC, memo, useState, useMemo, useEffect } from "react";

import { Box, Container, Typography, Tabs, Tab } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";
import { SwiperSlide } from "swiper/react";

import CustomSwiper from "components/CustomSwiper/CustomSwiper";
import ProductItemGrid from "components/ProductItem/ProductItemGrid";
import { CategoryTypesEnum } from "features/category/category";
import { getProductList, ProductDef } from "features/product/product";
import { useAppDispatch, useAppSelector } from "redux/store";

const OurProductSection: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { allCategory } = useAppSelector(state => state.category);

  const [tabIndex, setTabIndex] = useState(0);
  const [products, setProducts] = useState<ProductDef[]>([]);

  const productCategories = useMemo(
    () =>
      allCategory?.filter(item => item.type === CategoryTypesEnum.PRODUCT) ||
      [],
    [allCategory]
  );

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    dispatch(
      getProductList({ categoryId: tabIndex || undefined, page: 1, perPage: 8 })
    )
      .then(unwrapResult)
      .then(res => {
        setProducts(res.list);
      });
  }, [dispatch, tabIndex]);

  return (
    <Box my={5}>
      <Container maxWidth="lg">
        <Box mb={5} textAlign="center">
          <Typography variant="h4" fontWeight={600}>
            {t("common.Our Products", { ns: "client" })}
          </Typography>
          <Typography variant="body2" color="grey.500" mb={3}>
            {t("common.Text dummy 1", { ns: "client" })}
          </Typography>
        </Box>

        <Tabs value={tabIndex} onChange={handleChangeTab} centered>
          <Tab label={t("common.All Product", { ns: "client" })} />
          {productCategories.map(item => (
            <Tab key={item.id} label={item.title} />
          ))}
        </Tabs>

        <Box mt={5}>
          {products.length ? (
            <CustomSwiper
              hasMargin
              slidesPerView={1}
              spaceBetween={10}
              breakpoints={{
                "640": {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                "768": {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
            >
              {products.map(item => (
                <SwiperSlide key={item.id}>
                  <ProductItemGrid {...item} />
                </SwiperSlide>
              ))}
            </CustomSwiper>
          ) : (
            <Typography textAlign="center">
              {t("common.No products", { ns: "client" })}
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default memo(OurProductSection);
