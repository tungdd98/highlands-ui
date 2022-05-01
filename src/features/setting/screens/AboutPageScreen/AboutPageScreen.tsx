import React, { FC, memo, useState, useEffect } from "react";

import { Typography } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { Form, Formik } from "formik";
import { useHistory } from "react-router-dom";

import ContentWrapper from "components/EditComponents/ContentWrapper";
import StickyHeader from "components/EditComponents/StickyHeader";
import Loader from "components/Loader/Loader";
import TextEditor from "components/TextEditor/TextEditor";
import {
  getSettingPage,
  patchSettingPage,
  SettingPathsEnum,
} from "features/setting/setting";
import { handleErrorResponse } from "helpers/forms/handle-error-response";
import { useAppDispatch, useAppSelector } from "redux/store";

const AboutPageScreen: FC = () => {
  const dispatch = useAppDispatch();
  const { setting } = useAppSelector(state => state.setting);
  const history = useHistory();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getSettingPage()).finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Formik
      initialValues={
        setting ? { aboutPage: setting.aboutPage } : { aboutPage: "" }
      }
      onSubmit={(values, { setSubmitting }) => {
        dispatch(patchSettingPage(values))
          .then(unwrapResult)
          .then(() => history.push(SettingPathsEnum.DETAIL))
          .catch(() => handleErrorResponse({ dispatch }))
          .finally(() => setSubmitting(false));
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <StickyHeader
            linkBack={SettingPathsEnum.DETAIL}
            isSubmitting={isSubmitting}
          />

          <ContentWrapper>
            <Typography sx={{ fontWeight: 600, mb: 2 }}>
              About content
            </Typography>
            <TextEditor name="aboutPage" />
          </ContentWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default memo(AboutPageScreen);
