import React, { FC, memo } from "react";

import { DeleteRounded, EditRounded } from "@mui/icons-material";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";

interface ListNavigationProps {
  anchorEl: null | HTMLElement;
  handleCloseMenu: () => void;
  handleOpenDeleteDialog: () => void;
  handleRedirectEditPage: () => void;
}

const ListNavigation: FC<ListNavigationProps> = ({
  anchorEl,
  handleCloseMenu,
  handleOpenDeleteDialog,
  handleRedirectEditPage,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClose={handleCloseMenu}
      onClick={handleCloseMenu}
      transformOrigin={{ horizontal: "left", vertical: "top" }}
      anchorOrigin={{ horizontal: "left", vertical: "top" }}
      PaperProps={{
        style: {
          minWidth: 160,
        },
      }}
    >
      <MenuItem onClick={handleRedirectEditPage}>
        <ListItemIcon>
          <EditRounded color="info" fontSize="small" />
        </ListItemIcon>
        <ListItemText>Edit</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleOpenDeleteDialog}>
        <ListItemIcon>
          <DeleteRounded color="error" fontSize="small" />
        </ListItemIcon>
        <ListItemText>Delete</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default memo(ListNavigation);
