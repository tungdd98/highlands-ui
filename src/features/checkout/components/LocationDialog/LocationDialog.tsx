import React, { FC, memo } from "react";

import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { Form, Formik, FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";

import FormikTextField from "components/FormElements/FormikTextField/FormikTextField";
import { addUserLocation } from "features/auth/auth";
import {
  schemaLocation,
  initialValuesLocation,
  LocationForm,
  postUserLocation,
} from "features/checkout/checkout";
import { handleErrorResponse } from "helpers/forms/handle-error-response";
import { useAppDispatch, useAppSelector } from "redux/store";

interface LocationDialogProps {
  open: boolean;
  onClose: () => void;
}

const LocationDialog: FC<LocationDialogProps> = ({ open, onClose }) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(state => state.auth);

  const handleClose = ({ resetForm }: FormikHelpers<LocationForm>) => {
    resetForm({
      values: initialValuesLocation,
    });
    onClose();
  };

  const handleSubmit = (
    values: LocationForm,
    { resetForm, setSubmitting }: FormikHelpers<LocationForm>
  ) => {
    if (!userInfo) return;

    dispatch(
      postUserLocation({
        ...values,
        userId: userInfo.id,
      })
    )
      .then(unwrapResult)
      .then(res => {
        dispatch(addUserLocation(res));
        resetForm({
          values: initialValuesLocation,
        });
        onClose();
      })
      .catch(() => handleErrorResponse({ dispatch }))
      .finally(() => setSubmitting(false));
  };

  return (
    <Dialog keepMounted open={open} maxWidth="sm" fullWidth>
      <Formik
        initialValues={initialValuesLocation}
        validationSchema={schemaLocation}
        onSubmit={handleSubmit}
      >
        {helpers => {
          return (
            <Form>
              <DialogTitle sx={{ fontWeight: 600 }}>
                {t("button.Add new address", { ns: "client" })}
              </DialogTitle>

              <DialogContent>
                <Box sx={{ mb: 3 }}>
                  <FormikTextField
                    name="name"
                    label="Fullname"
                    placeholder="example"
                    fullWidth
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <FormikTextField
                    name="address"
                    label="Address"
                    placeholder="example"
                    fullWidth
                    multiline
                    rows={3}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <FormikTextField
                    name="phone"
                    label="Phone number"
                    placeholder="0973793xxx"
                    fullWidth
                  />
                </Box>
              </DialogContent>

              <DialogActions sx={{ px: 3 }}>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={helpers.isSubmitting}
                >
                  {t("button.Deliver To This Address", { ns: "client" })}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleClose(helpers)}
                >
                  {t("button.Cancel", { ns: "client" })}
                </Button>
              </DialogActions>
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default memo(LocationDialog);
