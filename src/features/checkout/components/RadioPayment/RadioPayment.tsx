import React, { FC, memo } from "react";

import { FormControlLabel, Radio, Typography } from "@mui/material";

interface RadioPaymentProps {
  value: string | number;
  title: string;
  subTitle?: string;
}

const RadioPayment: FC<RadioPaymentProps> = ({ value, title, subTitle }) => {
  return (
    <FormControlLabel
      control={<Radio />}
      label={
        <>
          <Typography sx={{ fontWeight: 600 }}>{title}</Typography>
          {subTitle && <Typography variant="caption">{subTitle}</Typography>}
        </>
      }
      value={value}
      sx={{
        border: 1,
        borderRadius: 1,
        borderColor: "divider",
        p: 2,
        ml: 0,
        width: "100%",
      }}
    />
  );
};

export default memo(RadioPayment);
