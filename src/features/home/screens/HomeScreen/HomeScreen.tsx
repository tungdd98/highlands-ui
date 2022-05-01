import React, { FC, memo } from "react";

import AboutSection from "./AboutSection/AboutSection";
import BannerSection from "./BannerSection/BannerSection";
import HotDealsSection from "./HotDealsSection/HotDealsSection";
import OurProductSection from "./OurProductSection/OurProductSection";
import PartnerSection from "./PartnerSection/PartnerSection";
import WhyChooseUsSection from "./WhyChooseUsSection/WhyChooseUsSection";

const HomeScreen: FC = () => {
  return (
    <>
      <BannerSection />
      <OurProductSection />
      <AboutSection />
      <HotDealsSection />
      <WhyChooseUsSection />
      <PartnerSection />
    </>
  );
};

export default memo(HomeScreen);
