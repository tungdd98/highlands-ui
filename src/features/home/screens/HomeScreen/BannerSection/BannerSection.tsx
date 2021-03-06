/* eslint-disable import/no-unresolved */
import React, { FC, memo, useEffect } from "react";

import { SwiperSlide } from "swiper/react";

import CustomSwiper from "components/CustomSwiper/CustomSwiper";
import PreviewImage from "components/PreviewImage/PreviewImage";
import { AspectRatioEnum, FakeImagesEnum } from "constants/common.constants";
import { getAllBanner } from "features/banner/banner";
import { useAppDispatch, useAppSelector } from "redux/store";

const BannerSection: FC = () => {
  const dispatch = useAppDispatch();
  const { allBanner } = useAppSelector(state => state.banner);

  useEffect(() => {
    dispatch(getAllBanner());
  }, [dispatch]);

  if (!allBanner || !allBanner.length) {
    return null;
  }

  return (
    <CustomSwiper
      slidesPerView="auto"
      pagination={{
        dynamicBullets: true,
      }}
      centeredSlides
      loop
      autoHeight
    >
      {allBanner.map((item, index) => (
        <SwiperSlide key={index.toString()}>
          <PreviewImage
            aspectRatio={AspectRatioEnum.TEN_TO_FOUR}
            src={item.thumbnail}
            alt={item.title}
            borderRadius={0}
            fakeImages={FakeImagesEnum.BANNER}
          />
        </SwiperSlide>
      ))}
    </CustomSwiper>
  );
};

export default memo(BannerSection);
