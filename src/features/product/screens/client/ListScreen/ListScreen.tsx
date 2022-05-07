import React, { FC, useEffect, useState } from "react";

import {
  FormatListBulletedRounded,
  GridViewRounded,
} from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import CustomLink from "components/CustomLink/CustomLink";
import Loader from "components/Loader/Loader";
import ProductItemGrid from "components/ProductItem/ProductItemGrid";
import ProductItemList from "components/ProductItem/ProductItemList";
import { CategoryDef, getCategoryDetail } from "features/category/category";
import {
  getProductList,
  ProductDef,
  LayoutsEnum,
  DEFAULT_PER_PAGE,
  initialQueries,
  SORT_QUERY_OPTIONS,
  SortQueryEnum,
} from "features/product/product";
import useQueryState from "hooks/useQueryString";
import { useAppDispatch } from "redux/store";

import FormSearchPrice from "../../../components/client/FormSearchPrice/FormSearchPrice";

const ListScreen: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { categoryId } = useParams<{ categoryId: string }>();

  const [sortQuery, setSortQuery] = useState(SortQueryEnum.CREATED_AT_DESC);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState<CategoryDef | null>(null);
  const [products, setProducts] = useState<ProductDef[]>([]);
  const [total, setTotal] = useState(0);
  const [layout, setLayout] = useState<LayoutsEnum>(LayoutsEnum.GRID);
  const [queries, setQueries] = useQueryState(initialQueries);

  const changeSortQuery = (event: SelectChangeEvent) => {
    const newSortQuery = event.target.value as SortQueryEnum;

    setSortQuery(newSortQuery);
    setQueries({
      ...queries,
      sort: newSortQuery,
    });
  };

  const changePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setQueries({
      ...queries,
      page,
    });
  };

  const searchByPrice = (startPrice: number, endPrice: number) => {
    setQueries({
      ...queries,
      startPrice,
      endPrice,
    });
  };

  useEffect(() => {
    if (categoryId) {
      dispatch(getCategoryDetail(Number(categoryId)))
        .then(unwrapResult)
        .then(setCategory);
    }
  }, [categoryId, dispatch]);

  useEffect(() => {
    if (categoryId) {
      dispatch(getProductList({ categoryId, ...queries }))
        .then(unwrapResult)
        .then(res => {
          setProducts(res.list);
          setTotal(res.totalItems);
        })
        .finally(() => setIsLoading(false));
    }
  }, [categoryId, dispatch, queries]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <Box sx={{ mt: 2, mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <CustomLink to="/">{t("common.Home", { ns: "client" })}</CustomLink>
          <Typography color="text.primary">{category?.title}</Typography>
        </Breadcrumbs>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            {t("common.FILTER BY", { ns: "client" })}
          </Typography>
          <FormSearchPrice searchByPrice={searchByPrice} />
        </Grid>
        <Grid item xs={12} md={9}>
          <Box
            sx={theme => ({
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 1,
              background: theme.palette.grey[200],
              mb: 3,
              borderRadius: 1,
            })}
          >
            <Stack spacing={1} direction="row">
              <Tooltip
                title={t("common.Grid", { ns: "client" }) || ""}
                placement="top-start"
              >
                <IconButton
                  size="small"
                  onClick={() => setLayout(LayoutsEnum.GRID)}
                  color={layout === LayoutsEnum.GRID ? "primary" : "default"}
                >
                  <GridViewRounded />
                </IconButton>
              </Tooltip>
              <Tooltip
                title={t("common.List", { ns: "client" }) || ""}
                placement="top-start"
              >
                <IconButton
                  size="small"
                  onClick={() => setLayout(LayoutsEnum.LIST)}
                  color={layout === LayoutsEnum.LIST ? "primary" : "default"}
                >
                  <FormatListBulletedRounded />
                </IconButton>
              </Tooltip>
            </Stack>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="sortByLabel">
                {t("common.Sort by", { ns: "client" })}:
              </InputLabel>
              <Select
                labelId="sortByLabel"
                id="sortBy"
                value={sortQuery}
                label={`${t("common.Sort by", { ns: "client" })}:`}
                onChange={changeSortQuery}
                size="small"
              >
                {SORT_QUERY_OPTIONS.map(item => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {products.length > 0 ? (
            <>
              {layout === LayoutsEnum.GRID ? (
                <Grid container spacing={4}>
                  {products.map(item => (
                    <Grid item xs={6} md={4} key={item.id}>
                      <ProductItemGrid {...item} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {products.map(item => (
                    <ProductItemList key={item.id} {...item} />
                  ))}
                </Box>
              )}

              {total > DEFAULT_PER_PAGE && (
                <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
                  <Pagination
                    count={total}
                    color="primary"
                    siblingCount={5}
                    onChange={changePage}
                  />
                </Box>
              )}
            </>
          ) : (
            <Typography textAlign="center">No products.</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ListScreen;
