import React, { FC, memo } from "react";

import { MenuRounded, PersonRounded } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import CustomLink from "components/CustomLink/CustomLink";
import { useAppSelector } from "redux/store";

interface NavbarMobileProps {
  handleOpenAccountSetting: (event: React.MouseEvent<HTMLElement>) => void;
}

const NavbarMobile: FC<NavbarMobileProps> = ({ handleOpenAccountSetting }) => {
  const {
    auth: { userInfo },
    setting: { setting },
  } = useAppSelector(state => state);

  return (
    <AppBar position="sticky" color="default" elevation={3}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuRounded />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {setting?.title}
        </Typography>
        {userInfo ? (
          <Tooltip title="Account settings">
            <IconButton size="small" onClick={handleOpenAccountSetting}>
              <Avatar sx={{ width: 32, height: 32 }}>
                <PersonRounded color="primary" />
              </Avatar>
            </IconButton>
          </Tooltip>
        ) : (
          <Stack direction="row" spacing={3} alignItems="center">
            <CustomLink to="/login">Login</CustomLink>
            <CustomLink to="/register">Register</CustomLink>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default memo(NavbarMobile);
