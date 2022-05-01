/* eslint-disable import/no-unresolved */
import React, { FC, memo } from "react";

import { Box, Container } from "@mui/material";
import { SwiperSlide } from "swiper/react";

import CustomSwiper from "components/CustomSwiper/CustomSwiper";

const PartnerSection: FC = () => {
  return (
    <Container maxWidth="lg">
      <CustomSwiper
        slidesPerView={1}
        breakpoints={{
          "640": {
            slidesPerView: 2,
          },
          "768": {
            slidesPerView: 5,
          },
        }}
        centeredSlides
        loop
        autoHeight
      >
        {[
          "https://demo1.leotheme.com/bos_highlands_demo/img/m/6-manu_default.jpg",
          "https://demo1.leotheme.com/bos_highlands_demo/img/m/3-manu_default.jpg",
          "https://demo1.leotheme.com/bos_highlands_demo/img/m/4-manu_default.jpg",
          "https://demo1.leotheme.com/bos_highlands_demo/img/m/5-manu_default.jpg",
          "https://demo1.leotheme.com/bos_highlands_demo/img/m/7-manu_default.jpg",
        ].map((item, index) => (
          <SwiperSlide key={index.toString()}>
            <Box textAlign="center">
              <img src={item} alt="" />
            </Box>
          </SwiperSlide>
        ))}
      </CustomSwiper>
    </Container>
  );
};

export default memo(PartnerSection);
