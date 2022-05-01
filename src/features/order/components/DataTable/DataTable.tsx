import React, { FC, memo } from "react";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { OrderDef, OrderParams } from "features/order/order";

import TableRowData from "../TableRowData/TableRowData";

interface DataTableProps {
  orders: OrderDef[];
  total: number;
  queries: OrderParams;
  setQueries: React.Dispatch<React.SetStateAction<OrderParams>>;
  handleOpenMenu: (
    event: React.MouseEvent<HTMLElement>,
    order: OrderDef
  ) => void;
}

const DataTable: FC<DataTableProps> = ({
  orders,
  total,
  queries,
  setQueries,
  handleOpenMenu,
}) => {
  const { t } = useTranslation();

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

  return (
    <Paper elevation={3}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>{t("label.ID", { ns: "admin" })}</TableCell>
              <TableCell sx={{ minWidth: 200 }}>
                {t("label.Billing Address", { ns: "admin" })}
              </TableCell>
              <TableCell>
                {t("label.Payment method", { ns: "admin" })}
              </TableCell>
              <TableCell>
                {t("label.Delivery method", { ns: "admin" })}
              </TableCell>
              <TableCell>{t("label.Status", { ns: "admin" })}</TableCell>
              <TableCell>{t("label.Created at", { ns: "admin" })}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(row => (
              <TableRowData
                order={row}
                key={row.id}
                handleOpenMenu={handleOpenMenu}
              />
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
  );
};

export default memo(DataTable);
