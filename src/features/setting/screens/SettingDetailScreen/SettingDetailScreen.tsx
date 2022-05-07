import React, { FC, useState, useEffect, useCallback } from "react";

import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Loader from "components/Loader/Loader";
import PreviewImage from "components/PreviewImage/PreviewImage";
import {
  getSettingPage,
  SettingPathsEnum,
  getRoles,
  postRoles,
  INIT_CREATE_ROLES,
} from "features/setting/setting";
import { useAppDispatch, useAppSelector } from "redux/store";

import RowData from "../../components/RowData/RowData";

const SettingDetailScreen: FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const { setting, roles } = useAppSelector(state => state.setting);

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateRoles = useCallback(() => {
    setIsSubmitting(true);
    dispatch(postRoles(INIT_CREATE_ROLES)).finally(() =>
      setIsSubmitting(false)
    );
  }, [dispatch]);

  useEffect(() => {
    Promise.all([dispatch(getSettingPage()), dispatch(getRoles())]).finally(
      () => setLoading(false)
    );
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Typography variant="h5" sx={{ py: 3 }}>
        {t("common.Settings system", { ns: "admin" })}
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            mb: 3,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            {t("common.Basic settings", { ns: "admin" })}
          </Typography>
          <Button
            variant="contained"
            component={Link}
            size="large"
            to={SettingPathsEnum.BASIC_SETTING}
          >
            {t("button.Edit", { ns: "admin" })}
          </Button>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" fontWeight={500}>
            {t("label.Title", { ns: "admin" })}
          </Typography>
          <RowData content={setting?.title} />
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" fontWeight={500}>
            {t("label.Description", { ns: "admin" })}
          </Typography>
          <RowData content={setting?.description} />
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" fontWeight={500} sx={{ mb: 1 }}>
            Favicon
          </Typography>
          <PreviewImage src={setting?.favicon} width={80} />
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" fontWeight={500} sx={{ mb: 1 }}>
            {t("label.Thumbnail", { ns: "admin" })}
          </Typography>
          <PreviewImage src={setting?.thumbnail} width={120} />
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" fontWeight={500}>
            {t("label.Address", { ns: "admin" })}
          </Typography>
          <RowData content={setting?.address} />
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" fontWeight={500}>
            Hotline
          </Typography>
          <RowData content={setting?.hotline} />
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" fontWeight={600}>
            {t("common.About Page", { ns: "admin" })}
          </Typography>
          <Button
            variant="contained"
            component={Link}
            size="large"
            to={SettingPathsEnum.ABOUT_PAGE}
          >
            {t("button.Edit", { ns: "admin" })}
          </Button>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" fontWeight={600}>
            {t("common.Delivery Page", { ns: "admin" })}
          </Typography>
          <Button
            variant="contained"
            component={Link}
            size="large"
            to={SettingPathsEnum.DELIVERY_PAGE}
          >
            {t("button.Edit", { ns: "admin" })}
          </Button>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" fontWeight={600}>
            {t("common.Return Page", { ns: "admin" })}
          </Typography>
          <Button
            variant="contained"
            component={Link}
            size="large"
            to={SettingPathsEnum.RETURN_PAGE}
          >
            {t("button.Edit", { ns: "admin" })}
          </Button>
        </Box>
      </Paper>

      {(!roles || !roles.length) && (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6" fontWeight={600}>
              Roles
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleCreateRoles}
              disabled={isSubmitting}
            >
              Create Role
            </Button>
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default SettingDetailScreen;
