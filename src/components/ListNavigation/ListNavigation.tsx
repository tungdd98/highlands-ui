import React, { FC, memo } from "react";

import { DeleteRounded, EditRounded } from "@mui/icons-material";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
        <ListItemText>{t("button.Edit", { ns: "admin" })}</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleOpenDeleteDialog}>
        <ListItemIcon>
          <DeleteRounded color="error" fontSize="small" />
        </ListItemIcon>
        <ListItemText>{t("button.Delete", { ns: "admin" })}</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default memo(ListNavigation);
