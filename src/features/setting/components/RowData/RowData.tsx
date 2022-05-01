import React, { FC, memo } from "react";

import { Typography } from "@mui/material";

interface RowDataProps {
  content?: string;
}

const RowData: FC<RowDataProps> = ({ content }) => {
  return content ? (
    <Typography variant="body2">{content}</Typography>
  ) : (
    <Typography variant="body2" color="text.disabled">
      No setting
    </Typography>
  );
};

export default memo(RowData);
