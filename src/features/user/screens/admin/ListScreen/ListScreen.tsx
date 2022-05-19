import React, { FC, memo, useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import Loader from "components/Loader/Loader";
import {
  searchInitialValues,
  getUserList,
  UserParams,
} from "features/user/user";
import { useAppDispatch, useAppSelector } from "redux/store";

import DataTable from "../../../components/DataTable/DataTable";
import FormSearch from "../../../components/FormSearch/FormSearch";

const ListScreen: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { users } = useAppSelector(state => state.user);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [queries, setQueries] = useState<UserParams>(searchInitialValues);

  useEffect(() => {
    dispatch(getUserList(queries)).finally(() => {
      setIsLoading(false);
      setIsSubmitting(false);
    });
  }, [dispatch, queries]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Box sx={{ py: 3 }}>
        <Typography variant="h5">
          {t("common.Manage", { ns: "admin" })}&nbsp;
          {t("sidebar.Users", { ns: "admin" })}
        </Typography>
      </Box>

      <FormSearch
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
        queries={queries}
        setQueries={setQueries}
      />

      {users && users.list.length ? (
        <DataTable
          users={users.list}
          total={users.totalItems}
          queries={queries}
          setQueries={setQueries}
        />
      ) : (
        <Typography>{t("common.No data", { ns: "admin" })}</Typography>
      )}
    </>
  );
};

export default memo(ListScreen);
