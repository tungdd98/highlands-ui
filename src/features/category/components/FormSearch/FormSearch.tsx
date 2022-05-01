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
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  queries: CategoryParams;
  setQueries: React.Dispatch<React.SetStateAction<CategoryParams>>;
}

const FormSearch: FC<FormSearchProps> = ({
  isSubmitting,
  setIsSubmitting,
  queries,
  setQueries,
}) => {
  const { t } = useTranslation();

  const handleSubmit = (values: CategoryParams) => {
    setQueries(values);
    if (Object.values(omit(values, ["page", "perPage"])).some(item => !!item)) {
      setIsSubmitting(true);
    }
  };

  return (
    <Box p={3} component={Paper} mb={4} elevation={3}>
      <Typography variant="h5">
        {t("button.Search", { ns: "admin" })}
      </Typography>
      <Box mt={3}>
        <Formik
          validationSchema={searchSchema}
          initialValues={queries}
          onSubmit={handleSubmit}
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
                  label={t("label.Title", { ns: "admin" })}
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
            <Box textAlign="right" mt={2}>
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
