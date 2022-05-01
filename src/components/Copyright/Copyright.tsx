import React, { FC, memo } from "react";

import { Link, Typography } from "@mui/material";

const Copyright: FC = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Highlands
      </Link>
      &nbsp;
      {new Date().getFullYear()}.
    </Typography>
  );
};

export default memo(Copyright);
