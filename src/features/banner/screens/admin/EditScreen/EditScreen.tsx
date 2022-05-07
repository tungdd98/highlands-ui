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
  BANNER_STATUS_OPTIONS,
  BannerPathsEnum,
  editSchema,
  editInitialValues,
  convertResponseToFormData,
  postBanner,
  getBannerDetail,
  putBanner,
  BannerRequest,
} from "features/banner/banner";
import { handleErrorResponse } from "helpers/forms/handle-error-response";
import { uploadImage } from "helpers/forms/upload-image";
import { displaySnackbar } from "redux/snackbar.slice";
import { useAppDispatch, useAppSelector } from "redux/store";

const EditScreen: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { bannerDetail } = useAppSelector(state => state.banner);
  const { bannerId } = useParams<{ bannerId: string }>();

  const [isLoading, setIsLoading] = useState(true);

  const initialValues = useMemo(() => {
    if (bannerId && bannerDetail) {
      return convertResponseToFormData(bannerDetail);
    }
    return editInitialValues;
  }, [bannerDetail, bannerId]);

  const handleSubmit = async (
    values: BannerRequest,
    { setSubmitting }: FormikHelpers<BannerRequest>
  ) => {
    if (values.thumbnail instanceof File) {
      const response = await uploadImage(values.thumbnail);
      if (response) {
        values.thumbnail = response;
      }
    }
    const action = bannerId
      ? dispatch(
          putBanner({
            data: values,
            bannerId: Number(bannerId),
          })
        )
      : dispatch(postBanner(values));

    action
      .then(unwrapResult)
      .then(() => {
        dispatch(
          displaySnackbar({
            message: bannerId
              ? MessagesEnum.UPDATE_SUCCESS
              : MessagesEnum.CREATE_SUCCESS,
          })
        );
        history.push(BannerPathsEnum.LIST);
      })
      .catch(() => handleErrorResponse({ dispatch }))
      .finally(() => setSubmitting(false));
  };

  useEffect(() => {
    if (bannerId) {
      dispatch(getBannerDetail(Number(bannerId))).finally(() =>
        setIsLoading(false)
      );
    } else {
      setIsLoading(false);
    }
  }, [dispatch, bannerId]);

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
            linkBack={BannerPathsEnum.LIST}
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

            <UploadImage name="thumbnail" label="Thumbnail" />

            <Box sx={{ mb: 3 }}>
              <FormikTextField
                name="link"
                label="Link"
                placeholder="Link"
                fullWidth
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <FormikSelect
                name="status"
                label="Status"
                options={BANNER_STATUS_OPTIONS}
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
