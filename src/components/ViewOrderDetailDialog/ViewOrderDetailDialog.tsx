import React, { FC, memo, useMemo, useEffect, useState, useRef } from "react";

import { CloseRounded, PictureAsPdfRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
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
import ReactToPrint from "react-to-print";

import {
  getOrderDetail,
  OrderDef,
  OrderDetailDef,
  OrderStatusEnum,
  ORDER_TITLE,
} from "features/order/order";
import { toCurrency } from "helpers/converts/currency";
import { formatDate } from "helpers/converts/format-date";
import { useAppDispatch, useAppSelector } from "redux/store";

interface ViewOrderDetailDialogProps {
  order: OrderDef | null;
  isOpenDetailDialog: boolean;
  handleCloseDetailDialog: () => void;
}

const ViewOrderDetailDialog: FC<ViewOrderDetailDialogProps> = ({
  order,
  isOpenDetailDialog,
  handleCloseDetailDialog,
}) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const {
    payment: { allPayment },
    delivery: { allDelivery },
  } = useAppSelector(state => state);

  const [orderDetails, setOrderDetails] = useState<OrderDetailDef[] | null>(
    null
  );

  const componentRef = useRef();

  const paymentInfo = useMemo(() => {
    return allPayment?.find(item => item.id === order?.paymentId);
  }, [allPayment, order?.paymentId]);

  const deliveryInfo = useMemo(() => {
    return allDelivery?.find(item => item.id === order?.deliveryId);
  }, [allDelivery, order?.deliveryId]);

  const statusInfo = useMemo(() => {
    if (!order) return null;
    return ORDER_TITLE[order.status];
  }, [order]);

  useEffect(() => {
    if (order?.id && isOpenDetailDialog) {
      dispatch(getOrderDetail(order.id))
        .then(unwrapResult)
        .then(setOrderDetails);
    }
  }, [dispatch, isOpenDetailDialog, order?.id]);

  useEffect(() => {
    if (!isOpenDetailDialog) {
      setOrderDetails(null);
    }
  }, [isOpenDetailDialog]);

  if (!order) {
    return null;
  }

  return (
    <Dialog open={isOpenDetailDialog} maxWidth="lg" keepMounted fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <IconButton
          onClick={handleCloseDetailDialog}
          aria-label="close"
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseRounded />
        </IconButton>
      </DialogTitle>

      <DialogContent ref={componentRef}>
        <Box sx={{ mb: 2, pb: 2, borderBottom: 1, borderColor: "divider" }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            {t("label.User Information", { ns: "admin" })}
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography variant="body1" sx={{ pr: 1, mb: 1, fontWeight: 600 }}>
              {t("label.Fullname", { ns: "admin" })}:
            </Typography>
            <Typography variant="body1">{order.location?.name}</Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography variant="body1" sx={{ pr: 1, mb: 1, fontWeight: 600 }}>
              {t("label.Address", { ns: "admin" })}:
            </Typography>
            <Typography variant="body1">{order.location?.address}</Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography variant="body1" sx={{ pr: 1, mb: 1, fontWeight: 600 }}>
              {t("label.Phone number", { ns: "admin" })}:
            </Typography>
            <Typography variant="body1">{order.location?.phone}</Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography variant="body1" sx={{ pr: 1, mb: 1, fontWeight: 600 }}>
              {t("label.Created at", { ns: "admin" })}:
            </Typography>
            <Typography variant="body1">
              {formatDate(order.createdAt)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography variant="body1" sx={{ pr: 1, mb: 1, fontWeight: 600 }}>
              {t("label.Status", { ns: "admin" })}:
            </Typography>
            {statusInfo && (
              <Chip
                label={t(`label.${statusInfo.label}`, { ns: "admin" })}
                color={statusInfo.color}
                size="small"
              />
            )}
          </Box>
        </Box>
        <Box sx={{ mb: 2, pb: 2, borderBottom: 1, borderColor: "divider" }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            {t("label.Payment method", { ns: "admin" })}
          </Typography>
          <Typography variant="body1">{paymentInfo?.title}</Typography>
        </Box>
        <Box sx={{ mb: 2, pb: 2, borderBottom: 1, borderColor: "divider" }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            {t("label.Shipping method", { ns: "admin" })}
          </Typography>
          <Typography variant="body1">{deliveryInfo?.title}</Typography>
        </Box>
        <Box sx={{ mb: 2, pb: 2 }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            {t("label.Order details", { ns: "admin" })}
          </Typography>
          <Paper elevation={3}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t("label.Product", { ns: "admin" })}</TableCell>
                    <TableCell align="right">
                      {t("label.Price", { ns: "admin" })}
                    </TableCell>
                    <TableCell align="right">
                      {t("label.Quantity", { ns: "admin" })}
                    </TableCell>
                    <TableCell align="right">
                      {t("label.Total", { ns: "admin" })}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderDetails && orderDetails.length ? (
                    orderDetails.map(item => (
                      <TableRow key={item.product.id}>
                        <TableCell component="th" scope="row">
                          <Typography variant="body2" fontWeight={500}>
                            {item.product.title}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          {toCurrency(item.product.price)}
                        </TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell align="right">
                          {toCurrency(item.product.price * item.quantity)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5}>
                        {t("label.No products", { ns: "admin" })}.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </DialogContent>

      {order.status === OrderStatusEnum.SUCCESS && (
        <DialogActions sx={{ px: 3, py: 2 }}>
          <ReactToPrint
            // eslint-disable-next-line react/no-unstable-nested-components
            trigger={() => (
              <Button
                variant="contained"
                color="success"
                startIcon={<PictureAsPdfRounded />}
              >
                {t("button.Download as Pdf", { ns: "client" })}
              </Button>
            )}
            content={() => {
              if (componentRef.current) {
                return componentRef.current;
              }
              return null;
            }}
          />
        </DialogActions>
      )}
    </Dialog>
  );
};

export default memo(ViewOrderDetailDialog);
