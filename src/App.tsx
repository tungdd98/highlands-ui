import React, { FC } from "react";

import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { HashRouter } from "react-router-dom";
import SwiperCore, { Pagination, Autoplay, Navigation } from "swiper";

import CustomSnackbar from "components/CustomSnackbar/CustomSnackbar";
import ScrollToTop from "components/ScrollToTop/ScrollToTop";
import SeoContainer from "components/SeoContainer/SeoContainer";
import WatchingLanguageChange from "components/WatchingLanguageChange/WatchingLanguageChange";
import RouterWrapper from "routes/RouterWrapper";
import { themeOptions } from "themes/theme-one";

SwiperCore.use([Pagination, Autoplay, Navigation]);

const theme = createTheme(themeOptions);

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <CssBaseline />
        <CustomSnackbar />
        <RouterWrapper />
        <ScrollToTop />
        <WatchingLanguageChange />
        <SeoContainer />
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
