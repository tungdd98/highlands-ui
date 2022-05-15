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
import { useTranslation } from "react-i18next";

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
  getLatestProducts,
} from "features/order/order";
import { getTotalProducts } from "features/product/product";
import { getTotalUsers } from "features/user/user";
import { useAppSelector, useAppDispatch } from "redux/store";

import LatestProduct from "../../components/LatestProduct/LatestProduct";
import SalesOverview from "../../components/SalesOverview/SalesOverview";
import TotalRecord from "../../components/TotalRecord/TotalRecord";

const DashboardScreen: FC = () => {
  const { t } = useTranslation();

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
    latestProducts,
  } = useAppSelector(state => state.order);
  const { totalProducts } = useAppSelector(state => state.product);
  const { totalUsers } = useAppSelector(state => state.user);

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
      dispatch(getTotalProducts()),
      dispatch(getTotalUsers()),
      dispatch(getLatestProducts()),
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
        {t("common.Hi", { ns: "admin" })} {userInfo?.name || "Unknown"},{" "}
        {t("common.Welcome back", { ns: "admin" })}
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
                <Typography variant="body2">
                  {t(`label.${item.label}`, { ns: "admin" })}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={4}>
          <TotalRecord
            title={t("common.Product Sold", { ns: "admin" })}
            total={totalQuantityOrders}
            percent={percentQuantity}
            timeStatistical={timeStatistical}
            icon={TokenRounded}
            colorIcon="info"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TotalRecord
            title={t("common.Total Balance", { ns: "admin" })}
            total={totalMoneyOrders}
            percent={percentMoney}
            timeStatistical={timeStatistical}
            icon={TipsAndUpdatesRounded}
            colorIcon="error"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TotalRecord
            title={t("common.Order Completed", { ns: "admin" })}
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
                {t("common.Sales Overview", { ns: "admin" })}
              </Typography>

              <Grid container spacing={1}>
                <Grid
                  item
                  xs={6}
                  md={4}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <SalesOverview
                    title={t("common.Total Orders", { ns: "admin" })}
                    total={totalOrders}
                    color="primary"
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  md={4}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <SalesOverview
                    title={t("common.Total Products", { ns: "admin" })}
                    total={totalProducts}
                    color="info"
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  md={4}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <SalesOverview
                    title={t("common.Total Users", { ns: "admin" })}
                    total={totalUsers}
                    color="success"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                {t("common.Latest Products", { ns: "admin" })}
              </Typography>

              {latestProducts ? (
                latestProducts.map(product => (
                  <LatestProduct key={product.id} {...product} />
                ))
              ) : (
                <Typography>{t("common.No data", { ns: "admin" })}</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardScreen;
