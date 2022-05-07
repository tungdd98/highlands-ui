import React, { FC, useEffect, useState } from "react";

import { AddRounded } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { compile } from "path-to-regexp";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Loader from "components/Loader/Loader";
import { ModesScreenEnum } from "constants/common.constants";
import {
  DeliveryPathsEnum,
  searchInitialValues,
  getDeliveryList,
  DeliveryParams,
} from "features/delivery/delivery";
import { useAppDispatch, useAppSelector } from "redux/store";

import DataTable from "../../../components/DataTable/DataTable";
import FormSearch from "../../../components/FormSearch/FormSearch";

const ListScreen: FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const { deliveries } = useAppSelector(state => state.delivery);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [queries, setQueries] = useState<DeliveryParams>(searchInitialValues);

  useEffect(() => {
    dispatch(getDeliveryList(queries)).finally(() => {
      setIsLoading(false);
      setIsSubmitting(false);
    });
  }, [dispatch, queries]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          py: 3,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5">
          {t("common.Manage", { ns: "admin" })}&nbsp;
          {t("sidebar.Deliveries", { ns: "admin" })}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddRounded />}
          component={Link}
          size="large"
          to={compile(DeliveryPathsEnum.EDIT)({
            mode: ModesScreenEnum.CREATE,
          })}
        >
          {t("button.Add new", { ns: "admin" })}
        </Button>
      </Box>

      <FormSearch
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
        queries={queries}
        setQueries={setQueries}
      />

      {deliveries && deliveries.list.length ? (
        <DataTable
          deliveries={deliveries.list}
          total={deliveries.totalItems}
          queries={queries}
          setQueries={setQueries}
        />
      ) : (
        <Typography>{t("common.No data", { ns: "admin" })}</Typography>
      )}
    </>
  );
};

export default ListScreen;
