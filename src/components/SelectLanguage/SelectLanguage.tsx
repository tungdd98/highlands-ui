import React, { FC, memo, useState } from "react";

import {
  Avatar,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { LANGUAGE_OPTIONS } from "constants/common.constants";
import { setLanguage } from "redux/app.slice";
import { useAppDispatch, useAppSelector } from "redux/store";
import { LanguageOption } from "types/app.types";

const SelectLanguage: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { language } = useAppSelector(state => state.app);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenLanguageSetting = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseLanguageSetting = () => {
    setAnchorEl(null);
  };

  const handleChangeLanguage = (lang: LanguageOption) => {
    dispatch(setLanguage(lang));
  };

  return (
    <>
      <Tooltip title={t("common.Language settings", { ns: "admin" }) || ""}>
        <IconButton size="small" onClick={handleOpenLanguageSetting}>
          <Avatar sx={{ width: 32, height: 32 }} src={language.flag} />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleCloseLanguageSetting}
        onClick={handleCloseLanguageSetting}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {LANGUAGE_OPTIONS.map(item => (
          <MenuItem key={item.lng} onClick={() => handleChangeLanguage(item)}>
            <ListItemIcon>
              <Avatar sx={{ width: 20, height: 20 }} src={item.flag} />
            </ListItemIcon>
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default memo(SelectLanguage);
