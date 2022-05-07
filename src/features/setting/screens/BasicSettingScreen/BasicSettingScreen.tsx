import React, { FC, useState, useEffect } from "react";

import { Box } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { Form, Formik, FormikHelpers } from "formik";
import { useHistory } from "react-router-dom";

import ContentWrapper from "components/EditComponents/ContentWrapper";
import StickyHeader from "components/EditComponents/StickyHeader";
import FormikTextField from "components/FormElements/FormikTextField/FormikTextField";
import Loader from "components/Loader/Loader";
import UploadImage from "components/UploadImage/UploadImage";
import { AspectRatioEnum } from "constants/common.constants";
import {
  getSettingPage,
  postSettingPage,
  patchSettingPage,
  SettingPathsEnum,
  BasicSettingForm,
  setInitValuesBasicSetting,
} from "features/setting/setting";
import { handleErrorResponse } from "helpers/forms/handle-error-response";
import { uploadImage } from "helpers/forms/upload-image";
import { useAppDispatch, useAppSelector } from "redux/store";

const BasicSettingScreen: FC = () => {
  const history = useHistory();

  const dispatch = useAppDispatch();
  const { setting } = useAppSelector(state => state.setting);

  const [loading, setLoading] = useState(true);

  const handleSubmit = async (
    values: BasicSettingForm,
    { setSubmitting }: FormikHelpers<BasicSettingForm>
  ) => {
    if (values.thumbnail instanceof File) {
      const response = await uploadImage(values.thumbnail);
      if (response) {
        values.thumbnail = response;
      }
    }
    if (values.favicon instanceof File) {
      const response = await uploadImage(values.favicon);
      if (response) {
        values.favicon = response;
      }
    }
    const action = setting
      ? dispatch(patchSettingPage(values))
      : dispatch(postSettingPage(values));
    action
      .then(unwrapResult)
      .then(() => {
        history.push(SettingPathsEnum.DETAIL);
      })
      .catch(() => handleErrorResponse({ dispatch }))
      .finally(() => setSubmitting(false));
  };

  useEffect(() => {
    dispatch(getSettingPage()).finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Formik
      initialValues={setInitValuesBasicSetting(setting)}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <StickyHeader
            linkBack={SettingPathsEnum.DETAIL}
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
              <FormikTextField
                name="description"
                label="Description"
                placeholder="example"
                multiline
                fullWidth
                rows={5}
              />
            </Box>

            <UploadImage
              name="favicon"
              label="Favicon"
              width={150}
              cropAspectRatio={AspectRatioEnum.ONE_TO_ONE}
            />

            <UploadImage
              name="thumbnail"
              label="Thumbnail"
              width={200}
              cropAspectRatio={AspectRatioEnum.ONE_TO_ONE}
            />

            <Box sx={{ mb: 3 }}>
              <FormikTextField
                name="address"
                label="Address"
                placeholder="example"
                fullWidth
                multiline
                rows={5}
              />
            </Box>

            <FormikTextField
              name="hotline"
              label="Hotline"
              placeholder="example"
              fullWidth
            />
          </ContentWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default BasicSettingScreen;
