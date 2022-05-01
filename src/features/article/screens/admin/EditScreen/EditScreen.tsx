import React, { FC, memo, useEffect, useState, useMemo } from "react";

import { Box } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { Formik, Form, FormikHelpers } from "formik";
import { useHistory, useParams } from "react-router-dom";

import ContentWrapper from "components/EditComponents/ContentWrapper";
import StickyHeader from "components/EditComponents/StickyHeader";
import FormikSelect from "components/FormElements/FormikSelect/FormikSelect";
import FormikTextField from "components/FormElements/FormikTextField/FormikTextField";
import Loader from "components/Loader/Loader";
import UploadImage from "components/UploadImage/UploadImage";
import { MessagesEnum } from "constants/message.constants";
import {
  ARTICLE_STATUS_OPTIONS,
  ArticlePathsEnum,
  editSchema,
  editInitialValues,
  convertResponseToFormData,
  postArticle,
  getArticleDetail,
  putArticle,
  ArticleRequest,
} from "features/article/article";
import { CategoryTypesEnum, getAllCategory } from "features/category/category";
import { handleErrorResponse } from "helpers/forms/handle-error-response";
import { uploadImage } from "helpers/forms/upload-image";
import { displaySnackbar } from "redux/snackbar.slice";
import { useAppDispatch, useAppSelector } from "redux/store";

const EditScreen: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { articleDetail } = useAppSelector(state => state.article);
  const { allCategory } = useAppSelector(state => state.category);
  const { articleId } = useParams<{ articleId: string }>();

  const [isLoading, setIsLoading] = useState(true);

  const initialValues = useMemo(() => {
    if (articleId && articleDetail) {
      return convertResponseToFormData(articleDetail);
    }
    return editInitialValues;
  }, [articleDetail, articleId]);

  const categoryOptions = useMemo(() => {
    return (
      allCategory?.map(item => ({
        label: item.title,
        value: item.id,
      })) || []
    );
  }, [allCategory]);

  const handleSubmit = async (
    values: ArticleRequest,
    { setSubmitting }: FormikHelpers<ArticleRequest>
  ) => {
    if (values.thumbnail instanceof File) {
      const response = await uploadImage(values.thumbnail);
      if (response) {
        values.thumbnail = response;
      }
    }
    const action = articleId
      ? dispatch(
          putArticle({
            data: values,
            articleId: Number(articleId),
          })
        )
      : dispatch(postArticle(values));

    action
      .then(unwrapResult)
      .then(() => {
        dispatch(
          displaySnackbar({
            message: articleId
              ? MessagesEnum.UPDATE_SUCCESS
              : MessagesEnum.CREATE_SUCCESS,
          })
        );
        history.push(ArticlePathsEnum.LIST);
      })
      .catch(() => handleErrorResponse({ dispatch }))
      .finally(() => setSubmitting(false));
  };

  useEffect(() => {
    if (articleId) {
      dispatch(getArticleDetail(Number(articleId))).finally(() =>
        setIsLoading(false)
      );
    } else {
      setIsLoading(false);
    }
  }, [dispatch, articleId]);

  useEffect(() => {
    dispatch(getAllCategory({ type: CategoryTypesEnum.ARTICLE }));
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
            linkBack={ArticlePathsEnum.LIST}
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

            <UploadImage name="thumbnail" label="Thumbnail" />

            <Box mb={3}>
              <FormikTextField
                name="source"
                label="Source"
                placeholder="example"
                fullWidth
              />
            </Box>

            <Box mb={3}>
              <FormikTextField
                name="author"
                label="Author"
                placeholder="example"
                fullWidth
              />
            </Box>

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
                name="content"
                label="Content"
                placeholder="example"
                multiline
                fullWidth
                rows={5}
              />
            </Box>

            <Box mb={3}>
              <FormikSelect
                name="status"
                label="Status"
                options={ARTICLE_STATUS_OPTIONS}
                fullWidth
              />
            </Box>
          </ContentWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default memo(EditScreen);
