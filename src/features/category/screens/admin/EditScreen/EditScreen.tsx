import React, { FC, useEffect, useState, useMemo } from "react";

import { Box } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { Formik, Form, FormikHelpers } from "formik";
import { useHistory, useParams } from "react-router-dom";

import ContentWrapper from "components/EditComponents/ContentWrapper";
import StickyHeader from "components/EditComponents/StickyHeader";
import FormikSelect from "components/FormElements/FormikSelect/FormikSelect";
import FormikTextField from "components/FormElements/FormikTextField/FormikTextField";
import Loader from "components/Loader/Loader";
import { MessagesEnum } from "constants/message.constants";
import {
  CATEGORY_OPTIONS,
  CategoryPathsEnum,
  editSchema,
  editInitialValues,
  convertResponseToFormData,
  postCategory,
  getCategoryDetail,
  putCategory,
  CategoryRequest,
} from "features/category/category";
import { handleErrorResponse } from "helpers/forms/handle-error-response";
import { displaySnackbar } from "redux/snackbar.slice";
import { useAppDispatch, useAppSelector } from "redux/store";

const EditScreen: FC = () => {
  const history = useHistory();
  const { categoryId } = useParams<{ categoryId: string }>();

  const dispatch = useAppDispatch();
  const { categoryDetail } = useAppSelector(state => state.category);

  const [isLoading, setIsLoading] = useState(true);

  const initialValues = useMemo(() => {
    if (categoryId && categoryDetail) {
      return convertResponseToFormData(categoryDetail);
    }
    return editInitialValues;
  }, [categoryDetail, categoryId]);

  const handleSubmit = (
    values: CategoryRequest,
    { setSubmitting }: FormikHelpers<CategoryRequest>
  ) => {
    const action = categoryId
      ? dispatch(
          putCategory({
            data: values,
            categoryId: Number(categoryId),
          })
        )
      : dispatch(postCategory(values));

    action
      .then(unwrapResult)
      .then(() => {
        dispatch(
          displaySnackbar({
            message: categoryId
              ? MessagesEnum.UPDATE_SUCCESS
              : MessagesEnum.CREATE_SUCCESS,
          })
        );
        history.push(CategoryPathsEnum.LIST);
      })
      .catch(() => handleErrorResponse({ dispatch }))
      .finally(() => setSubmitting(false));
  };

  useEffect(() => {
    if (categoryId) {
      dispatch(getCategoryDetail(Number(categoryId))).finally(() =>
        setIsLoading(false)
      );
    } else {
      setIsLoading(false);
    }
  }, [dispatch, categoryId]);

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
            linkBack={CategoryPathsEnum.LIST}
            isSubmitting={isSubmitting}
          />

          <ContentWrapper>
            <Box sx={{ mb: 3 }}>
              <FormikTextField
                name="title"
                label="Title"
                placeholder="example"
                fullWidth
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <FormikSelect
                name="type"
                label="Type"
                options={CATEGORY_OPTIONS}
                fullWidth
              />
            </Box>

            <FormikTextField
              name="description"
              label="Description"
              placeholder="example"
              multiline
              fullWidth
              rows={5}
            />
          </ContentWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default EditScreen;
