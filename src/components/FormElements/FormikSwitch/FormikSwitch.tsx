import React, { FC, memo } from "react";

import {
  FormControlLabel,
  FormGroup,
  Switch,
  SwitchProps,
} from "@mui/material";
import { useFormikContext } from "formik";
import { get } from "lodash";

import { StatusEnum } from "constants/common.constants";

interface FormikSwitchProps extends SwitchProps {
  name: string;
  label?: string;
}

const FormikSwitch: FC<FormikSwitchProps> = ({ name, label }) => {
  const { values, setFieldValue } = useFormikContext<unknown>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setFieldValue(
        name,
        event.target.checked ? StatusEnum.DISPLAY : StatusEnum.HIDDEN
      );
    }
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={!!get(values, name)}
            inputProps={{ "aria-label": "controlled" }}
            onChange={handleChange}
          />
        }
        label={label || "Active"}
      />
    </FormGroup>
  );
};

export default memo(FormikSwitch);
