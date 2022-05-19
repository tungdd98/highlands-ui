import React, { FC, memo, useEffect, useMemo, useState } from "react";

import {
  SearchRounded,
  LocalMallRounded,
  PersonRounded,
  AccountBoxRounded,
  LogoutRounded,
  DashboardRounded,
} from "@mui/icons-material";
import {
  Box,
  Container,
  IconButton,
  Paper,
  Stack,
  Button,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Hidden,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Logo from "assets/images/logo.jpeg";
import CustomLink from "components/CustomLink/CustomLink";
import CustomMenu from "components/CustomMenu/CustomMenu";
import PreviewImage from "components/PreviewImage/PreviewImage";
import { logout } from "features/auth/auth";
import { CategoryTypesEnum, getAllCategory } from "features/category/category";
import { setIsOpenDrawerCart } from "features/checkout/checkout";
import { useAppDispatch, useAppSelector } from "redux/store";

import NavbarMobile from "./NavbarMobile";

const Navbar: FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const {
    category: { allCategory },
    auth: { userInfo },
    checkout: { totalQuantity },
    setting: { setting },
  } = useAppSelector(state => state);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const productCategories = useMemo(
    () =>
      allCategory
        ?.filter(item => item.type === CategoryTypesEnum.PRODUCT)
        .map(item => ({
          label: item.title,
          path: `/category/${item.id}`,
        })) || [],
    [allCategory]
  );

  const articleCategories = useMemo(
    () =>
      allCategory
        ?.filter(item => item.type === CategoryTypesEnum.ARTICLE)
        .map(item => ({
          label: item.title,
          path: `/category/${item.id}`,
        })) || [],
    [allCategory]
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleOpenAccountSetting = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAccountSetting = () => {
    setAnchorEl(null);
  };

  const handleOpenDrawerCart = () => {
    dispatch(setIsOpenDrawerCart(true));
  };

  useEffect(() => {
    if (!allCategory) {
      dispatch(getAllCategory({}));
    }
  }, [dispatch, allCategory]);

  return (
    <>
      <Hidden mdDown>
        <Box
          component={Paper}
          elevation={3}
          sx={{ position: "sticky", top: 0, zIndex: 999 }}
          square
        >
          <Container maxWidth="lg">
            <Box sx={{ display: "flex", alignItems: "center", py: 2 }}>
              <Link to="/">
                <PreviewImage
                  src={setting?.thumbnail || Logo}
                  alt="logo"
                  width={60}
                  height={60}
                />
              </Link>
              <Stack
                component="nav"
                direction="row"
                spacing={5}
                sx={{ flex: 1, px: 4 }}
              >
                <CustomMenu path="/" label={t("nav.home", { ns: "client" })} />
                <CustomMenu
                  path="/about"
                  label={t("nav.about", { ns: "client" })}
                />
                <CustomMenu
                  menuItems={productCategories}
                  label={t("nav.products", { ns: "client" })}
                />
                <CustomMenu
                  menuItems={articleCategories}
                  label={t("nav.articles", { ns: "client" })}
                />
                <CustomMenu
                  path="/contact"
                  label={t("nav.contact", { ns: "client" })}
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <IconButton>
                  <SearchRounded />
                </IconButton>

                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<LocalMallRounded />}
                  onClick={handleOpenDrawerCart}
                >
                  ({totalQuantity})
                </Button>
                {userInfo ? (
                  <Tooltip
                    title={
                      t("common.Account information", { ns: "client" }) || ""
                    }
                  >
                    <IconButton size="small" onClick={handleOpenAccountSetting}>
                      <Avatar sx={{ width: 32, height: 32 }}>
                        <PersonRounded color="primary" />
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Stack direction="row" spacing={3} alignItems="center">
                    <CustomLink to="/login">
                      {t("common.Login", { ns: "client" })}
                    </CustomLink>
                    <CustomLink to="/register">
                      {t("common.Register", { ns: "client" })}
                    </CustomLink>
                  </Stack>
                )}
              </Stack>
            </Box>
          </Container>
        </Box>
      </Hidden>

      <Hidden mdUp>
        <NavbarMobile handleOpenAccountSetting={handleOpenAccountSetting} />
      </Hidden>

      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleCloseAccountSetting}
        onClick={handleCloseAccountSetting}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {userInfo?.isAdminUser && (
          <MenuItem component={Link} to="/admin">
            <ListItemIcon>
              <DashboardRounded fontSize="small" />
            </ListItemIcon>
            {t("menu.Admin", { ns: "client" })}
          </MenuItem>
        )}
        <MenuItem>
          <ListItemIcon>
            <AccountBoxRounded fontSize="small" />
          </ListItemIcon>
          {t("menu.Profile", { ns: "client" })}
        </MenuItem>
        <Divider />
        <MenuItem component={Link} to="/my-order">
          <ListItemIcon>
            <LocalMallRounded fontSize="small" />
          </ListItemIcon>
          {t("menu.My order", { ns: "client" })}
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutRounded fontSize="small" />
          </ListItemIcon>
          {t("menu.Logout", { ns: "client" })}
        </MenuItem>
      </Menu>
    </>
  );
};

export default memo(Navbar);
