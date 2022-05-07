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
import PreviewImage from "components/PreviewImage/PreviewImage";
import { AspectRatioEnum, ModesScreenEnum } from "constants/common.constants";
import { MessagesEnum } from "constants/message.constants";
import {
  ProductPathsEnum,
  deleteProduct,
  ProductIsHotEnum,
  ProductStatusEnum,
  ProductDef,
  ProductParams,
} from "features/product/product";
import { toCurrency } from "helpers/converts/currency";
import { formatDate } from "helpers/converts/format-date";
import { handleErrorResponse } from "helpers/forms/handle-error-response";
import { displaySnackbar } from "redux/snackbar.slice";
import { useAppDispatch } from "redux/store";

interface DataTableProps {
  products: ProductDef[];
  total: number;
  queries: ProductParams;
  setQueries: React.Dispatch<React.SetStateAction<ProductParams>>;
}

const DataTable: FC<DataTableProps> = ({
  products,
  total,
  queries,
  setQueries,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  const dispatch = useAppDispatch();

  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ProductDef | null>(null);
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

  const handleDeleteProduct = () => {
    if (!selectedRow) return;

    dispatch(deleteProduct(selectedRow.id))
      .then(unwrapResult)
      .then(() =>
        dispatch(
          displaySnackbar({
            message: MessagesEnum.DELETE_SUCCESS,
          })
        )
      )
      .catch(() => handleErrorResponse({ dispatch }))
      .finally(() => setIsOpenDeleteDialog(false));
  };

  const handleRedirectEditPage = () => {
    if (!selectedRow) return;

    history.push(
      compile(ProductPathsEnum.EDIT)({
        mode: ModesScreenEnum.EDIT,
        productId: selectedRow.id,
      })
    );
  };

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    row: ProductDef
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
                <TableCell>{t("label.Thumbnail", { ns: "admin" })}</TableCell>
                <TableCell>{t("label.Price", { ns: "admin" })}</TableCell>
                <TableCell>{t("label.Quantity", { ns: "admin" })}</TableCell>
                <TableCell>{t("label.Hot product", { ns: "admin" })}</TableCell>
                <TableCell>{t("label.Status", { ns: "admin" })}</TableCell>
                <TableCell>{t("label.Created at", { ns: "admin" })}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map(row => (
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
                  <TableCell>
                    <PreviewImage
                      aspectRatio={AspectRatioEnum.THREE_TO_FOUR}
                      width={80}
                      src={row.thumbnail}
                    />
                  </TableCell>
                  <TableCell>{toCurrency(row.price)}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>
                    {row.isHot === ProductIsHotEnum.HOT ? "Hot" : "Normal"}
                  </TableCell>
                  <TableCell>
                    {row.status === ProductStatusEnum.DISPLAY
                      ? "Display"
                      : "Hidden"}
                  </TableCell>
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
        onSubmit={handleDeleteProduct}
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
