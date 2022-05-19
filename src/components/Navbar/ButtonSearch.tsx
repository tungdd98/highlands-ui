import React, { FC, useState } from "react";

import { CloseRounded, SearchRounded } from "@mui/icons-material";
import { Box, IconButton, Slide } from "@mui/material";
import { Form, Formik } from "formik";
import { useHistory } from "react-router-dom";

import FormikTextField from "components/FormElements/FormikTextField/FormikTextField";
import { ProductPathsEnum } from "features/product/product";

const ButtonSearch: FC = () => {
  const history = useHistory();

  const [isShowSearchForm, setIsShowSearchForm] = useState(false);

  const handleOpenSearchForm = () => {
    setIsShowSearchForm(true);
  };

  const handleCloseSearchForm = () => {
    setIsShowSearchForm(false);
  };

  return (
    <>
      <IconButton onClick={handleOpenSearchForm}>
        <SearchRounded />
      </IconButton>

      <Slide direction="down" mountOnEnter unmountOnExit in={isShowSearchForm}>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            bgcolor: "rgba(255, 255, 255, 0.8)",
            m: "0 !important",
            zIndex: 1400,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: 10, right: 10 }}
            onClick={handleCloseSearchForm}
          >
            <CloseRounded />
          </IconButton>
          <Box
            sx={{
              width: "70%",
            }}
          >
            <Formik
              initialValues={{ title: "" }}
              onSubmit={values => {
                if (!values.title) {
                  return;
                }
                history.push(
                  `${ProductPathsEnum.SEARCH}?title=${values.title}`
                );
              }}
            >
              <Form>
                <FormikTextField
                  variant="standard"
                  name="title"
                  fullWidth
                  label="Search"
                  sx={{ bgcolor: "white" }}
                />
              </Form>
            </Formik>
          </Box>
        </Box>
      </Slide>
    </>
  );
};

export default ButtonSearch;
