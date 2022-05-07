import React, { FC, useEffect, useState, useMemo } from "react";

import { Box, Grid } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { Formik, Form, FormikHelpers } from "formik";
import { useHistory, useParams } from "react-router-dom";

import ContentWrapper from "components/EditComponents/ContentWrapper";
import StickyHeader from "components/EditComponents/StickyHeader";
import FormikSelect from "components/FormElements/FormikSelect/FormikSelect";
import FormikTextField from "components/FormElements/FormikTextField/FormikTextField";
import Loader from "components/Loader/Loader";
import UploadImage from "components/UploadImage/UploadImage";
import { AspectRatioEnum } from "constants/common.constants";
import { MessagesEnum } from "constants/message.constants";
import { getAllCategory, CategoryTypesEnum } from "features/category/category";
import {
  PRODUCT_HOT_OPTIONS,
  PRODUCT_STATUS_OPTIONS,
  ProductPathsEnum,
  editSchema,
  editInitialValues,
  convertResponseToFormData,
  postProduct,
  getProductDetail,
  putProduct,
  ProductRequest,
} from "features/product/product";
import { handleErrorResponse } from "helpers/forms/handle-error-response";
import { uploadImage } from "helpers/forms/upload-image";
import { displaySnackbar } from "redux/snackbar.slice";
import { useAppDispatch, useAppSelector } from "redux/store";

const EditScreen: FC = () => {
  const history = useHistory();
  const { productId } = useParams<{ productId: string }>();

  const dispatch = useAppDispatch();

  const { productDetail } = useAppSelector(state => state.product);
  const { allCategory } = useAppSelector(state => state.category);

  const [isLoading, setIsLoading] = useState(true);

  const initialValues = useMemo(() => {
    if (productId && productDetail) {
      return convertResponseToFormData(productDetail);
    }
    return editInitialValues;
  }, [productDetail, productId]);

  const categoryOptions = useMemo(() => {
    return (
      allCategory?.map(item => ({
        label: item.title,
        value: item.id,
      })) || []
    );
  }, [allCategory]);

  const handleSubmit = async (
    values: ProductRequest,
    { setSubmitting }: FormikHelpers<ProductRequest>
  ) => {
    if (values.thumbnail instanceof File) {
      const response = await uploadImage(values.thumbnail);
      if (response) {
        values.thumbnail = response;
      }
    }
    const action = productId
      ? dispatch(
          putProduct({
            data: values,
            productId: Number(productId),
          })
        )
      : dispatch(postProduct(values));

    action
      .then(unwrapResult)
      .then(() => {
        dispatch(
          displaySnackbar({
            message: productId
              ? MessagesEnum.UPDATE_SUCCESS
              : MessagesEnum.CREATE_SUCCESS,
          })
        );
        history.push(ProductPathsEnum.LIST);
      })
      .catch(() => handleErrorResponse({ dispatch }))
      .finally(() => setSubmitting(false));
  };

  useEffect(() => {
    if (productId) {
      dispatch(getProductDetail(Number(productId))).finally(() =>
        setIsLoading(false)
      );
    } else {
      setIsLoading(false);
    }
  }, [dispatch, productId]);

  useEffect(() => {
    dispatch(getAllCategory({ type: CategoryTypesEnum.PRODUCT }));
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={editSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <StickyHeader
            linkBack={ProductPathsEnum.LIST}
            isSubmitting={isSubmitting}
          />

          <ContentWrapper>
            <Box mb={3}>
              <FormikTextField
                name="title"
                label="Title"
                placeholder="example"
                fullWidth
              />
            </Box>

            <Box mb={3}>
              <FormikSelect
                name="categoryId"
                label="Categories"
                options={categoryOptions}
                fullWidth
              />
            </Box>

            <Box mb={3}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormikSelect
                    name="isHot"
                    label="Hot product"
                    options={PRODUCT_HOT_OPTIONS}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormikSelect
                    name="status"
                    label="Status"
                    options={PRODUCT_STATUS_OPTIONS}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>

            <Box mb={3}>
              <FormikTextField
                name="price"
                label="Price"
                placeholder="Price"
                fullWidth
              />
            </Box>

            <Box mb={3}>
              <FormikTextField
                name="quantity"
                label="Quantity"
                placeholder="100"
                fullWidth
              />
            </Box>

            <UploadImage
              name="thumbnail"
              label="Thumbnail"
              cropAspectRatio={AspectRatioEnum.THREE_TO_FOUR}
            />

            <Box mb={3}>
              <FormikTextField
                name="description"
                label="Description"
                placeholder="example"
                multiline
                fullWidth
                rows={3}
              />
            </Box>

            <Box mb={3}>
              <FormikTextField
                name="include"
                label="Include"
                placeholder="example"
                multiline
                fullWidth
                rows={3}
              />
            </Box>

            <Box mb={3}>
              <FormikTextField
                name="content"
                label="Content"
                placeholder="example"
                multiline
                fullWidth
                rows={5}
              />
            </Box>
          </ContentWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default EditScreen;
