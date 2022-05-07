import React, { FC, memo, useMemo } from "react";

import { ListItemText, Menu, MenuItem } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";

import { MessagesEnum } from "constants/message.constants";
import {
  OrderDef,
  OrderStatusEnum,
  patchUpdateStatus,
} from "features/order/order";
import { handleErrorResponse } from "helpers/forms/handle-error-response";
import { displaySnackbar } from "redux/snackbar.slice";
import { useAppDispatch } from "redux/store";

interface ListNavigationProps {
  anchorEl: null | HTMLElement;
  orderSelected: null | OrderDef;
  handleCloseMenu: () => void;
  handleOpenDetailDialog: () => void;
}

const ListNavigation: FC<ListNavigationProps> = ({
  anchorEl,
  orderSelected,
  handleCloseMenu,
  handleOpenDetailDialog,
}) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const disabledStatusConfirm = useMemo(() => {
    if (!orderSelected || orderSelected.status !== OrderStatusEnum.PENDING) {
      return true;
    }
    return false;
  }, [orderSelected]);

  const disabledStatusShipping = useMemo(() => {
    if (
      !orderSelected ||
      (orderSelected.status !== OrderStatusEnum.PENDING &&
        orderSelected.status !== OrderStatusEnum.CONFIRMED)
    ) {
      return true;
    }
    return false;
  }, [orderSelected]);

  const disabledStatusCancel = useMemo(() => {
    if (
      !orderSelected ||
      (orderSelected.status !== OrderStatusEnum.PENDING &&
        orderSelected.status !== OrderStatusEnum.CANCELING)
    ) {
      return true;
    }
    return false;
  }, [orderSelected]);

  const disabledStatusDone = useMemo(() => {
    if (
      !orderSelected ||
      (orderSelected.status !== OrderStatusEnum.PENDING &&
        orderSelected.status !== OrderStatusEnum.CONFIRMED &&
        orderSelected.status !== OrderStatusEnum.SHIPPING)
    ) {
      return true;
    }
    return false;
  }, [orderSelected]);

  const handleChangeStatus = (status: OrderStatusEnum) => {
    if (!orderSelected) return;

    dispatch(
      patchUpdateStatus({
        orderId: orderSelected.id,
        status,
      })
    )
      .then(unwrapResult)
      .then(() => {
        dispatch(
          displaySnackbar({
            message: MessagesEnum.UPDATE_SUCCESS,
          })
        );
      })
      .catch(() => handleErrorResponse({ dispatch }));
  };

  return (
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
        disabled={disabledStatusConfirm}
        onClick={() => handleChangeStatus(OrderStatusEnum.CONFIRMED)}
      >
        <ListItemText>
          {t("label.Confirmed order", { ns: "admin" })}
        </ListItemText>
      </MenuItem>
      <MenuItem
        disabled={disabledStatusShipping}
        onClick={() => handleChangeStatus(OrderStatusEnum.SHIPPING)}
      >
        <ListItemText>
          {t("label.Shipping order", { ns: "admin" })}
        </ListItemText>
      </MenuItem>
      <MenuItem
        disabled={disabledStatusDone}
        onClick={() => handleChangeStatus(OrderStatusEnum.SUCCESS)}
      >
        <ListItemText>{t("label.Done order", { ns: "admin" })}</ListItemText>
      </MenuItem>
      <MenuItem
        disabled={disabledStatusCancel}
        onClick={() => handleChangeStatus(OrderStatusEnum.CANCELED)}
      >
        <ListItemText>{t("label.Cancel order", { ns: "admin" })}</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleOpenDetailDialog}>
        <ListItemText>{t("label.View detail", { ns: "admin" })}</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default memo(ListNavigation);
