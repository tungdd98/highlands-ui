import React, { FC, memo } from "react";

import {
  TokenOutlined,
  TrendingDownRounded,
  TrendingUpRounded,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  SvgIconTypeMap,
  Typography,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { useTranslation } from "react-i18next";

import {
  TimeStatisticalEnum,
  STATISTICAL_TIME,
} from "features/dashboard/dashboard";
import { toCurrency } from "helpers/converts/currency";

interface TotalRecordProps {
  title: string;
  total: number;
  percent: number;
  timeStatistical: TimeStatisticalEnum;
  icon: OverridableComponent<SvgIconTypeMap>;
  colorIcon:
    | "inherit"
    | "action"
    | "disabled"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
}

const TotalRecord: FC<TotalRecordProps> = ({
  title,
  total,
  percent,
  timeStatistical,
  icon,
  colorIcon,
}) => {
  const { t } = useTranslation();

  const isBetter = percent > 0;
  const IconTotal = icon || TokenOutlined;

  return (
    <Card>
      <CardContent>
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: 2,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {toCurrency(total, true)}
          </Typography>
          <IconTotal fontSize="large" color={colorIcon} />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isBetter ? (
            <TrendingUpRounded
              fontSize="small"
              color="primary"
              sx={{ mr: 2 }}
            />
          ) : (
            <TrendingDownRounded
              fontSize="small"
              color="error"
              sx={{ mr: 2 }}
            />
          )}
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {isBetter ? "+" : ""}
            {toCurrency(percent, true)}%&nbsp;
          </Typography>
          <Typography variant="body1" color="GrayText">
            {t(`label.${STATISTICAL_TIME[timeStatistical]}`, { ns: "admin" })}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default memo(TotalRecord);
