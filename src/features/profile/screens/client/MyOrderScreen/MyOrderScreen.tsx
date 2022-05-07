import React, { FC, memo, useState, useEffect, useMemo } from "react";

import { DeleteOutlineRounded, VisibilityRounded } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Container,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";

import ConfirmDialog from "components/ConfirmDialog/ConfirmDialog";
import CustomLink from "components/CustomLink/CustomLink";
import Loader from "components/Loader/Loader";
import ViewOrderDetailDialog from "components/ViewOrderDetailDialog/ViewOrderDetailDialog";
import { MessagesEnum } from "constants/message.constants";
import { getAllDelivery } from "features/delivery/delivery";
import {
  OrderDef,
  OrderStatusEnum,
  patchUpdateStatus,
} from "features/order/order";
import { getAllPayment } from "features/payment/payment";
import { cancelOrder, getMyOrder } from "features/profile/profile";
import { handleErrorResponse } from "helpers/forms/handle-error-response";
import { displaySnackbar } from "redux/snackbar.slice";
import { useAppDispatch, useAppSelector } from "redux/store";

import TableRowOrder from "../../../components/TableRowOrder/TableRowOrder";

const MyOderScreen: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    auth: { userInfo },
    profile: { orders },
  } = useAppSelector(state => state);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenCancelDialog, setIsOpenCancelDialog] = useState(false);
  const [isOpenDetailDialog, setIsOpenDetailDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderDef | null>(null);

  const disabledCancelOrder = useMemo(() => {
    if (!selectedOrder) return true;
    return selectedOrder.status !== OrderStatusEnum.PENDING;
  }, [selectedOrder]);

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    row: OrderDef
  ) => {
    setSelectedOrder(row);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenCancelDialog = () => {
    setIsOpenCancelDialog(true);
  };

  const handleCloseCancelDialog = () => {
    setIsOpenCancelDialog(false);
    setSelectedOrder(null);
  };

  const handleCancelOrder = () => {
    if (!selectedOrder) return;

    dispatch(
      patchUpdateStatus({
        orderId: selectedOrder.id,
        status: OrderStatusEnum.CANCELING,
      })
    )
      .then(unwrapResult)
      .then(() => {
        dispatch(
          displaySnackbar({
            message: MessagesEnum.UPDATE_SUCCESS,
          })
        );
        dispatch(cancelOrder(selectedOrder.id));
      })
      .catch(() => handleErrorResponse({ dispatch }))
      .finally(() => {
        setIsOpenCancelDialog(false);
      });
  };

  const handleOpenDetailDialog = () => {
    setIsOpenDetailDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setIsOpenDetailDialog(false);
  };

  useEffect(() => {
    if (!loading || !userInfo) return;

    dispatch(getMyOrder(userInfo.id))
      .then(unwrapResult)
      .then(() => {
        Promise.all([
          dispatch(getAllPayment()),
          dispatch(getAllDelivery()),
        ]).finally(() => setLoading(false));
      });
  }, [dispatch, loading, userInfo]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Box sx={{ mt: 2, mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <CustomLink to="/">{t("common.Home", { ns: "client" })}</CustomLink>
          <Typography color="text.primary">
            {t("menu.My order", { ns: "client" })}
          </Typography>
        </Breadcrumbs>
      </Box>

      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>{t("common.ID", { ns: "client" })}</TableCell>
                <TableCell sx={{ minWidth: 200 }}>
                  {t("common.Billing Address", { ns: "client" })}
                </TableCell>
                <TableCell>
                  {t("common.Payment method", { ns: "client" })}
                </TableCell>
                <TableCell>
                  {t("common.Delivery method", { ns: "client" })}
                </TableCell>
                <TableCell>{t("common.Status", { ns: "client" })}</TableCell>
                <TableCell>
                  {t("common.Created at", { ns: "client" })}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map(item => (
                <TableRowOrder
                  order={item}
                  handleOpenMenu={handleOpenMenu}
                  key={item.id}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
        PaperProps={{
          style: {
            minWidth: 160,
          },
        }}
      >
        <MenuItem
          disabled={disabledCancelOrder}
          onClick={handleOpenCancelDialog}
        >
          <ListItemIcon>
            <DeleteOutlineRounded color="error" fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            {t("menu.Cancel order", { ns: "client" })}
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleOpenDetailDialog}>
          <ListItemIcon>
            <VisibilityRounded color="primary" fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t("menu.View detail", { ns: "client" })}</ListItemText>
        </MenuItem>
      </Menu>

      <ConfirmDialog
        open={isOpenCancelDialog}
        onClose={handleCloseCancelDialog}
        onSubmit={handleCancelOrder}
        title={t("common.Do you want cancel order?", { ns: "client" })}
      />

      <ViewOrderDetailDialog
        isOpenDetailDialog={isOpenDetailDialog}
        order={selectedOrder}
        handleCloseDetailDialog={handleCloseDetailDialog}
      />
    </Container>
  );
};

export default memo(MyOderScreen);
