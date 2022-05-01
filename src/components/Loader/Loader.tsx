import React, { FC, memo } from "react";

import { CircularProgress, styled } from "@mui/material";

const FullScreen = styled("div")(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  position: "fixed",
  left: 0,
  top: 0,
  zIndex: 2000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: theme.palette.grey[100],
}));

const InsideElement = styled("div")(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: 0,
  left: 0,
}));

interface LoaderProps {
  isFullScreen?: boolean;
}

const Loader: FC<LoaderProps> = ({ isFullScreen = true }) => {
  const Container = isFullScreen ? FullScreen : InsideElement;

  return (
    <Container>
      <CircularProgress />
    </Container>
  );
};

export default memo(Loader);
