import React, { FC } from "react";

import { Link, Typography } from "@mui/material";

import { useAppSelector } from "redux/store";

const Copyright: FC = () => {
  const { setting } = useAppSelector(state => state.setting);

  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        {setting?.title}
      </Link>
      &nbsp;
      {new Date().getFullYear()}.
    </Typography>
  );
};

export default Copyright;
