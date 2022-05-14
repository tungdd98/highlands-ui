import React, { FC, memo, useState } from "react";

import {
  MenuRounded,
  ChevronLeftRounded,
  ChevronRightRounded,
  DashboardRounded,
  LogoutRounded,
  SettingsRounded,
  AccountBoxRounded,
  PersonRounded,
  HomeRounded,
} from "@mui/icons-material";
import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Stack,
  Container,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { Link, useHistory, useLocation } from "react-router-dom";

import Copyright from "components/Copyright/Copyright";
import SelectLanguage from "components/SelectLanguage/SelectLanguage";
import { AuthPathsEnum, logout } from "features/auth/auth";
import { HomePathsEnum } from "features/home/home";
import { useAppDispatch, useAppSelector } from "redux/store";
import { ROUTE_LIST } from "routes/routes.config";

const drawerWidth = 300;

const Main = styled("main", { shouldForwardProp: prop => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background: theme.palette.grey[50],
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const AdminLayout: FC = ({ children }) => {
  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const { setting } = useAppSelector(state => state.setting);

  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    history.push(AuthPathsEnum.LOGIN);
  };

  const handleOpenAccountSetting = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAccountSetting = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuRounded />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant="h6" noWrap component="div">
              {setting?.title || "React App"}
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <SelectLanguage />
              <Tooltip title="Account settings">
                <IconButton size="small" onClick={handleOpenAccountSetting}>
                  <Avatar sx={{ width: 32, height: 32 }}>
                    <PersonRounded />
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftRounded />
            ) : (
              <ChevronRightRounded />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem component={Link} to={HomePathsEnum.HOME} button>
            <ListItemIcon>
              <HomeRounded />
            </ListItemIcon>
            <ListItemText primary={setting?.title || "React App"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          {ROUTE_LIST.filter(route => !!route.navigationTitle).map(route => {
            const IconSidebar = route.icon || DashboardRounded;
            const isActive = location.pathname === route.path;

            return (
              <ListItem
                button
                key={route.id}
                onClick={() => history.push(route.path)}
                selected={isActive}
              >
                <ListItemIcon>
                  <IconSidebar />
                </ListItemIcon>
                <ListItemText
                  primary={t(`sidebar.${route.navigationTitle}`, {
                    ns: "admin",
                  })}
                />
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <List>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutRounded />
            </ListItemIcon>
            <ListItemText primary={t("common.Logout", { ns: "admin" })} />
          </ListItem>
        </List>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        <Box flex={1} height="calc(100% - 64px)">
          <Container>{children}</Container>
        </Box>
        <Copyright />
      </Main>

      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleCloseAccountSetting}
        onClick={handleCloseAccountSetting}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <ListItemIcon>
            <AccountBoxRounded fontSize="small" />
          </ListItemIcon>
          {t("menu.Profile", { ns: "admin" })}
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <SettingsRounded fontSize="small" />
          </ListItemIcon>
          {t("menu.Settings", { ns: "admin" })}
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutRounded fontSize="small" />
          </ListItemIcon>
          {t("common.Logout", { ns: "admin" })}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default memo(AdminLayout);
