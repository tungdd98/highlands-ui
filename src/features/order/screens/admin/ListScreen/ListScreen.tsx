import React, { FC, memo, useState, useEffect } from "react";

import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import Loader from "components/Loader/Loader";
import ViewOrderDetailDialog from "components/ViewOrderDetailDialog/ViewOrderDetailDialog";
import { getAllDelivery } from "features/delivery/delivery";
import { OrderParams, getOrderList, OrderDef } from "features/order/order";
import { getAllPayment } from "features/payment/payment";
import { useAppDispatch, useAppSelector } from "redux/store";

import DataTable from "../../../components/DataTable/DataTable";
import ListNavigation from "../../../components/ListNavigation/ListNavigation";

const ListScreen: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector(state => state.order);

  const [isLoading, setIsLoading] = useState(true);
  const [queries, setQueries] = useState<OrderParams>({ page: 1, perPage: 5 });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [orderSelected, setOrderSelected] = useState<null | OrderDef>(null);
  const [isOpenDetailDialog, setIsOpenDetailDialog] = useState(false);

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    order: OrderDef
  ) => {
    setAnchorEl(event.currentTarget);
    setOrderSelected(order);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenDetailDialog = () => {
    setIsOpenDetailDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setIsOpenDetailDialog(false);
  };

  useEffect(() => {
    dispatch(getOrderList(queries)).then(() => {
      Promise.all([
        dispatch(getAllPayment()),
        dispatch(getAllDelivery()),
      ]).finally(() => setIsLoading(false));
    });
  }, [dispatch, queries]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Box py={3}>
        <Typography variant="h5">
          {t("common.Manage", { ns: "admin" })}&nbsp;
          {t("sidebar.Orders", { ns: "admin" })}
        </Typography>
      </Box>

      {orders && orders.list.length ? (
        <DataTable
          orders={orders.list}
          total={orders.totalItems}
          queries={queries}
          setQueries={setQueries}
          handleOpenMenu={handleOpenMenu}
        />
      ) : (
        <Typography>No data</Typography>
      )}

      <ListNavigation
        orderSelected={orderSelected}
        anchorEl={anchorEl}
        handleCloseMenu={handleCloseMenu}
        handleOpenDetailDialog={handleOpenDetailDialog}
      />

      <ViewOrderDetailDialog
        order={orderSelected}
        isOpenDetailDialog={isOpenDetailDialog}
        handleCloseDetailDialog={handleCloseDetailDialog}
      />
    </>
  );
};

export default memo(ListScreen);
