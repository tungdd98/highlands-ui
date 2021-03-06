import React, { FC, memo } from "react";

import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import { omit } from "lodash";
import { useTranslation } from "react-i18next";

import FormikSelect from "components/FormElements/FormikSelect/FormikSelect";
import FormikTextField from "components/FormElements/FormikTextField/FormikTextField";
import {
  CATEGORY_OPTIONS,
  searchSchema,
  CategoryParams,
} from "features/category/category";

interface FormSearchProps {
  isSubmitting: boolean;
  queries: CategoryParams;
  setQueries: React.Dispatch<React.SetStateAction<CategoryParams>>;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormSearch: FC<FormSearchProps> = ({
  isSubmitting,
  setIsSubmitting,
  queries,
  setQueries,
}) => {
  const { t } = useTranslation();

  const submitForm = (values: CategoryParams) => {
    setQueries(values);
    if (Object.values(omit(values, ["page", "perPage"])).some(item => !!item)) {
      setIsSubmitting(true);
    }
  };

  return (
    <Box sx={{ p: 3, mb: 4 }} component={Paper} elevation={3}>
      <Typography variant="h5">
        {t("button.Search", { ns: "admin" })}
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Formik
          validationSchema={searchSchema}
          initialValues={queries}
          onSubmit={submitForm}
        >
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <FormikTextField
                  name="id"
                  label="ID"
                  placeholder="example"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormikTextField
                  name="title"
                  label="Title"
                  placeholder="example"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormikSelect
                  name="type"
                  label="Type"
                  options={CATEGORY_OPTIONS}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Box sx={{ textAlign: "right", mt: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                type="submit"
                disabled={isSubmitting}
              >
                {t("button.Search", { ns: "admin" })}
              </Button>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};

export default memo(FormSearch);
