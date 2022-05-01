import React, { FC, memo, useEffect, useState, useMemo } from "react";

import { Box } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { Formik, Form, FormikHelpers } from "formik";
import { useHistory, useParams } from "react-router-dom";

import ContentWrapper from "components/EditComponents/ContentWrapper";
import StickyHeader from "components/EditComponents/StickyHeader";
import FormikTextField from "components/FormElements/FormikTextField/FormikTextField";
import Loader from "components/Loader/Loader";
import { MessagesEnum } from "constants/message.constants";
import {
  PaymentPathsEnum,
  editSchema,
  editInitialValues,
  convertResponseToFormData,
  postPayment,
  getPaymentDetail,
  putPayment,
  PaymentRequest,
} from "features/payment/payment";
import { handleErrorResponse } from "helpers/forms/handle-error-response";
import { displaySnackbar } from "redux/snackbar.slice";
import { useAppDispatch, useAppSelector } from "redux/store";

const EditScreen: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { paymentDetail } = useAppSelector(state => state.payment);
  const { paymentId } = useParams<{ paymentId: string }>();

  const [isLoading, setIsLoading] = useState(true);

  const initialValues = useMemo(() => {
    if (paymentId && paymentDetail) {
      return convertResponseToFormData(paymentDetail);
    }
    return editInitialValues;
  }, [paymentDetail, paymentId]);

  const handleSubmit = (
    values: PaymentRequest,
    { setSubmitting }: FormikHelpers<PaymentRequest>
  ) => {
    const action = paymentId
      ? dispatch(
          putPayment({
            data: values,
            paymentId: Number(paymentId),
          })
        )
      : dispatch(postPayment(values));

    action
      .then(unwrapResult)
      .then(() => {
        dispatch(
          displaySnackbar({
            message: paymentId
              ? MessagesEnum.UPDATE_SUCCESS
              : MessagesEnum.CREATE_SUCCESS,
          })
        );
        history.push(PaymentPathsEnum.LIST);
      })
      .catch(() => handleErrorResponse({ dispatch }))
      .finally(() => setSubmitting(false));
  };

  useEffect(() => {
    if (paymentId) {
      dispatch(getPaymentDetail(Number(paymentId))).finally(() =>
        setIsLoading(false)
      );
    } else {
      setIsLoading(false);
    }
  }, [dispatch, paymentId]);

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
            linkBack={PaymentPathsEnum.LIST}
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

export default memo(EditScreen);
