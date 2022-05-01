import React, { FC, memo } from "react";

import { KeyboardArrowDownRounded } from "@mui/icons-material";
import { Button, Menu, MenuItem } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import CustomLink from "components/CustomLink/CustomLink";

interface MenuItemProps {
  label: string;
  path: string;
}

interface CustomMenuProps {
  label?: React.ReactNode;
  path?: string;
  menuItems?: MenuItemProps[];
}

const CustomMenu: FC<CustomMenuProps> = ({ label, path, menuItems }) => {
  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isActive = location.pathname === path;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return menuItems ? (
    <>
      <Button
        variant="text"
        sx={{
          color: "secondary.contrastText",
          fontSize: 16,
          p: 1,
          lineHeight: 1,
        }}
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownRounded />}
      >
        {label}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        MenuListProps={{
          sx: {
            minWidth: 200,
          },
        }}
      >
        {menuItems.map(item => {
          const subMenuActive = item.path === location.pathname;

          return (
            <MenuItem
              key={item.path}
              disableRipple
              component={Link}
              to={item.path}
              selected={subMenuActive}
            >
              {item.label}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  ) : (
    <CustomLink
      isActive={isActive}
      sx={{ p: 1 }}
      fontWeight={600}
      to={path || "/"}
    >
      {label}
    </CustomLink>
  );
};

export default memo(CustomMenu);
