import React, { FC, useEffect, useState, useMemo } from "react";

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
  DeliveryPathsEnum,
  editSchema,
  editInitialValues,
  convertResponseToFormData,
  postDelivery,
  getDeliveryDetail,
  putDelivery,
  DeliveryRequest,
} from "features/delivery/delivery";
import { handleErrorResponse } from "helpers/forms/handle-error-response";
import { displaySnackbar } from "redux/snackbar.slice";
import { useAppDispatch, useAppSelector } from "redux/store";

const EditScreen: FC = () => {
  const history = useHistory();
  const { deliveryId } = useParams<{ deliveryId: string }>();

  const dispatch = useAppDispatch();
  const { deliveryDetail } = useAppSelector(state => state.delivery);

  const [isLoading, setIsLoading] = useState(true);

  const initialValues = useMemo(() => {
    if (deliveryId && deliveryDetail) {
      return convertResponseToFormData(deliveryDetail);
    }
    return editInitialValues;
  }, [deliveryDetail, deliveryId]);

  const handleSubmit = (
    values: DeliveryRequest,
    { setSubmitting }: FormikHelpers<DeliveryRequest>
  ) => {
    const action = deliveryId
      ? dispatch(
          putDelivery({
            data: values,
            deliveryId: Number(deliveryId),
          })
        )
      : dispatch(postDelivery(values));

    action
      .then(unwrapResult)
      .then(() => {
        dispatch(
          displaySnackbar({
            message: deliveryId
              ? MessagesEnum.UPDATE_SUCCESS
              : MessagesEnum.CREATE_SUCCESS,
          })
        );
        history.push(DeliveryPathsEnum.LIST);
      })
      .catch(() => handleErrorResponse({ dispatch }))
      .finally(() => setSubmitting(false));
  };

  useEffect(() => {
    if (deliveryId) {
      dispatch(getDeliveryDetail(Number(deliveryId))).finally(() =>
        setIsLoading(false)
      );
    } else {
      setIsLoading(false);
    }
  }, [dispatch, deliveryId]);

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
            linkBack={DeliveryPathsEnum.LIST}
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

            <FormikTextField
              name="price"
              label="Price"
              placeholder="Price"
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
