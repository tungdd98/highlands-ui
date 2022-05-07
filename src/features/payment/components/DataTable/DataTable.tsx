import React, { FC, memo, useState } from "react";

import { MoreVertRounded } from "@mui/icons-material";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { compile } from "path-to-regexp";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import ConfirmDialog from "components/ConfirmDialog/ConfirmDialog";
import ListNavigation from "components/ListNavigation/ListNavigation";
import { ModesScreenEnum } from "constants/common.constants";
import { MessagesEnum } from "constants/message.constants";
import {
  PaymentPathsEnum,
  deletePayment,
  PaymentDef,
  PaymentParams,
} from "features/payment/payment";
import { formatDate } from "helpers/converts/format-date";
import { handleErrorResponse } from "helpers/forms/handle-error-response";
import { displaySnackbar } from "redux/snackbar.slice";
import { useAppDispatch } from "redux/store";

interface DataTableProps {
  payments: PaymentDef[];
  total: number;
  queries: PaymentParams;
  setQueries: React.Dispatch<React.SetStateAction<PaymentParams>>;
}

const DataTable: FC<DataTableProps> = ({
  payments,
  total,
  queries,
  setQueries,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  const dispatch = useAppDispatch();

  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState<PaymentDef | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setQueries(prev => ({ ...prev, page: newPage + 1 }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQueries(prev => ({
      ...prev,
      page: 1,
      perPage: parseInt(event.target.value, 10),
    }));
  };

  const handleOpenDeleteDialog = () => {
    setIsOpenDeleteDialog(true);
  };

  const handleDeleteUser = () => {
    if (!selectedRow) return;

    dispatch(deletePayment(selectedRow.id))
      .then(unwrapResult)
      .then(() => {
        dispatch(
          displaySnackbar({
            message: MessagesEnum.DELETE_SUCCESS,
          })
        );
        setQueries(prev => ({
          ...prev,
          page: 1,
        }));
      })
      .catch(() => handleErrorResponse({ dispatch }))
      .finally(() => setIsOpenDeleteDialog(false));
  };

  const handleRedirectEditPage = () => {
    if (!selectedRow) return;

    history.push(
      compile(PaymentPathsEnum.EDIT)({
        mode: ModesScreenEnum.EDIT,
        paymentId: selectedRow.id,
      })
    );
  };

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    row: PaymentDef
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>{t("label.ID", { ns: "admin" })}</TableCell>
                <TableCell>{t("label.Title", { ns: "admin" })}</TableCell>
                <TableCell>{t("label.Created at", { ns: "admin" })}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map(row => (
                <TableRow
                  hover
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell width={80}>
                    <IconButton onClick={e => handleOpenMenu(e, row)}>
                      <MoreVertRounded />
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{formatDate(row.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={total}
          rowsPerPage={queries?.perPage || 5}
          page={queries.page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={t("label.Rows per page", { ns: "admin" })}
        />
      </Paper>

      <ConfirmDialog
        open={isOpenDeleteDialog}
        onClose={() => setIsOpenDeleteDialog(false)}
        onSubmit={handleDeleteUser}
        title={t("common.Do you want delete record?", { ns: "admin" })}
      />

      <ListNavigation
        anchorEl={anchorEl}
        handleCloseMenu={handleCloseMenu}
        handleOpenDeleteDialog={handleOpenDeleteDialog}
        handleRedirectEditPage={handleRedirectEditPage}
      />
    </>
  );
};

export default memo(DataTable);
