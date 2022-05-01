import React, { FC, memo, useMemo } from "react";

import { MoreVertRounded } from "@mui/icons-material";
import {
  Chip,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { OrderDef, ORDER_TITLE } from "features/order/order";
import { formatDate } from "helpers/converts/format-date";
import { useAppSelector } from "redux/store";

interface TableRowDataProps {
  handleOpenMenu: (
    event: React.MouseEvent<HTMLElement>,
    order: OrderDef
  ) => void;
  order: OrderDef;
}

const TableRowData: FC<TableRowDataProps> = ({ order, handleOpenMenu }) => {
  const { t } = useTranslation();

  const {
    payment: { allPayment },
    delivery: { allDelivery },
  } = useAppSelector(state => state);

  const paymentInfo = useMemo(() => {
    return allPayment?.find(item => item.id === order.paymentId);
  }, [allPayment, order.paymentId]);

  const deliveryInfo = useMemo(() => {
    return allDelivery?.find(item => item.id === order.deliveryId);
  }, [allDelivery, order.deliveryId]);

  const statusInfo = useMemo(() => {
    return ORDER_TITLE[order.status];
  }, [order.status]);

  return (
    <TableRow hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell width={80}>
        <IconButton onClick={e => handleOpenMenu(e, order)}>
          <MoreVertRounded />
        </IconButton>
      </TableCell>
      <TableCell component="th" scope="row">
        {order.id}
      </TableCell>
      <TableCell>
        {order?.location && (
          <>
            <Typography>{order.location.name}</Typography>
            <Typography variant="caption" component="div">
              {order.location.address}
            </Typography>
            <Typography variant="caption" component="div">
              {order.location.phone}
            </Typography>
          </>
        )}
      </TableCell>
      <TableCell>{paymentInfo && paymentInfo.title}</TableCell>
      <TableCell>{deliveryInfo && deliveryInfo.title}</TableCell>
      <TableCell>
        {statusInfo && (
          <Chip
            label={t(`label.${statusInfo.label}`, { ns: "admin" })}
            color={statusInfo.color}
            size="small"
          />
        )}
      </TableCell>
      <TableCell>{formatDate(order.createdAt)}</TableCell>
    </TableRow>
  );
};

export default memo(TableRowData);
