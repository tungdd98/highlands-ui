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

import CustomLink from "components/CustomLink/CustomLink";
import Loader from "components/Loader/Loader";
import ProductItemGrid from "components/ProductItem/ProductItemGrid";
import ProductItemList from "components/ProductItem/ProductItemList";
import {
  getProductList,
  ProductDef,
  LayoutsEnum,
  initialQueries,
  SORT_QUERY_OPTIONS,
  SortQueryEnum,
} from "features/product/product";
import useQueryState from "hooks/useQueryString";
import { useAppDispatch } from "redux/store";

import FormSearchPrice from "../../../components/client/FormSearchPrice/FormSearchPrice";

const SearchScreen: FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [sortQuery, setSortQuery] = useState(SortQueryEnum.CREATED_AT_DESC);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<ProductDef[]>([]);
  const [totalPages, setTotalPages] = useState(0);
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
    dispatch(getProductList(queries))
      .then(unwrapResult)
      .then(res => {
        setProducts(res.list);
        setTotalPages(res.totalPages);
      })
      .finally(() => setIsLoading(false));
  }, [dispatch, queries]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <Box sx={{ mt: 2, mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <CustomLink to="/">{t("common.Home", { ns: "client" })}</CustomLink>
          <Typography color="text.primary">
            {t("label.Search", { ns: "admin" })}
          </Typography>
        </Breadcrumbs>
      </Box>

      <Typography variant="h5" sx={{ fontWeight: 500, mb: 4 }}>
        {t("common.Keyword", { ns: "client" })}: {queries?.title}
      </Typography>

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
                value={sortQuery}
                label={`${t("common.Sort by", { ns: "client" })}:`}
                onChange={changeSortQuery}
                size="small"
              >
                {SORT_QUERY_OPTIONS.map(item => (
                  <MenuItem key={item.value} value={item.value}>
                    {t(`common.${item.label}`, { ns: "client" })}
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

              {totalPages > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
                  <Pagination
                    count={totalPages}
                    color="primary"
                    siblingCount={5}
                    onChange={changePage}
                  />
                </Box>
              )}
            </>
          ) : (
            <Typography textAlign="center">
              {t("common.No products", { ns: "client" })}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchScreen;
