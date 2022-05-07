import React, { FC, memo } from "react";

import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface RowDataProps {
  content?: string;
}

const RowData: FC<RowDataProps> = ({ content }) => {
  const { t } = useTranslation();

  return content ? (
    <Typography variant="body2">{content}</Typography>
  ) : (
    <Typography variant="body2" color="text.disabled">
      {t("label.No setting", { ns: "admin" })}
    </Typography>
  );
};

export default memo(RowData);
