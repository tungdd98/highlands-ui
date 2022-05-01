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

interface TableRowOrderProps {
  handleOpenMenu: (event: React.MouseEvent<HTMLElement>, row: OrderDef) => void;
  order: OrderDef;
}

const TableRowOrder: FC<TableRowOrderProps> = ({ handleOpenMenu, order }) => {
  const { t } = useTranslation();
  const {
    auth: { userInfo },
    payment: { allPayment },
    delivery: { allDelivery },
  } = useAppSelector(state => state);

  const locationInfo = useMemo(() => {
    return userInfo?.locations.find(item => item.id === order.locationId);
  }, [order.locationId, userInfo?.locations]);

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
    <TableRow hover>
      <TableCell>
        <IconButton onClick={e => handleOpenMenu(e, order)}>
          <MoreVertRounded />
        </IconButton>
      </TableCell>
      <TableCell>{order.id}</TableCell>
      <TableCell>
        {locationInfo && (
          <>
            <Typography>{locationInfo.name}</Typography>
            <Typography variant="caption" component="div">
              {locationInfo.address}
            </Typography>
            <Typography variant="caption" component="div">
              {locationInfo.phone}
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

export default memo(TableRowOrder);
