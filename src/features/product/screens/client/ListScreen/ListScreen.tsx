import React, { FC, memo, useEffect, useState } from "react";

import {
  FilterListRounded,
  FormatListBulletedRounded,
  GridViewRounded,
} from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Button,
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
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import CustomLink from "components/CustomLink/CustomLink";
import FormikCheckbox from "components/FormElements/FormikCheckbox/FormikCheckbox";
import Loader from "components/Loader/Loader";
import ProductItemGrid from "components/ProductItem/ProductItemGrid";
import ProductItemList from "components/ProductItem/ProductItemList";
import { CategoryDef, getCategoryDetail } from "features/category/category";
import {
  getProductList,
  ProductDef,
  initialValuesSort,
  LayoutsEnum,
} from "features/product/product";
import { useAppDispatch } from "redux/store";

const CategoryScreen: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { categoryId } = useParams<{ categoryId: string }>();

  const [age, setAge] = useState("10");
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState<CategoryDef | null>(null);
  const [products, setProducts] = useState<ProductDef[]>([]);
  const [total, setTotal] = useState(0);
  const [layout, setLayout] = useState<LayoutsEnum>(LayoutsEnum.GRID);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
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
      dispatch(getProductList({ categoryId, page: 1, perPage: 9 }))
        .then(unwrapResult)
        .then(res => {
          setProducts(res.list);
          setTotal(res.totalItems);
        })
        .finally(() => setIsLoading(false));
    }
  }, [categoryId, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <Box mt={2} mb={4}>
        <Breadcrumbs aria-label="breadcrumb">
          <CustomLink to="/">{t("common.Home", { ns: "client" })}</CustomLink>
          <Typography color="text.primary">{category?.title}</Typography>
        </Breadcrumbs>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Formik
            initialValues={initialValuesSort}
            onSubmit={() => {
              // TODO:
            }}
          >
            <Form>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
              >
                <Typography variant="h6">
                  {t("common.FILTER BY", { ns: "client" })}
                </Typography>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<FilterListRounded />}
                >
                  {t("common.Filter", { ns: "client" })}
                </Button>
              </Box>
              <Box mb={3}>
                <FormikCheckbox
                  name="categoryIds"
                  label="Categories"
                  options={[
                    { label: "Cake", value: "1" },
                    { label: "Milk", value: "2" },
                  ]}
                />
              </Box>
              <Box mb={3}>
                <FormikCheckbox
                  name="sizes"
                  label="Size"
                  options={[
                    { label: "S", value: "1" },
                    { label: "M", value: "2" },
                    { label: "L", value: "3" },
                    { label: "XL", value: "4" },
                  ]}
                />
              </Box>
              <Box mb={3}>
                <FormikCheckbox
                  name="brands"
                  label="Brand"
                  options={[
                    { label: "Studio Design", value: "1" },
                    { label: "Graphic Corner", value: "2" },
                  ]}
                />
              </Box>
            </Form>
          </Formik>
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
                value={age}
                label={`${t("common.Sort by", { ns: "client" })}:`}
                onChange={handleChange}
                size="small"
              >
                <MenuItem value={10}>Name, A to Z</MenuItem>
                <MenuItem value={20}>Name, Z to A</MenuItem>
                <MenuItem value={30}>Price, low to high</MenuItem>
                <MenuItem value={40}>Price, high to low</MenuItem>
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

              {total > 9 && (
                <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
                  <Pagination count={products.length} color="primary" />
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

export default memo(CategoryScreen);
