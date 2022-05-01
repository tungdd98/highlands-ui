import React, { FC, memo, useEffect, useState } from "react";

import { AddRounded } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { compile } from "path-to-regexp";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Loader from "components/Loader/Loader";
import { ModesScreenEnum } from "constants/common.constants";
import { getAllCategory, CategoryTypesEnum } from "features/category/category";
import {
  ProductPathsEnum,
  searchInitialValues,
  getProductList,
  ProductParams,
} from "features/product/product";
import { useAppDispatch, useAppSelector } from "redux/store";

import DataTable from "../../../components/DataTable/DataTable";
import FormSearch from "../../../components/FormSearch/FormSearch";

const ListScreen: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(state => state.product);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [queries, setQueries] = useState<ProductParams>(searchInitialValues);

  useEffect(() => {
    dispatch(getProductList(queries)).finally(() => {
      setIsLoading(false);
      setIsSubmitting(false);
    });
  }, [dispatch, queries]);

  useEffect(() => {
    dispatch(getAllCategory({ type: CategoryTypesEnum.PRODUCT }));
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Box
        display="flex"
        py={3}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h5">
          {t("common.Manage", { ns: "admin" })}&nbsp;
          {t("sidebar.Products", { ns: "admin" })}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddRounded />}
          component={Link}
          size="large"
          to={compile(ProductPathsEnum.EDIT)({
            mode: ModesScreenEnum.CREATE,
          })}
        >
          {t("button.Add new", { ns: "admin" })}
        </Button>
      </Box>

      <FormSearch
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
        queries={queries}
        setQueries={setQueries}
      />

      {products && products.list.length ? (
        <DataTable
          products={products.list}
          total={products.totalItems}
          queries={queries}
          setQueries={setQueries}
        />
      ) : (
        <Typography>No data</Typography>
      )}
    </>
  );
};

export default memo(ListScreen);
