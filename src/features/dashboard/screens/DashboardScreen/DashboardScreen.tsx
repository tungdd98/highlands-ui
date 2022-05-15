import React, { FC, useEffect, useMemo, useState } from "react";

import {
  TipsAndUpdatesRounded,
  TokenRounded,
  TryRounded,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { subMonths, subWeeks } from "date-fns";
import { subYears } from "date-fns/esm";

import Loader from "components/Loader/Loader";
import {
  TimeStatisticalEnum,
  STATISTICAL_TIME_SELECT,
} from "features/dashboard/dashboard";
import {
  getTotalQuantityOrdersCompleted,
  getTotalMoneyOrdersCompleted,
  getTotalOrdersCompleted,
  getTotalOrders,
} from "features/order/order";
import { useAppSelector, useAppDispatch } from "redux/store";

import LatestProduct from "../../components/LatestProduct/LatestProduct";
import SalesOverview from "../../components/SalesOverview/SalesOverview";
import TotalRecord from "../../components/TotalRecord/TotalRecord";

const DashboardScreen: FC = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(state => state.auth);
  const {
    completed: {
      totalQuantityOrders,
      totalMoneyOrders,
      totalOrders: totalOrdersCompleted,
      percentQuantity,
      percentMoney,
      percentOrder,
    },
    totalOrders,
  } = useAppSelector(state => state.order);

  const [time, setTime] = useState(TimeStatisticalEnum.WEEK);
  const [loading, setLoading] = useState(true);

  const startTime = useMemo(() => {
    switch (time) {
      case TimeStatisticalEnum.WEEK:
        return subWeeks(new Date(), 1);

      case TimeStatisticalEnum.MONTH:
        return subMonths(new Date(), 1);

      default:
        return subYears(new Date(), 1);
    }
  }, [time]);

  const startLastTime = useMemo(() => {
    switch (time) {
      case TimeStatisticalEnum.WEEK:
        return subWeeks(new Date(), 2);

      case TimeStatisticalEnum.MONTH:
        return subMonths(new Date(), 2);

      default:
        return subYears(new Date(), 2);
    }
  }, [time]);

  const timeStatistical = useMemo(() => {
    switch (time) {
      case TimeStatisticalEnum.WEEK:
        return TimeStatisticalEnum.WEEK;

      case TimeStatisticalEnum.MONTH:
        return TimeStatisticalEnum.MONTH;

      default:
        return TimeStatisticalEnum.YEAR;
    }
  }, [time]);

  const handleChangeTime = (event: SelectChangeEvent) => {
    setTime(event.target.value as unknown as TimeStatisticalEnum);
  };

  useEffect(() => {
    const startTimeParams = startTime.toString();
    const startLastTimeParams = startLastTime.toString();

    Promise.all([
      dispatch(
        getTotalQuantityOrdersCompleted({
          startTime: startTimeParams,
        })
      ),
      dispatch(
        getTotalMoneyOrdersCompleted({
          startTime: startTimeParams,
        })
      ),
      dispatch(
        getTotalOrdersCompleted({
          startTime: startTimeParams,
        })
      ),
      dispatch(getTotalOrders()),
    ]).finally(() => {
      Promise.all([
        dispatch(
          getTotalQuantityOrdersCompleted({
            startTime: startLastTimeParams,
            endTime: startTimeParams,
          })
        ),
        dispatch(
          getTotalMoneyOrdersCompleted({
            startTime: startLastTimeParams,
            endTime: startTimeParams,
          })
        ),
        dispatch(
          getTotalOrdersCompleted({
            startTime: startLastTimeParams,
            endTime: startTimeParams,
          })
        ),
      ]).finally(() => setLoading(false));
    });
  }, [dispatch, startTime, startLastTime]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Hi {userInfo?.name || "Unknown"}, Welcome back
      </Typography>

      <Box sx={{ maxWidth: 120, mb: 2 }}>
        <FormControl fullWidth>
          <Select
            labelId="statistical"
            value={time.toString()}
            onChange={handleChangeTime}
            size="small"
          >
            {STATISTICAL_TIME_SELECT.map(item => (
              <MenuItem key={item.value} value={item.value}>
                <Typography variant="body2">{item.label}</Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={4}>
          <TotalRecord
            title="Product Sold"
            total={totalQuantityOrders}
            percent={percentQuantity}
            timeStatistical={timeStatistical}
            icon={TokenRounded}
            colorIcon="info"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TotalRecord
            title="Total Balance"
            total={totalMoneyOrders}
            percent={percentMoney}
            timeStatistical={timeStatistical}
            icon={TipsAndUpdatesRounded}
            colorIcon="error"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TotalRecord
            title="Order Completed"
            total={totalOrdersCompleted}
            percent={percentOrder}
            timeStatistical={timeStatistical}
            icon={TryRounded}
            colorIcon="primary"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Sales Overview
              </Typography>

              <SalesOverview
                title="Total Orders"
                total={totalOrders}
                color="primary"
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Latest Products
              </Typography>

              <LatestProduct />
              <LatestProduct />
              <LatestProduct />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardScreen;
