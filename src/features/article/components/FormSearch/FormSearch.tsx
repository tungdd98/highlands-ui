import React, { FC, memo, useMemo } from "react";

import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import { omit } from "lodash";
import { useTranslation } from "react-i18next";

import FormikSelect from "components/FormElements/FormikSelect/FormikSelect";
import FormikTextField from "components/FormElements/FormikTextField/FormikTextField";
import {
  ARTICLE_STATUS_OPTIONS,
  searchSchema,
  ArticleParams,
} from "features/article/article";
import { useAppSelector } from "redux/store";

interface FormSearchProps {
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  queries: ArticleParams;
  setQueries: React.Dispatch<React.SetStateAction<ArticleParams>>;
}

const FormSearch: FC<FormSearchProps> = ({
  isSubmitting,
  setIsSubmitting,
  queries,
  setQueries,
}) => {
  const { t } = useTranslation();

  const { allCategory } = useAppSelector(state => state.category);

  const categoryOptions = useMemo(() => {
    return (
      allCategory?.map(item => ({
        label: item.title,
        value: item.id,
      })) || []
    );
  }, [allCategory]);

  const handleSubmit = (values: ArticleParams) => {
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
                  label="Title"
                  placeholder="example"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormikSelect
                  name="status"
                  label="Status"
                  options={ARTICLE_STATUS_OPTIONS}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormikSelect
                  name="categoryId"
                  label="Categories"
                  options={categoryOptions}
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
