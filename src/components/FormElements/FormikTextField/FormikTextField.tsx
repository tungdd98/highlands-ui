import React, { FC, memo } from "react";

import { TextField, TextFieldProps, Typography } from "@mui/material";
import { Field, useFormikContext } from "formik";
import { get } from "lodash";
import { useTranslation } from "react-i18next";

interface FormikTextFieldProps extends Omit<TextFieldProps, "name"> {
  name: string;
  ns?: string;
}

const FormikTextField: FC<FormikTextFieldProps> = ({
  label,
  id,
  name,
  variant = "filled",
  ns = "admin",
  placeholder,
  ...props
}) => {
  const { t } = useTranslation();

  const { errors, touched, values, handleBlur, handleChange } =
    useFormikContext<unknown>();

  const error = get(errors, name) && get(touched, name);
  const errorText = get(errors, name);

  return (
    <>
      {label && (
        <Typography sx={{ mb: 1, fontWeight: "fontWeightMedium" }}>
          <label htmlFor={id || name}>{t(`label.${label}`, { ns })}</label>
        </Typography>
      )}
      <Field
        {...props}
        component={TextField}
        onChange={handleChange}
        onBlur={handleBlur}
        id={id || name}
        name={name}
        variant={variant}
        error={!!error}
        helperText={error && errorText}
        value={get(values, name)}
        autoComplete="off"
        hiddenLabel
        label=""
        placeholder={placeholder ? t(`placeholder.${placeholder}`, { ns }) : ""}
      />
    </>
  );
};

export default memo(FormikTextField);
