import React, { FC } from "react";

import {
  TipsAndUpdatesRounded,
  TokenRounded,
  TryRounded,
} from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";

import { TimeStatisticalEnum } from "features/dashboard/dashboard";
import { useAppSelector } from "redux/store";

import TotalRecord from "../../components/TotalRecord/TotalRecord";

const DashboardScreen: FC = () => {
  const { userInfo } = useAppSelector(state => state.auth);

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Hi {userInfo?.name || "Unknown"}, Welcome back
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TotalRecord
            title="Product Sold"
            total={765}
            percent={3.6}
            timeStatistical={TimeStatisticalEnum.WEEK}
            icon={TokenRounded}
            colorIcon="info"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TotalRecord
            title="Total Balance"
            total={18.765}
            percent={-0.1}
            timeStatistical={TimeStatisticalEnum.WEEK}
            icon={TipsAndUpdatesRounded}
            colorIcon="error"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TotalRecord
            title="Sales Profit"
            total={4.876}
            percent={0.6}
            timeStatistical={TimeStatisticalEnum.WEEK}
            icon={TryRounded}
            colorIcon="primary"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardScreen;
