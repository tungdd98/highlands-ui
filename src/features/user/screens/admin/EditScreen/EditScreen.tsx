import React, { FC, memo, useEffect, useState, useMemo } from "react";

import { Box } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { Formik, Form, FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";

import ContentWrapper from "components/EditComponents/ContentWrapper";
import StickyHeader from "components/EditComponents/StickyHeader";
import FormikTextField from "components/FormElements/FormikTextField/FormikTextField";
import Loader from "components/Loader/Loader";
import { ModesScreenEnum } from "constants/common.constants";
import { MessagesEnum } from "constants/message.constants";
import {
  UserPathsEnum,
  editSchema,
  editInitialValues,
  convertResponseToFormData,
  postUser,
  getUserDetail,
  putUser,
  UserRequest,
} from "features/user/user";
import { handleErrorResponse } from "helpers/forms/handle-error-response";
import { displaySnackbar } from "redux/snackbar.slice";
import { useAppDispatch, useAppSelector } from "redux/store";

const EditScreen: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { userDetail } = useAppSelector(state => state.user);
  const { mode, userId } = useParams<{ mode: string; userId: string }>();

  const [isLoading, setIsLoading] = useState(true);

  const initialValues = useMemo(() => {
    if (userId && userDetail) {
      return convertResponseToFormData(userDetail);
    }
    return editInitialValues;
  }, [userDetail, userId]);

  const handleSubmit = (
    values: UserRequest,
    { setSubmitting }: FormikHelpers<UserRequest>
  ) => {
    const action = userId
      ? dispatch(
          putUser({
            data: values,
            userId: Number(userId),
          })
        )
      : dispatch(postUser(values));

    action
      .then(unwrapResult)
      .then(() => {
        dispatch(
          displaySnackbar({
            message: userId
              ? MessagesEnum.UPDATE_SUCCESS
              : MessagesEnum.CREATE_SUCCESS,
          })
        );
        history.push(UserPathsEnum.LIST);
      })
      .catch(() => handleErrorResponse({ dispatch }))
      .finally(() => setSubmitting(false));
  };

  useEffect(() => {
    if (userId) {
      dispatch(getUserDetail(Number(userId))).finally(() =>
        setIsLoading(false)
      );
    } else {
      setIsLoading(false);
    }
  }, [dispatch, userId]);

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
            linkBack={UserPathsEnum.LIST}
            isSubmitting={isSubmitting}
          />

          <ContentWrapper>
            <Box mb={3}>
              <FormikTextField
                name="email"
                label="Email"
                placeholder={t("placeholder.example@gmail.com", {
                  ns: "admin",
                })}
                fullWidth
                disabled={mode !== ModesScreenEnum.CREATE}
              />
            </Box>

            <Box mb={3}>
              <FormikTextField
                name="name"
                label="Name"
                placeholder={t("placeholder.example", { ns: "admin" })}
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
