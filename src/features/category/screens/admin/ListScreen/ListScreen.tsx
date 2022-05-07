import React, { FC, memo, useEffect, useState } from "react";

import { AddRounded } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { compile } from "path-to-regexp";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Loader from "components/Loader/Loader";
import { ModesScreenEnum } from "constants/common.constants";
import {
  CategoryPathsEnum,
  searchInitialValues,
  getCategoryList,
  CategoryParams,
} from "features/category/category";
import { useAppDispatch, useAppSelector } from "redux/store";

import DataTable from "../../../components/DataTable/DataTable";
import FormSearch from "../../../components/FormSearch/FormSearch";

const ListScreen: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(state => state.category);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [queries, setQueries] = useState<CategoryParams>(searchInitialValues);

  console.log(isSubmitting);

  useEffect(() => {
    dispatch(getCategoryList(queries)).finally(() => {
      setIsLoading(false);
      setIsSubmitting(false);
    });
  }, [dispatch, queries]);

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
          {t("sidebar.Categories", { ns: "admin" })}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddRounded />}
          component={Link}
          size="large"
          to={compile(CategoryPathsEnum.EDIT)({
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

      {categories && categories.list.length ? (
        <DataTable
          categories={categories.list}
          total={categories.totalItems}
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
